import AppItemComponent from "./AppItemComponent";
import { BsPlus, BsAlarm } from 'react-icons/bs';

export default function AppContentBarKanban() {
    const content = [
        { title: "rrrrrr", url: "mola" },
        { title: "rrrrrr", url: "mola" },
        { title: "rrrrrr", url: "mola" },
        { title: "rrrrrr", url: "mola" },
        { title: "rrrrrr", url: "mola" }
    ]

    return (
        <div>
            {content.map((value, index) => {
                return <AppItemComponent title={value.title} url={value.url} icon={<BsAlarm size="15" />} key={index} />
            })}
        </div>
    );
};
