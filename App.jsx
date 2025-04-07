import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./src/Components/Body"
import Login from "./src/Components/Login"
import Profile from "./src/Components/Profile"
import { Provider } from "react-redux"
import appStore from "./src/utils/appStore"
import Feed from "./src/Components/Feed";

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/profile" element={<Profile />}></Route>

            </Route>

          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
