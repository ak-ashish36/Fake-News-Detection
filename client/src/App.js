import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Homepage from "./components/Homepage";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message) => {
    setAlert({msg:message})
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  let api = "http://localhost:5000/predict";
  return (
    <>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container my-5 py-3">
          <Routes className>
            <Route
              exact
              path="/"
              element={<Homepage showAlert={showAlert} url={api} />}
            ></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
