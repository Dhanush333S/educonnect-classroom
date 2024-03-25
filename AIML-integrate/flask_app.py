from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

model_filename = "Model/logistic_regression_model.joblib"
loaded_model = joblib.load(model_filename)
tf_vec_filename = "Model/tfidf_vectorizer.joblib"
tf_vec = joblib.load(tf_vec_filename)
modified_train = pd.read_csv('Dataset/modified_train.csv')

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        comment = request.form.get('comment', '')
        print(comment)
        input_features = tf_vec.transform([comment])
        prediction = loaded_model.predict(input_features)
        result = "Offensive" if prediction[0] == 1 else "Not Offensive"
        return jsonify({'result': result, 'comment': comment})
    else:
        return render_template('index_sma.html')

@app.route('/homepage')
def homepage():
    return "HelloWorld"

if __name__ == '__main__':
    app.run(debug=True,port=8000)
