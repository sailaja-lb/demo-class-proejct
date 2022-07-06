import {useSelector} from "react-redux";
import Login from "./components/Login";
import FizzBuzz from "./components/FizzBuzz";
import Register from "./components/Register";
import Ip from "./components/Ip";

function App({_useSelector=useSelector, LoginC=Login, FizzBuzzC=FizzBuzz, RegisterC=Register, IpC=Ip}) {
  const token = _useSelector(state => state.user.token)
  const registerPending = _useSelector(state => state.user.registerPending)

  if (token)
    return <>
      <FizzBuzzC/>
      <IpC />
      </>
  else if (registerPending)
    return <RegisterC/>

  else
    return <LoginC/>
}

export default App;