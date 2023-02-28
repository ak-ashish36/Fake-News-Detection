import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Homepage from "./components/Homepage";
import LatestNews from "./components/LatestNews";
import NewsDetection from "./components/NewsDetection";
import { MethodState } from "./context/MethodState";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message) => {
    setAlert({ msg: message });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <MethodState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container my-5 py-3">
            <Routes className>
              <Route exact path="/" element={<Homepage />}></Route>
              <Route
                exact
                path="/detectNews"
                element={<NewsDetection showAlert={showAlert}></NewsDetection>}
              ></Route>
              <Route exact path="/news" element={<LatestNews></LatestNews>}></Route>
            </Routes>
          </div>
        </Router>
      </MethodState>
    </>
  );
}

export default App;
