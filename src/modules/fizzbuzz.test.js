import reducer, {FIZZ_FAILURE, FIZZ_START, FIZZ_SUCCESS, initiateFizz} from "./fizzbuzz";

it('should start with no result', () => {
    const state = reducer()
    expect(state.result).toBe('')
})

it('should start with pending false', () => {
    const state = reducer()
    expect(state.pending).toBe(false)
})

it('should set pending true when FIZZ_START', () => {
    const state = reducer(undefined, {type: FIZZ_START})
    expect(state.pending).toBe(true)
})

it('should set result and pending false when FIZZ_SUCCESS', () => {
    const initialState = reducer()
    initialState.pending = true
    const result = 'some result'
    const state = reducer(initialState, {type: FIZZ_SUCCESS, payload: result})
    expect(state.pending).toBe(false)
    expect(state.result).toBe(result)
})

it('should set pending false when FIZZ_FAILURE', () => {
    const initialState = reducer()
    initialState.pending = true
    const state = reducer(initialState, {type: FIZZ_FAILURE})
    expect(state.pending).toBe(false)
})

it('should dispatch FIZZ_START w/ token and input then FIZZ_SUCCESS when initiateFizz', async () => {
    const dispatch = jest.fn()
    const token = 'some token'
    const input = 'some input'
    const result = 'some result'
    const url = `http://localhost:8080/fizzbuzz?token=${token}&input=${input}`
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            text: () => new Promise(res => res(result))
        }))
    }

    await initiateFizz(token, input, mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: FIZZ_START})
    expect(dispatch).toHaveBeenCalledWith({type: FIZZ_SUCCESS, payload: result})
})