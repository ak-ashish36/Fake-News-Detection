import React, { useState, useContext, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Spinner from "./Spinner";
import { MethodContext } from "../context/MethodState";

function NewsDetection(props) {
  const context = useContext(MethodContext);
  const { predict, results, calculatePercentage } = context;
  const [newsText, setnewsText] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [loading, setLoading] = useState(0);
  const [status, setStatus] = useState(1);

  const handleOnChange = (event) => {
    setnewsText(event.target.value);
  };

  function renameModel(old) {
    if (old === "LR") return "Logistic Regression";
    else if (old === "PAC") return "Passive Aggressive Classifier";
    else if (old === "KNN") return "k-Nearest Neighbors";
    else if (old === "NBC") return "Naive Bayes Classifier";
    else if (old === "DTC") return "Decision Tree Classifier";
    else if (old === "RFC") return "Random Forest Classifier";
    else if (old === "GBC") return "Gradient Boosting Classifier";
    else if (old === "XGB") return "XGBoost";
    else if (old === "LGB") return "LightGBM";
    else if (old === "SVM") return "Support Vector Machine";
    else if (old === "MLP") return "Multilayer Perceptron";
    return old;
  }
  function countWords(text) {
    return text.split(/\s+/).filter((element) => {
      return element.length !== 0;
    }).length;
  }
  const handleUpClick = async (e) => {
    e.preventDefault();
    setStatus(1);
    if (countWords(newsText) < 10) {
      props.showAlert(countWords(newsText));
      return;
    }
    setLoading(1);
    let url = props.api+"/detect"
    let res = await predict(url,newsText);
    if (res.status === "success") {
      setPercentage(await calculatePercentage(res.result));
    } else {
      setStatus(0);
    }
    setLoading(0);
  };
  useEffect(() => {}, [results, percentage]);
  return (
    <div>
      <p style={{ textAlign: "center" }}>
        A fake news detection web application using Machine Learning algorithms,
        developed using Python and React.js.
      </p>
      <p style={{ textAlign: "center" }}>Enter your text to try it.</p>
      <br />
      <div className="container">
        <form>
          <div className="col-three-forth text-center col-md-offset-2">
            <div className="form-group">
              <textarea
                className="form-control jTextarea mt-3"
                id="Textarea'"
                rows="5"
                name="text"
                placeholder="Write your text here..."
                value={newsText}
                onChange={handleOnChange}
                required
              ></textarea>
              <br />
              <button
                className="btn btn-primary btn-outline btn-md"
                type="submit"
                onClick={handleUpClick}
                name="predict"
              >
                Predict
              </button>
            </div>
          </div>
        </form>
      </div>
      <br />
      {loading ? <Spinner /> : <></>}
      {status ? (
        <div style={{ textAlign: "center" }}>
          <strong>
            Prediction
            <ProgressBar
              bgColor="#0d6efd"
              height="60px"
              completed={percentage}
              customLabel={percentage + "% True"}
            />
            <h5>{percentage}%</h5>
          </strong>
          {percentage!==null ? (
            <>
              <span className="placeholder col-6">
                The prediction percentage is based on Results of all the models
              </span>
              <br />
              <br />
              <div className="collapseWindow ">
                <p>
                  <button
                    className="btn btn-primary"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Click to View Results Individually
                  </button>
                </p>
                <div className="collapse" id="collapseExample">
                  <ul style={{ textAlign: "initial" }} className="list-group">
                    {Object.keys(results)
                      .sort()
                      .map((model, key) => (
                        <li className="list-group-item" key={key}>
                          {renameModel(model)}&emsp;:&emsp;
                          <div
                            className={
                              results[model] === "1"
                                ? "btn btn-success btn-sm"
                                : "btn btn-danger btn-sm"
                            }
                          >
                            {results[model] === "1" ? "Real" : "Fake"}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="text-danger placeholder d-flex justify-content-center">
          !!!Failed to Predict, Seems issue from server side
        </div>
      )}
    </div>
  );
}

export default NewsDetection;
