import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./src/Components/Body"
import Login from "./src/Components/Login"
import Profile from "./src/Components/Profile"
import { Provider } from "react-redux"
import appStore from "./src/utils/appStore"
import Feed from "./src/Components/Feed"
import Connections from "./src/Components/Connections"
import Request from "./src/Components/Request"
import SignUpNewuser from "./src/Components/SignUpNewuser"
import Chat from "./src/Components/Chat"
import { useLocation } from "react-router-dom"
import Navbar from "./src/Components/Navbar"
import Footer from "./src/Components/Footer"
import ForgotPass from "./src/Components/ForgotPass"


function App() {


  return (
    <>

      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
          <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password"  element={<ForgotPass/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/request" element={<Request />}></Route>
              <Route path="/signup" element={<SignUpNewuser/>}></Route>
              <Route path="/chat/:target_id" element={<Chat/>}></Route>
              </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App;
