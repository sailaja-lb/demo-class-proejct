import {Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {initiateFizz} from "../modules/fizzbuzz";
import Ip from "./Ip";

export default function FizzBuzz({_useSelector=useSelector, _useDispatch=useDispatch, _initiateFizz=initiateFizz, IpC=Ip}) {
    const result = _useSelector(state => state.fizzbuzz?.result)
    const token = _useSelector(state => state.user?.token)
    const dispatch = _useDispatch()

    function handleChange(event) {
        dispatch(_initiateFizz(token, event.target.value))
    }

    return <Form>
        <Form.Control placeholder='Input' onChange={handleChange}/>
        <Form.Label title='Result'>{result}</Form.Label>
    </Form>
}