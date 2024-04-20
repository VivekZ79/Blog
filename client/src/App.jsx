import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./components/account/Login";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import DataProvider from "./context/DataProvider";
import Createpost from "./components/create/Createpost";
const PrivateRoute = ({ isAuth, ...props }) => {
  return isAuth ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};
function App() {
  const [isAuth, isUserAuth] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 90 }}>
          <Routes>
            <Route path="/login" element={<Login isUserAuth={isUserAuth} />} />
            <Route path="/" element={<PrivateRoute isAuth={isAuth} />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/create" element={<PrivateRoute isAuth={isAuth} />}>
              <Route path="/create" element={<Createpost />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
