import React from "react";
import { useSelector } from "react-redux";
import { TaskTable } from "./TaskTable";

function AppContent() {
    const taskList = useSelector((state: any) => state.task.taskList);
    return (
        <div>
           <TaskTable taskList={taskList} />
        </div>
    );
}

export default AppContent;
