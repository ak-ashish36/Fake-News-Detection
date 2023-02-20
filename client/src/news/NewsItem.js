import React, { useState } from "react";
import Spinner from "../components/Spinner";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  const [nloading, setnLoading] = useState(0);
  const prediction = (text) => {
    setnLoading(1);
  };
  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger"> {source} </span>
        </div>
        <img
          src={
            !imageUrl
              ? "https://dd7tel2830j4w.cloudfront.net/f1550965374835x373311315531899650/newsapi.svg"
              : imageUrl
          }
          style={{ height: "20em" }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title} </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
          <div
            style={{ display: "inline", position: "relative", right: "-9rem" }}
            className="card-text container"
          >
            {!nloading?<button
              className="btn btn-sm btn-primary"
              onClick={prediction}
            >
              Predict
            </button>:<span style={{position: "absolute" }}><Spinner/></span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
