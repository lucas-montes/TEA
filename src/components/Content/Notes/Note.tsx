import { useState } from "react";

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

const Note = (title: string, content: string, key: string) => {
    const [markDown, setMarkdown] = useState();

    return (
        <div key={key} className="shadow-lg ring-1 ring-black/10 relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100" draggable="true">
            <textarea
                value={markDown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="textarea"
            ></textarea>
            <div className="output">
                <ReactMarkdown className="markdown" rehypePlugins={[rehypeHighlight]}>{markDown}</ReactMarkdown>
            </div>
        </div>
    )
}

export default Note;