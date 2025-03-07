export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SET_FILTER = 'SET_FILTER';
export const SET_PRIORITY_FILTER = 'SET_PRIORITY_FILTER';

export const fetchTasksRequest = () => ({
    type: FETCH_TASKS_REQUEST,
});

export const fetchTasksSuccess = (tasks) => ({
    type: FETCH_TASKS_SUCCESS,
    payload: tasks,
});

export const fetchTasksFailure = (error) => ({
    type: FETCH_TASKS_FAILURE,
    payload: error,
});

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
});

export const updateTask = (task) => ({
    type: UPDATE_TASK,
    payload: task,
});

export const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    payload: taskId,
});

export const setFilter = (filter) => ({
    type: SET_FILTER,
    payload: filter,
});

export const setPriorityFilter = (priorityFilter) => ({
    type: SET_PRIORITY_FILTER,
    payload: priorityFilter,
});