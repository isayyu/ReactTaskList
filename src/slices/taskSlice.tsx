import { createSlice } from "@reduxjs/toolkit";

const getInitialTask = () => {
    const localTaskList = window.localStorage.getItem("taskList");
    if (localTaskList) {
        return JSON.parse(localTaskList);
    }
    window.localStorage.setItem("taskList", JSON.stringify([]));
    return [];
};

const initialValue = {
    taskList: getInitialTask(),
};

export const taskSlice = createSlice({
    name: "task",
    initialState: initialValue,
    reducers: {
        addTask: (state, action) => {
            state.taskList.push(action.payload);
            const taskList = window.localStorage.getItem("taskList");
            if (taskList) {
                const taskListArr = JSON.parse(taskList);
                taskListArr.push({ ...action.payload });
                window.localStorage.setItem(
                    "taskList",
                    JSON.stringify(taskListArr)
                );
            }
        },
        removeTask: (state, action) => {
            const taskList = window.localStorage.getItem("taskList");
            if (taskList) {
                const taskListArr = JSON.parse(taskList);
                taskListArr.forEach((task:any, index:any) => {
                    if(task.id === action.payload) {
                        taskListArr.splice(index, 1);
                    }
                });
                window.localStorage.setItem("taskList", JSON.stringify(taskListArr));
                state.taskList = taskListArr;
            }
        },
        editTask: (state, action) => {
            const taskList = window.localStorage.getItem("taskList");
            if (taskList) {
                const taskListArr = JSON.parse(taskList);
                taskListArr.forEach((task:any, index:any) => {
                    if(task.id === action.payload || task.id === action.payload.id) {
                        task.title = action.payload.title;
                        task.status = action.payload.status;
                    }
                });
                window.localStorage.setItem("taskList", JSON.stringify(taskListArr));
                state.taskList = taskListArr;
            }
        }
    },
});

export const { addTask, removeTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
