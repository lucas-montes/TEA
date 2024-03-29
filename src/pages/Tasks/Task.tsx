import { Task } from "@/models/Project";

type Props = {
    task: TaskType,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setWorkingTask: React.Dispatch<React.SetStateAction<Tasks>>,
    setModalTitle: React.Dispatch<React.SetStateAction<string>>
}
export const TaskComponent = ({ task, setShowModal, setWorkingTask, setModalTitle }: Props) => {

    function handleOnClick(): void {
        setWorkingTask(task);
        setModalTitle("Update task")
        setShowModal(true);
    }

    function getColorAndStatus(): [string, string] {
        switch (task.taskStatus) {
            case "to-do":
                return ["outline-blue-500 ring-blue-500", "To Do"];
            case "doing":
                return ["outline-yellow-500 ring-yellow-500", "Doing"];
            default:
                return ["outline-green-500 ring-green-500", "Done"];
        }
    }


    const [color, taskStatus] = getColorAndStatus();
    return (
        <div

            className="
                bg-white text-black    
                dark:bg-gray-800 dark:text-white 
                w-11/12 max-w-screen flex flex-col
                rounded-xl shadow-lg p-4 ml-4 mb-3 mt-3"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div
                        className={`rounded-full w-4 h-4 outline ${color} ring ring-inset`}></div>
                    <div
                        onClick={handleOnClick}
                        className="cursor-pointer text-md font-bold">
                        {task.title}
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="cursor-pointer">
                        {/* <img className="w-5 h-5 rounded-lg" src="https://i.pravatar.cc/300" /> */}
                    </div>
                    <div className="text-gray-500 hover:text-gray-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                    <div className="text-gray-500 hover:text-gray-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                        </svg>
                    </div>
                </div>
            </div>
            <div
                onClick={handleOnClick}
                className="cursor-pointer p-4 dark:text-white text-gray-800 text-sm">
                {task.content}
            </div>
            <div className="text-gray-500 font-bold text-sm">
                # {taskStatus}
            </div>
        </div>
    );
};
