import React, { useState } from 'react'
import { BaseSidebar } from "../BaseSidebar";
import { SplitPane } from "@/components/SplitPanel";
import { FlexColumn } from "@/styles/layout";
import { Container } from "@/styles/layout";


type Props = {
    title: string,
    sidebar: React.ReactNode,
    content: React.ReactNode,
};

export const MainContainer = ({title, sidebar, content}: Props) => {

    return (
        <Container>
            <SplitPane split="vertical" minSize={0} maxSize={300} defaultSize={200}>
            <BaseSidebar title={title}>
                {sidebar}
            </BaseSidebar>
            <FlexColumn className="w-min" width="100%" height="100%">
                {content}
            </FlexColumn>
            </SplitPane>
        </Container>
    );
};