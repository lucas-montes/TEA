import React from 'react';
import { MainContainer } from '@/components/MainContainer'

const Empty: React.FC = () => {

    return (
        <MainContainer 
            title={"Empty"}
            sidebar={<>Empty</>}
            content={<>Empty</>}
        />
    )
}

export default Empty