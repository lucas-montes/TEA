import { FormEvent, useState } from "react";
import { useRecoilState } from "recoil";

import { projectsSelector } from "@/recoil/tasks/projects.recoil";

import { Plus } from "@/components/Icons";
import Project from "@/models/Project";




export const NewProjectForm = () => {
    const [tempName, setTempName] = useState("");
    const [items, setItems] = useRecoilState(projectsSelector);


    function handleChange(event: FormEvent<HTMLFormElement>) {
        setTempName(event.target.value)
    }

    function saveItem(id: number, project: Project): void {
        project.id = id;
        project.tasks = {};
        setItems(project);
        setTempName("");
    }

    const createItem = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (tempName != "") {
            const newObj = new Project(tempName);
            newObj.create()
                .then(
                    newId => { saveItem(newId, newObj) }
                )
                .catch(err => { console.error(err) })
        }
    };

    return (
        <form className="self-center w-full p-3" onSubmit={createItem}>
            <div className="flex">
                <div className="relative w-full">
                    <input
                        type="text"
                        value={tempName}
                        onChange={handleChange}
                        id="search-dropdown"
                        className="
                    block p-2.5 w-full 
                    z-20 text-sm text-gray-900 
                    bg-gray-50 rounded-lg 
                    border-l-gray-100 border-l-2 
                    border border-gray-300 
                    focus:ring-blue-500 
                    focus:border-blue-500 
                    dark:bg-gray-700 
                    dark:border-gray-600 
                    dark:placeholder-gray-400 
                    dark:text-white 
                    dark:focus:border-blue-500"
                        placeholder="New" />
                    <button
                        type="submit"
                        className="
                    absolute top-0 right-0 
                    p-2.5 text-sm font-medium 
                    text-white bg-blue-700 
                    rounded-r-lg border 
                    border-blue-700 hover:bg-blue-800 
                    focus:ring-4 focus:outline-none 
                    focus:ring-blue-300 dark:bg-blue-600 
                    dark:hover:bg-blue-700 
                    dark:focus:ring-blue-800">
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </form>
    );
};





