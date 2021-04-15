import route from '../route/traq'

// Action types
const USER_LOGIN = 'userLogin'
const USER_LOGOUT = 'userLogout'
const GET_CURRENT_USER = 'getCurrentUser'


// Actions
export const getCurrentUser = () => {
    const auth_token = localStorage.getItem('auth_token')
    return {
        type: GET_CURRENT_USER,
        payload: auth_token
    }
}

export const userLogin = (userData) => async dispatch => {
    await route.post('auth/fb-login', userData)
    .then(({data}) => {
        localStorage.setItem('auth_token', data.auth_token)
            dispatch({
            type: USER_LOGIN,
            payload: data.auth_token
        })
    })
    .catch(() => console.log('Something went wrong'))

    
}
export const userLogout = () => {
    localStorage.removeItem('auth_token')
    return {
        type: USER_LOGOUT
    }
}


// Reducer
export default function (auth = '', action) {
    switch (action.type) {
        case GET_CURRENT_USER:
            return action.payload

        case USER_LOGIN:
            return action.payload

        case USER_LOGOUT:
            return ''

        default:
            return auth;
    }
}