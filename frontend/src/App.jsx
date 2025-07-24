import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Homes from "./components/Homes";
import { useEffect, useState } from "react";
import { ProfileContext, UserContext } from "./contexts/UserContext";
import HouseContext from "./contexts/HouseContext";
import Notfound from "./components/Notfound";
import Profile from "./components/Profile";
import HomeSingleInfo from "./components/HomeSingleInfo";
import SelectionContext from "./contexts/SelectionContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [containedHouses, setContainedHouses] = useState(null);
  const [selection, setSelection] = useState(1);
  const [mode, setMode] = useState(1);

  useEffect(() => {
    setLoggedUser({
      email: localStorage.getItem("user"),
      id: localStorage.getItem("userId"),
    });
  }, []);

  return (
    <>
      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <HouseContext.Provider value={{ containedHouses, setContainedHouses }}>
          <SelectionContext.Provider value={{ selection, setSelection }}>
            <ProfileContext.Provider value={{ mode, setMode }}>
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/"
                    element={
                      loggedUser?.email != null ? (
                        <Navigate to="/homes" />
                      ) : (
                        <Home />
                      )
                    }
                  ></Route>
                  <Route path="/homes" element={<Homes />}></Route>
                  <Route
                    path="/profile"
                    element={
                      loggedUser?.email != null ? (
                        <Profile />
                      ) : (
                        <Navigate to="/" />
                      )
                    }
                  ></Route>
                  <Route
                    path="/homeSingle/:houseName"
                    element={
                      loggedUser?.email != null ? (
                        <HomeSingleInfo houses={containedHouses} />
                      ) : (
                        <Navigate to="/homes" />
                      )
                    }
                  ></Route>
                  <Route path="*" element={<Notfound />}></Route>
                </Routes>
              </BrowserRouter>
            </ProfileContext.Provider>
          </SelectionContext.Provider>
        </HouseContext.Provider>
      </UserContext.Provider>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
