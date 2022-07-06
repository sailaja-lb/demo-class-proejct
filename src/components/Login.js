import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {initiateLogin, LOGIN_SUCCESS, REGISTER_START, UPDATE_CREDENTIALS} from "../modules/user";

export default function Login({_useSelector=useSelector, _useDispatch=useDispatch}) {
    const credentials = _useSelector(state => state.user.credentials)
    //const loginPending = _useSelector(state => state.user.loginPending)
    const dispatch = _useDispatch()

    function updateUsername(username) {
        dispatch({type: UPDATE_CREDENTIALS, payload: {...credentials, username}})
    }

    function updatePassword(password) {
        dispatch({type: UPDATE_CREDENTIALS, payload: {...credentials, password}})
    }

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(initiateLogin())
    }

    return <Form onSubmit={handleSubmit}>
        <Form.Control placeholder='Username' onChange={e => updateUsername(e.target.value)}/>
        <Form.Control placeholder='Password' onChange={e => updatePassword(e.target.value)}/>
        <Button type='submit'>Login</Button>
        <Button type='button' onClick={() =>  dispatch({type:REGISTER_START})}>Register</Button>
    </Form>
}