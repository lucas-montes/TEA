import React from 'react'

import { FlexColumn } from "@/styles/layout";
import { Header, StyledSidebar } from "../Sidebar/style";

type Props = {
    title: string,
    children: React.ReactNode
}

export const BaseSidebar = ({title, children}: Props) => {

  return (
        <StyledSidebar>
          <FlexColumn height="100%">
            <Header>
              {title}
            </Header>
            {children}
          </FlexColumn>
        </StyledSidebar>
  );
};
