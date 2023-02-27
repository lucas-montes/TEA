import { useState } from "react";

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';


export default function NoteContent() {
    const [markDown, setMarkdown] = useState();
    const id = location.pathname.split("/")[2];
    console.log(id);

    return (
        <div className="shadow-lg ring-1 ring-black/10 relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100" draggable="true">
            <textarea
                value={markDown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="textarea"
            ></textarea>
            <div className="output">
                <ReactMarkdown className="markdown" rehypePlugins={[rehypeHighlight]}>{markDown}</ReactMarkdown>
            </div>
        </div>
    );

};