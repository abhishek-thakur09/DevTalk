import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./src/Components/Body"
import Login from "./src/Components/Login"
import Profile from "./src/Components/Profile"
import { Provider } from "react-redux"
import appStore from "./src/utils/appStore"
import Feed from "./src/Components/Feed"
import Connections from "./src/Components/Connections"
import Request from "./src/Components/Request"


function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
          <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/request" element={<Request />}></Route>
              
              </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App;
