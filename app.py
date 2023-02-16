from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import string

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={r"*": {"origins": "*"}})


directory=["models/LR.pkl","models/PAC.pkl","models/KNN.pkl","models/NBC.pkl","models/DTC.pkl","models/RFC.pkl","models/GBC.pkl","models/XGB.pkl","models/LGB.pkl","models/SVM.pkl","models/MLP.pkl"]
models=[]
result = {}
vectorizer=""
for i in range(len(directory)+1):
    try:
        if i==len(directory):
            vectorizer = joblib.load("models/vectorizer.pkl")
        else:
            x=directory[i]
            models.append(joblib.load(x))
            modelName=x[x.index('/')+1:x.index('.pkl')]
            result[modelName]="-1"
    except FileNotFoundError as e:
        print (">"+str(e.filename)+" Not loaded because "+str(e.strerror))
        pass


def wordopt(text):
    text = text.lower()
    text = re.sub('\[.*?\]', '', text)
    text = re.sub("\\W"," ",text) 
    text = re.sub('https?://\S+|www\.\S+', '', text)
    text = re.sub('<.*?>+', '', text)
    text = re.sub('[%s]' % re.escape(string.punctuation), '', text)
    text = re.sub('\n', '', text)
    text = re.sub('\w*\d\w*', '', text)    
    return text

def predict(text):
    for i in range (len(models)):
        key =list(result.keys())[i]
        try:
            result[key]= str(models[i].predict(text)[0])
        except:
            print("Failed to predict with model"+models[i])
    return result

@app.route('/', methods=['GET'])
def home():
    return "Backend Running....."

@app.route('/predict', methods=['POST'])
def index():
    # article_text = request.get_json()
    article_text = request.json.get('text')
    if(len(models) and vectorizer):
        article_text = wordopt(article_text)
        # Convert the article text into numerical features
        article_feature = vectorizer.transform([article_text])
        # Make a prediction on the article
        prediction = predict(article_feature)
        # Return the prediction result as a JSON response
        return {"status":"success","result":prediction}
    else:
        return {"status":"fail"}



if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
