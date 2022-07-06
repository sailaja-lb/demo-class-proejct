export const FIZZ_START = 'fizzbuzz/fizzbuzz/FIZZ_START'
export const FIZZ_SUCCESS = 'fizzbuzz/fizzbuzz/FIZZ_SUCCESS'
export const FIZZ_FAILURE = 'fizzbuzz/fizzbuzz/FIZZ_FAILURE'
export const IP_START = 'fizzbuzz/fizzbuzz/IP_START'
export const IP_SUCCESS = 'fizzbuzz/fizzbuzz/IP_SUCCESS'
export const IP_FAILURE = 'fizzbuzz/fizzbuzz/IP_FAILURE'

const initialState = {
    result: '',
    ipResult: '',
    fizzPending: false,
    ipPending: false
}

export default function reducer(state = initialState, action) {
    switch (action?.type) {
        case FIZZ_START:
            return {
                ...state,
                fizzPending: true
            }

        case FIZZ_SUCCESS:
            return {
                ...state,
                fizzPending: false,
                result: action.payload
            }

        case FIZZ_FAILURE:
            return {
                ...state,
                fizzPending: false
            }
        case IP_START:
            return {
                ...state,
                ipPending: true
            }

        case IP_SUCCESS:
            return {
                ...state,
                ipPending: false,
                ipResult: action.payload
            }

        case IP_FAILURE:
            return {
                ...state,
                ipPending: false
            }

        default:
            return {...state}
    }
}
//Why write this? Purpose?
export function initiateFizz(token, input, _fetch=fetch) {
    return async function sideEffect(dispatch) {
        dispatch({type: FIZZ_START})
        const url = `http://localhost:8080/fizzbuzz?token=${token}&input=${input}`
        const response = await _fetch(url)

        if (response.ok) {
            const result = await response.text()
            dispatch({type: FIZZ_SUCCESS, payload: result})
        }
    }
}
export function initiateIp(token, _fetch=fetch) {
    return async function ipEffect(dispatch) {
        dispatch({type: IP_START})
        const url = `http://localhost:8080/ip?token=${token}`
        const response = await _fetch(url)

        if (response.ok) {
            const jsonRes = await response.json()
            const ipRes = jsonRes.ip
            dispatch({type: IP_SUCCESS, payload: ipRes})
            //return ipRes;
        }
    }
}