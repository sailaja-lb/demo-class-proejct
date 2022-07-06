import {useDispatch, useSelector} from "react-redux";
import {Button, Form} from "react-bootstrap";
import {
    CANCEL,
    initiateRegister, REGISTER_CREDENTIALS, REGISTER_USER, UPDATE_CREDENTIALS, USERS,
} from "../modules/user";

export default function Register({_useSelector = useSelector, _useDispatch=useDispatch}){
    const users = _useSelector(state => state.user.newUser)
    //const registerPending = _useSelector(state => state.user.registerPending)
    const dispatch = _useDispatch()

    function handleRegister(event) {
        event.preventDefault()
        dispatch(initiateRegister())
    }

    function updateUsername(username) {
        dispatch({type: REGISTER_USER, payload: {...users, username}})
    }

    function updatePassword(password) {
        dispatch({type: REGISTER_USER, payload: {...users, password}})
    }

    return <Form onSubmit={handleRegister}>
        <Form.Control placeholder='Username' onChange={e => updateUsername(e.target.value)}/>
        <Form.Control placeholder='Password' onChange={e => updatePassword(e.target.value)}/>
        <Button type='submit' >Register</Button>
        <Button title='Cancel' onClick={() =>  dispatch({type:CANCEL})} variant="link">Cancel</Button>
    </Form>
}