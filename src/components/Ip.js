import {useDispatch, useSelector} from "react-redux";
import {initiateIp, IP_START} from "../modules/fizzbuzz";
import {Button, Form} from "react-bootstrap";
import {useEffect} from "react";

export default function Ip({_useSelector=useSelector, _useDispatch=useDispatch, _initiateIp=initiateIp}) {
    const result = _useSelector(state => state.fizzbuzz?.ipResult)
    const token = _useSelector(state => state.user?.token)
    const dispatch = _useDispatch()

    useEffect(() => {
        dispatch(_initiateIp(token))
    });

    return <Form>
        {/*<Button type='button' onClick={() =>  dispatch(_initiateIp(token, request))}>IP</Button>*/}
        <Form.Label title='Result'>IP: {result}</Form.Label>
    </Form>

}