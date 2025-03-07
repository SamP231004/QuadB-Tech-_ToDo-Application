import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    SET_FILTER,
    SET_PRIORITY_FILTER,
} from '../actions/taskActions';

const initialState = {
    tasks: [],
    loading: false,
    error: null,
    filter: 'all',
    priorityFilter: 'all',
};

console.log('Initial Redux State:', initialState);

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_SUCCESS:
            return { ...state, loading: false, tasks: action.payload };
        case ADD_TASK:
            return { ...state, tasks: [...state.tasks, action.payload] };
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };
        case SET_FILTER:
            return { ...state, filter: action.payload };
        case SET_PRIORITY_FILTER:
            return { ...state, priorityFilter: action.payload };
        default:
            return state;
    }
};

export default taskReducer;