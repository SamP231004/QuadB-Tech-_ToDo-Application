export const login = (credentials) => {
    return async dispatch => {
        dispatch({ type: 'LOGIN_REQUEST' });

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock validation
            if (credentials.email === 'user@example.com' && credentials.password === 'password') {
                const user = {
                    id: 1,
                    name: 'Test User',
                    email: credentials.email
                };

                // Save to localStorage for persistence
                localStorage.setItem('isAuthenticated', JSON.stringify(true));
                localStorage.setItem('user', JSON.stringify(user));

                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: user
                });

                return Promise.resolve(user);
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: error.message
            });

            return Promise.reject(error);
        }
    };
};

export const logout = () => {
    return dispatch => {
        // Remove from localStorage
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');

        dispatch({ type: 'LOGOUT' });
    };
};
