import React, { useContext } from "react";
import Home from "../PAGES/home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../PAGES/Login/Login";
import List from "../PAGES/list/List";
import Single from "../PAGES/Single/Single";
import NEW from "../PAGES/NEW/NEW";
import { productInputs, userInputs } from "../formSource";
import "../Style/darkMode.scss";
import { DarkModeContext } from "../Context/contextDarkMode";
import { AuthContext } from "../Context/AuthContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext)


  const RequiredAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };


  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />

            <Route
              index
              element={
                <RequiredAuth>
                  <Home />
                </RequiredAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequiredAuth>
                    <List />
                  </RequiredAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequiredAuth>
                    <Single />
                  </RequiredAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequiredAuth>
                    <NEW inputs={userInputs} title="Add New User" />
                  </RequiredAuth>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <RequiredAuth>
                    <List />
                  </RequiredAuth>
                }
              />
              <Route
                path=":productId"
                element={
                  <RequiredAuth>
                    <Single />
                  </RequiredAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequiredAuth>
                    <NEW inputs={productInputs} title="Add New Product" />
                  </RequiredAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
