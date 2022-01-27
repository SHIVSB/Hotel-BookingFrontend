import React, { Suspense } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import "./App.css";
import Bookingscreen from "./screens/Bookingscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/home"
            element={
              <Suspense fallback={<div className="loader"></div>}>
                <Homescreen />
              </Suspense>
            }
          />

          <Route
            path="/book/:roomid/:fromdate/:todate"
            exact
            element={
              <Suspense fallback={<div className="loader"></div>}>
                <Bookingscreen />
              </Suspense>
            }
            // element = {<Bookingscreen />}
          />

          <Route
            exact
            path="/register"
            element={
              <Suspense fallback={<div className="loader"></div>}>
                <Registerscreen />
              </Suspense>
            }
          />

          <Route
            exact
            path="/login"
            element={
              <Suspense fallback={<div className="loader"></div>}>
                <Loginscreen />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
