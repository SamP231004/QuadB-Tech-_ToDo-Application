// src/redux/store.js
import { createStore } from 'redux'; // Removed applyMiddleware and thunk import
import rootReducer from './reducers';

const store = createStore(rootReducer); // Removed applyMiddleware

export default store;