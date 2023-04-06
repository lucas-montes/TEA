
import ModalButton from "./Components/ModalButton"
import ModalBody from "./Components/Body"
import KanbanForm from "./Forms/Kanban";
import NewSimpleItemForm from "./Forms/NewSimpleItem"

type Props = {
    title: string,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    content?: any
}


export default function Modal({ title, showModal, setShowModal, content }: Props) {

    function getContent(content: any) {
        if (content) {
            return content
        } else {
            return <></>
        }
    }


    return (
        <>
            {/* <ModalButton setShowModal={setShowModal} /> */}
            {showModal ? (
                <ModalBody
                    title={title}
                    setShowModal={setShowModal}
                    content={getContent(content)} />
            ) : null}
        </>
    );
}
