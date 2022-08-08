import { useState } from "react";
import Button from "./Button";
import styles from "../styles/modules/app.module.scss";
import TaskModal from "./TaskModal";
import PageTitle from "./PageTitle";
import { GoPlus } from "react-icons/go";

function AppHeader() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className={styles.appHeader}>
            <PageTitle>Task Listesi</PageTitle>
            <Button type="add" variant="primary" onClick={() => setModalOpen(true)}><GoPlus /> Task Ekle</Button>
            <TaskModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
    );
}

export default AppHeader;