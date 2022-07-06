import {render, screen} from "@testing-library/react";
import FizzBuzz from "./FizzBuzz";
import userEvent from "@testing-library/user-event";

it('should show an input field, a result, and a submit button', () => {
    render(<FizzBuzz _useSelector={() => {}} _useDispatch={() => {}}/>)
    expect(screen.getByPlaceholderText('Input')).toBeInTheDocument()
    expect(screen.getByTitle('Result')).toBeInTheDocument()
})

it('should show the result in the result field', () => {
    const result = 'some result'
    const state = {fizzbuzz: {result}}
    render(<FizzBuzz _useSelector={fn => fn(state)} _useDispatch={() => {}}/>)
    const resultElement = screen.getByTitle('Result')
    expect(resultElement.innerHTML).toBe(result)
})

it('should dispatch initiateFizz with the input and token when input changes', () => {
    const dispatch = jest.fn()
    const initFizz = jest.fn()
    const ret = 'some return'
    initFizz.mockImplementation(() => ret)
    const token = 'some token'
    const state = {user: {token}}
    render(<FizzBuzz _useSelector={fn => fn(state)} _useDispatch={()=>dispatch} _initiateFizz={initFizz}/>)
    const input = 'some input'
    userEvent.type(screen.getByPlaceholderText('Input'), input)
    expect(initFizz).toHaveBeenCalledWith(token, input)
    expect(dispatch).toHaveBeenCalledWith(ret)
})