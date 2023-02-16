import React from 'react'
import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">FAKE NEWS PREDICTION</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="nav navbar-nav navbar-right" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link"
                                to="#">API</Link>
                            <Link className="nav-link" target="_blank"
                                to="https://newsapi-ak.netlify.app/">LatestNews</Link>
                            <Link className="nav-link" target="_blank"
                                to="https://github.com/ak-ashish36/Fake-News-Detection/blob/main/modelTraining.ipynb">NoteBook</Link>
                            <Link className="nav-link" target="_blank"
                                to="https://github.com/ak-ashish36/Fake-News-Detection">Code Source</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
