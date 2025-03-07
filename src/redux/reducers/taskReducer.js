const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    loading: false,
    error: null,
    filter: 'all', // all, completed, active
    priorityFilter: 'all' // all, high, medium, low
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TASKS_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'FETCH_TASKS_SUCCESS':
            return {
                ...state,
                tasks: action.payload,
                loading: false
            };
        case 'FETCH_TASKS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                )
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            };
        case 'SET_PRIORITY_FILTER':
            return {
                ...state,
                priorityFilter: action.payload
            };
        default:
            return state;
    }
};

export default taskReducer;