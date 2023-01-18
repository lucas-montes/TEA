import React from "react";
import KanbanTicket from "../../../models/KanbanTicket";
import LocalStorageManager from "../../../managers/LocalStorageManager";

export default function Modal() {
    const [showModal, setShowModal] = React.useState(false);
    const [inputs, setInputs] = React.useState(
        {
            title: "",
            content: "",
            taskStatus: "todo",
        }
    );

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(inputs);
        setShowModal(false)
        let ticket = new KanbanTicket(inputs.title, inputs.content, inputs.taskStatus, new Date());
        // ticket.save();
        const localSto = new LocalStorageManager();
        localSto.setValue("model", JSON.stringify(ticket))
    };
    function handleChange(event: any) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    return (
        <>
            <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Open regular modal
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-full h-full max-w-2xl md:h-auto">
                            {/*content*/}
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Modal Title
                                    </h3>
                                    <button onClick={() => setShowModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                                {/*body*/}
                                <form onSubmit={handleSubmit}>
                                    <div className="relative p-6 flex-auto">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={inputs.title}
                                            onChange={handleChange}
                                            className="
                                        bg-gray-50 border border-gray-300 
                                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                                        focus:border-blue-500 block w-full p-2.5  
                                        dark:bg-gray-700 
                                        dark:border-gray-600 
                                        dark:placeholder-gray-400 
                                        dark:text-white 
                                        dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500" />

                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                                        <textarea
                                            id="content"
                                            name="content"
                                            value={inputs.content}
                                            onChange={handleChange}
                                            className="
                                        block p-2.5 w-full text-sm 
                                        text-gray-900 bg-gray-50 rounded-lg border 
                                        border-gray-300 focus:ring-blue-500 
                                        focus:border-blue-500 
                                        dark:bg-gray-700 dark:border-gray-600 
                                        dark:placeholder-gray-400 dark:text-white 
                                        dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500"
                                        ></textarea>

                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
                                        <select
                                            id="taskStatus"
                                            name="taskStatus"
                                            value={inputs.taskStatus}
                                            onChange={handleChange}
                                            required

                                            className="
                                        bg-gray-50 border border-gray-300 
                                        text-gray-900 text-sm rounded-lg 
                                        focus:ring-blue-500 focus:border-blue-500 
                                        block w-full p-2.5 
                                        dark:bg-gray-700 
                                        dark:border-gray-600 
                                        dark:placeholder-gray-400 
                                        dark:text-white 
                                        dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500">
                                            <option value="todo">To Do</option>
                                            <option value="doing">Doing</option>
                                            <option value="done">Done</option>
                                        </select>

                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="
                                            text-red-500 background-transparent 
                                            font-bold uppercase px-6 py-2 text-sm 
                                            outline-none focus:outline-none mr-1 mb-1 
                                            ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <input
                                            className="
                                            bg-emerald-500 
                                            text-white active:bg-emerald-600 
                                            font-bold uppercase text-sm px-6 py-3 
                                            rounded shadow hover:shadow-lg outline-none 
                                            focus:outline-none mr-1 mb-1 ease-linear 
                                            transition-all duration-150"
                                            type="submit"
                                            value="Save Changes"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
