import React, { useState } from "react";
import { Space, Table, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { removeTask } from "../slices/taskSlice";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import styles from "../styles/modules/taskItem.module.scss";
import TaskModal from "./TaskModal";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const { Search } = Input;

const { Option } = Select;

const { Column } = Table;

export interface ITask {
    id: string;
    title: string;
    status?: 1 | 2 | 3;
    date?: string;
}

export interface IProps {
    taskList: Array<ITask>;
}

export const TaskTable: React.FC<IProps> = ({ taskList }: IProps) => {
    const [modalUpdate, setModalUpdate] = useState(false);
    const [taskSelected, setTaskSelected] = useState();
    const [searchValue, setSearchValue] = useState("");
    const [status, setStatus] = useState(null);

    const dispatch = useDispatch();

    const onClickDelete = (id: string) => {
        confirmAlert({
            title: "Dikkat!",
            message: "Bu Kaydı Sİlmek İstediğinizden Eminmisiniz?",
            buttons: [
                {
                    label: "Evet",
                    onClick: () => {
                        dispatch(removeTask(id));
                        toast.success("Taskınız Başarıyla Silinmiştir");
                    },
                },
                {
                    label: "İptal",
                },
            ],
        });
    };

    const onClickEdit = (task: any) => {
        setModalUpdate(true);
        setTaskSelected(task);
    };

    let filteredTaskList = searchValue
        ? taskList.filter((i: any) =>
              i.title?.toLocaleLowerCase().includes(searchValue?.toLocaleLowerCase())
          )
        : taskList;
    filteredTaskList = status
        ? filteredTaskList.filter((i: any) => i.status === status)
        : filteredTaskList;

    return (
        <>
            <TaskModal
                type="update"
                modalOpen={modalUpdate}
                setModalOpen={setModalUpdate}
                task={taskSelected}
            />
            <div style={{ display: "flex", marginBottom: "10px" }}>
                <Search
                    onChange={(args) => setSearchValue(args.target.value)}
                    value={searchValue}
                    placeholder={"Arama"}
                />
                <Select
                    value={status}
                    defaultValue={null}
                    placeholder="All Status"
                    allowClear
                    style={{
                        width: 120,
                        marginLeft: 10,
                    }}
                    onChange={(value) => setStatus(value)}
                >
                    <Option value={null}>All Status</Option>
                    <Option value={3}>Low</Option>
                    <Option value={2}>Normal</Option>
                    <Option value={1}>High</Option>
                </Select>
            </div>
            <Table rowKey={"id"} dataSource={filteredTaskList}>
                <Column
                    title="Başlık"
                    dataIndex="title"
                    key="title"
                    sorter={{
                        compare: (a: any, b: any) =>
                            a.title.localeCompare(b.title),
                        multiple: 2,
                    }}
                    ellipsis
                />
                <Column
                    title="Tarih"
                    dataIndex="time"
                    key="time"
                    sorter={{
                        compare: (a: any, b: any) =>
                            a.time.localeCompare(b.time),
                        multiple: 2,
                    }}
                />
                <Column
                    title="Durum"
                    dataIndex="status"
                    key="status"
                    defaultSortOrder={"ascend"}
                    sorter={{
                        compare: (a: any, b: any) => a.status - b.status,
                        multiple: 2,
                    }}
                    render={(taskStatus: number) => {
                        let _status: string;
                        switch (taskStatus) {
                            case 1:
                                _status = "High";
                                break;
                            case 2:
                                _status = "Normal";
                                break;
                            case 3:
                            default:
                                _status = "Low";
                        }
                        return (
                            <div
                                className={styles[_status.toLowerCase()]}
                                title={_status}
                            >
                                {_status}
                            </div>
                        );
                    }}
                    width={150}
                />
                <Column
                    title=""
                    key="action"
                    align="right"
                    render={(task) => (
                        <Space size="middle">
                            <div
                                className={styles.icon}
                                role="button"
                                onKeyDown={() => onClickEdit(task)}
                                tabIndex={0}
                                onClick={() => onClickEdit(task)}
                            >
                                <MdEdit />
                            </div>
                            <div
                                className={styles.icon}
                                role="button"
                                onKeyDown={() => onClickDelete(task.id)}
                                tabIndex={0}
                                onClick={() => onClickDelete(task.id)}
                            >
                                <MdDelete />
                            </div>
                        </Space>
                    )}
                    width={100}
                />
            </Table>
        </>
    );
};
