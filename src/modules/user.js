// Actions

export const LOGIN_START = 'fizzbuzz/user/LOGIN_START'
export const LOGIN_SUCCESS = 'fizzbuzz/user/LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'fizzbuzz/user/LOGIN_FAILURE'
export const REGISTER_START = 'fizzbuzz/user/REGISTER_START'
export const REGISTER_SUCCESS = 'fizzbuzz/user/REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'fizzbuzz/user/REGISTER_FAILURE'
export const REGISTER_USER = 'fizzbuzz/user/REGISTER_USER'
export const REGISTER_CREDENTIALS = 'fizzbuzz/user/REGISTER_CREDENTIALS'
export const USERS = 'fizzbuzz/user/USERS'
export const UPDATE_CREDENTIALS = 'fizzbuzz/user/UPDATE_CREDENTIALS'
export const CANCEL = 'fizzbuzz/user/CANCEL'
export const LOGOUT = 'fizzbuzz/user/LOGOUT'

// InitialState
const initialState = {
    token: null,
    loginPending: false,
    registerPending: false,
    credentials: {username: '', password: ''},
    newUser: {username: '', password: ''},
}

// Reducer
export default function reducer(state = initialState, action) {
    switch (action?.type) {
        case LOGIN_START:
            return {
                ...state,
                loginPending: true
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                loginPending: false
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                loginPending: false
            }

        case UPDATE_CREDENTIALS:
            return {
                ...state,
                credentials: {
                    username: action.payload.username,
                    password: action.payload.password
                }
            }
        case REGISTER_USER:
            return {
                ...state,
                newUser: {
                    username: action.payload.username,
                    password: action.payload.password
                }
            }
        case REGISTER_START:
            return {
                ...state,
                registerPending: true,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                registerPending: false,
                loginPending: false
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                registerPending: false
            }
        case LOGOUT:
            return {
                ...state,
                credentials: {
                    username: '',
                    password: ''
                },
                token: null
            }
        case CANCEL:
            return {
                ...state,
                loginPending: false,
                registerPending: false
            }

        default:
            return {...state}
    }
}

// Side Effects
export function initiateLogin(_fetch=fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: LOGIN_START})
        const {username, password} = getState().user.credentials
        const url = `http://localhost:8081/login?username=${username}&password=${password}`
        const response = await _fetch(url)

        if (response.ok) {
            const token = await response.json()
            dispatch({type: LOGIN_SUCCESS, payload: token})
        } else
            dispatch({type: LOGIN_FAILURE})
    }
}

export function initiateRegister(_fetch=fetch) {
    return async function createRegister(dispatch, getState) {
        dispatch({type: REGISTER_START})
        //get or set?
        const {username, password} = getState().user.newUser;
        const registerUrl =`http://localhost:8081/register`
        const response = await _fetch(registerUrl,{method:'POST',headers:{'Accept': 'application/json',
                'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}, body: JSON.stringify({
                username: `${username}`,
                password: `${password}`,
            })
        })
        //const url = `http://localhost:8081/register?username=${username}&password=${password}`
        //const response = await _fetch(url)
        if(response.ok) {
            dispatch({type: REGISTER_SUCCESS})
        }
        else
            dispatch({type:REGISTER_FAILURE})
    }
}