import { useState, useRef } from "react";

import ItemsManager from "../../../managers/ItemsManager";
import { useParams } from 'react-router-dom';
import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

import Note from "../../../models/Note";

export default function NoteContent() {
    const val = ItemsManager.getItem(useParams());
    const editor = useRef<SunEditorCore>();

    const [inputs, setInputs] = useState(
        {
            content: "",
        }
    );
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(inputs)
        new Note().update(val.id, { content: inputs });
    };
    function handleChange(content: any) {
        val.content = content;
        ItemsManager.saveItem(val)
        setInputs(content)
        // setInputs(values => ({ ...values, [name]: value }));
    };

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
    };


    return (<form onSubmit={handleSubmit}>
        <div className="shadow-lg ring-1 ring-black/10 relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg bg-opacity-90 group hover:bg-opacity-100">

            <SunEditor
                height="65vh"
                onChange={handleChange}
                setContents={val.content}
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
                className="
                        bg-emerald-500 
                        text-white active:bg-emerald-600 
                        font-bold uppercase text-sm px-6 py-3 
                        rounded shadow hover:shadow-lg outline-none 
                        focus:outline-none mr-1 mt-3 ease-linear 
                        transition-all duration-150"
                type="submit"

            >
                Save Changes
            </button>

        </div>
    </form>
    );

};