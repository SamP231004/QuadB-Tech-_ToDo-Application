import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/authActions';

const initialState = {
  isAuthenticated: !!localStorage.getItem('user'),
  user: JSON.parse(localStorage.getItem('user')),
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, loading: false, isAuthenticated: true, user: action.payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload, isAuthenticated: false, user: null };
    case LOGOUT:
      localStorage.removeItem('user');
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export default authReducer;