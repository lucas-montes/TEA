import { IconButton } from "@/components/Button";
import { Plus } from "@/components/Icons";
import {Project} from "@/recoil/tasks/types"

import { FormEvent, useState } from "react";
import { useRecoilState, RecoilState } from "recoil";
import { v4 as uuid } from "uuid";

type Props = {
    recoilStateMethod: RecoilState<any>
  };

export const NewProjectForm = ({ recoilStateMethod }: Props) => {
  const [tempName, setTempName] = useState("");
  const [items, setItems] = useRecoilState(recoilStateMethod);

  const resetForm = () => { setTempName(""); };

  function handleChange(event) {
    setTempName(event.target.value)
  }

  const createItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newObj = items.reduce((newItem: object, currentItem: Project) => {
      newItem[currentItem.id] = currentItem;
      return newItem;
    }, {});
    const id = uuid();
    newObj[id] = {id:id, name:tempName, tasks: {}} as Project;
    setItems(newObj);
    resetForm();
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





