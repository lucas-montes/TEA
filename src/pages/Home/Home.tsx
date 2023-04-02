import React, { useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri';
import { MainContainer } from '@/components/MainContainer'
import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
// Read the text file in the `$APPCONFIG/app.conf` path

const BaseHome: React.FC = () => {
    function getAll() {
        return invoke('show_files', { directory: "/home/lucas/BashFast" })
    }

    getAll().then((files) => console.log(files))
    // const contents = readTextFile('app.conf', { dir: BaseDirectory.AppConfig });

    return (
        <div>
            <h1 className='text-white'>Home</h1>
        </div>
    )
}

const CBaseHome: React.FC = () => {
    function getAll() {
        return invoke('show_files', { directory: "/home/lucas/BashFast" })
    }

    // const contents = readTextFile('app.conf', { dir: BaseDirectory.AppConfig });

    return (
        <div>
            <h1 className='text-white'>Home</h1>
        </div>
    )
}

const Home: React.FC = () => {

    return (
        <MainContainer 
            title={"Home"}
            sidebar={<CBaseHome/>}
            content={<BaseHome/>}
        />
    )
}

export default Home
