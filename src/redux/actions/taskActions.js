export const fetchTasks = () => {
    return async dispatch => {
        dispatch({ type: 'FETCH_TASKS_REQUEST' });

        try {
            // Get tasks from localStorage
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

            dispatch({
                type: 'FETCH_TASKS_SUCCESS',
                payload: tasks
            });
        } catch (error) {
            dispatch({
                type: 'FETCH_TASKS_FAILURE',
                payload: error.message
            });
        }
    };
};

export const addTask = (task) => {
    return (dispatch, getState) => {
        const newTask = {
            ...task,
            id: Date.now().toString(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        dispatch({
            type: 'ADD_TASK',
            payload: newTask
        });

        // Update localStorage
        const { tasks } = getState().tasks;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
};

export const updateTask = (task) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'UPDATE_TASK',
            payload: task
        });

        // Update localStorage
        const { tasks } = getState().tasks;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
};

export const deleteTask = (taskId) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_TASK',
            payload: taskId
        });

        // Update localStorage
        const { tasks } = getState().tasks;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
};

export const setFilter = (filter) => ({
    type: 'SET_FILTER',
    payload: filter
});

export const setPriorityFilter = (priority) => ({
    type: 'SET_PRIORITY_FILTER',
    payload: priority
});
