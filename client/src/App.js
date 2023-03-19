import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Homepage from "./components/Homepage";
import LatestNews from "./components/LatestNews";
import DatasetNews from "./components/DatasetNews";
import NewsDetection from "./components/NewsDetection";
import { MethodState } from "./context/MethodState";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (msg,text,label,time=2000) => {
    setAlert({ msg:msg,text:text,label:label});
    setTimeout(() => {
      setAlert(null);
    }, time);
  };
  const api = process.env.REACT_APP_API || "http://localhost:5000/";
  return (
    <>
      <MethodState api={api}>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container my-5 py-3">
            <Routes className>
              <Route exact path="/" element={<Homepage />}></Route>
              <Route
                exact
                path="/detectNews"
                element={<NewsDetection showAlert={showAlert} api={api}></NewsDetection>}
              ></Route>
              <Route exact path="/latestNews" element={<LatestNews showAlert={showAlert} api={api}></LatestNews>}></Route>
              <Route exact path="/datasetNews" element={<DatasetNews showAlert={showAlert} api={api}></DatasetNews>}></Route>
            </Routes>
          </div>
        </Router>
      </MethodState>
    </>
  );
}

export default App;
