import AppItemComponent from "./AppItemComponent";
import { BsPlus, BsAlarm } from 'react-icons/bs';

export default function AppContentBarNotes() {
    const content = [
        { title: "kkhjkhj", url: "mola" },
        { title: "kkhjkhj", url: "mola" },
        { title: "kkhjkhj", url: "mola" },
        { title: "kkhjkhj", url: "mola" },
        { title: "kkhjkhj", url: "mola" }
    ]

    return (
        <div>
            {content.map((value, index) => {
                return <AppItemComponent title={value.title} url={value.url} icon={<BsAlarm size="15" />} key={index} />
            })}
        </div>
    );
};
