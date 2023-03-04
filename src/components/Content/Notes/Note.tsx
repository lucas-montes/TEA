import { useState, useRef, useEffect } from "react";

import ItemsManager from "../../../managers/ItemsManager";
import { useParams } from 'react-router-dom';
import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

import Note from "../../../models/Note";


export default function NoteContent() {
    const val = ItemsManager.getItem(useParams());
    const editor = useRef<SunEditorCore>();
    const [inputs, setInputs] = useState({ title: "", content: "" });

    useEffect(() => {
        if (inputs.title !== val.title) { setInputs({ title: val.title, content: val.content }); }
    });

    const handleSubmit = (event: any) => {
        event.preventDefault();
        ItemsManager.updateItems(val);
        new Note().update(val.id, { title: inputs.title, content: inputs.content });
    };

    function handleChange(event: any) {
        const value = event.target.value;
        val.title = value;
        ItemsManager.saveItem(val);
        setInputs({ title: value, content: inputs.content });
    };

    function handleChangeEditor(content: any) {
        val.content = content;
        ItemsManager.saveItem(val);
        setInputs({ title: inputs.title, content: content });
    };

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="
            shadow-lg ring-1 ring-black/10 
            relative flex flex-col 
            items-start p-4 mt-3 bg-white rounded-lg 
            bg-opacity-90 group hover:bg-opacity-100">
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={inputs.title}
                    onChange={handleChange}
                    className="input-styled" />
                <SunEditor
                    name="content"
                    height="65vh"
                    onChange={handleChangeEditor}
                    setContents={inputs.content}
                    setOptions={{
                        width: "100%",
                        buttonList: [
                            ["undo", "redo"],
                            ["font", "fontSize"],
                            ['paragraphStyle', 'blockquote'],
                            [
                                "bold",
                                "underline",
                                "italic",
                                "strike",
                                "subscript",
                                "superscript"
                            ],
                            ["fontColor", "hiliteColor"],
                            ["align", "list", "lineHeight"],
                            ["outdent", "indent"],
                            ["table", "horizontalRule", "link"],
                            // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                            ["fullScreen", "showBlocks", "codeView"],
                            ["removeFormat"],
                        ],
                    }}
                    getSunEditorInstance={getSunEditorInstance} />
                <button
                    className="save-button"
                    type="submit"

                >
                    Save Changes
                </button>

            </div>
        </form>
    );

};