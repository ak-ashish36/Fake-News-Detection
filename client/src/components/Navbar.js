import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav
        style={{ backgroundColor: "rgb(205 216 218)" }}
        className="navbar fixed-top navbar-expand-lg navbar-light"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Fake-News-Detection
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/latestNews">
                  LatestNews<span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/datasetNews">
                  DatasetNews<span className="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav navbar-nav navbar-right" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" target="_blank" to="/detectNews">
                Detect
              </Link>
              <Link
                className="nav-link"
                target="_blank"
                to="https://github.com/ak-ashish36/Fake-News-Detection/blob/main/modelTraining.ipynb"
              >
                NoteBook
              </Link>
              <Link
                className="nav-link"
                target="_blank"
                to="https://github.com/ak-ashish36/Fake-News-Detection"
              >
                Source Code
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
