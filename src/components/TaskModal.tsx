import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../slices/taskSlice";
import { v4 as uuid } from "uuid";
import styles from "../styles/modules/modal.module.scss";
import Button from "./Button";
import toast from "react-hot-toast";

function TaskModal({ type, modalOpen, setModalOpen, task }: any) {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState(3);
    const dispatch = useDispatch();

    useEffect(() => {
        if (type === "update" && task) {
            setTitle(task.title);
            setStatus(task.status);
        } else {
            setTitle("");
            setStatus(3);
        }
    }, [type, task, modalOpen]);

    const handleOnChange = (e: any) => {
        if (e.target.value.length >= 255) {
            toast.error("Maximum 255 karakter girebilirsiniz!");
        } else if (!e.target.value.match(/^[a-z0-9 ]*$/i)) {
            toast.error("Sadece Alfanumerik karakter girebilirsiniz!");
        } else {
            setTitle(e.target.value);
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (title && status) {
            if (type === "add") {
                dispatch(
                    addTask({
                        id: uuid(),
                        title,
                        status,
                        time: new Date().toLocaleString(),
                    })
                );
                toast.success("Task Başarıyla Eklenmiştir");
            }
            if (type === "update") {
                if (task.title !== title || task.status !== status) {
                    dispatch(
                        editTask({
                            ...task,
                            title,
                            status,
                        })
                    );
                } else {
                    toast.error("Değişiklik Yapılmamıştır");
                }
            }
            setModalOpen(false);
        } else {
            toast.error("Task Başlığı Boş Olamaz");
        }
    };

    return (
        modalOpen && (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div
                        className={styles.closeButton}
                        onClick={() => setModalOpen(false)}
                        onKeyDown={() => setModalOpen(false)}
                        tabIndex={0}
                        role="button"
                    >
                        <MdOutlineClose />
                    </div>
                    <form
                        className={styles.form}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <h1 className={styles.formTitle}>
                            {type === "update" ? "Task Güncelle" : "Task Ekle"}
                        </h1>
                        <label htmlFor="title">
                            Başlık
                            <input
                                type="text"
                                placeholder="Başlık"
                                id="title"
                                value={title}
                                onChange={handleOnChange}
                                maxLength={255}
                                disabled={type === "update" ? true : false}
                            />
                        </label>
                        <label htmlFor="status">
                            Durum
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(+e.target.value)}
                            >
                                <option value={3}>Low</option>
                                <option value={2}>Normal</option>
                                <option value={1}>High</option>
                            </select>
                        </label>
                        <div className={styles.buttonContainer}>
                            <Button type="submit" variant="primary" disabled={!title.length}>
                                {type === "update" ? "Güncelle" : "Ekle"}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => setModalOpen(false)}
                                onKeyDown={() => setModalOpen(false)}
                            >
                                İptal
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default TaskModal;
