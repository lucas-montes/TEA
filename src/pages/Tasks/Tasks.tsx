
import { Task } from "@/pages/Tasks/Task";

type Props = {
    tasks: Array<any>
}

const Tasks = ({ tasks }: Props) => {


    return (
        <>

            {
                tasks.map((task) => (
                    <Task
                        key={task.id}
                        content={task.content}
                        status={task.taskStatus}
                    />
                ))}

        </>
    );
};

export default Tasks;