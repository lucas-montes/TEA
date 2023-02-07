import React from "react";
import ModalButton from "./Components/ModalButton"
import ModalBody from "./Components/ModalBody"
import NotesForm from "./Forms/NotesForm";
import KanbanForm from "./Forms/KanbanForm";
import { kanban, notes, alias, settings, schedule } from "../../constants/Apps"



export default function Modal(props: any) {
    const [showModal, setShowModal] = React.useState(false);

    function displayForm(app: string) {
        switch (app) {
            case kanban:
                return <KanbanForm />;
            case notes:
                return <NotesForm />;
            case alias:
                return <NotesForm />;
            default:
                return <NotesForm />;
        }
    }

    return (
        <>
            <ModalButton setShowModal={setShowModal} />
            {showModal ? (
                <ModalBody title={`Add a new ${props.app}`} setShowModal={setShowModal} form={displayForm(props.app)} />
            ) : null}
        </>
    );
}
