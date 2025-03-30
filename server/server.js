const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { PythonShell } = require("python-shell");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGODB_CONNECTION);

const MODEL_PATHS = {
    'randomForest_50': '../ml_models/Random_Forest_model_50.0.pkl',
    'randomForest_60': '../ml_models/Random_Forest_model_60.0.pkl',
    'randomForest_70': '../ml_models/Random_Forest_model_70.0.pkl',
    'randomForest_80': '../ml_models/Random_Forest_model_80.0.pkl',
    'randomForest_90': '../ml_models/Random_Forest_model_90.0.pkl',
    'svm_50': '../ml_models/SVM_model_50.0.pkl',
    'svm_60': '../ml_models/SVM_model_60.0.pkl',
    'svm_70': '../ml_models/SVM_model_70.0.pkl',
    'svm_80': '../ml_models/SVM_model_80.0.pkl',
    'svm_90': '../ml_models/SVM_model_90.0.pkl',
    'knn_50': '../ml_models/KNN_model_50.0.pkl',
    'knn_60': '../ml_models/KNN_model_60.0.pkl',
    'knn_70': '../ml_models/KNN_model_70.0.pkl',
    'knn_80': '../ml_models/KNN_model_80.0.pkl',
    'knn_90': '../ml_models/KNN_model_90.0.pkl',
    'adaBoost_50': '../ml_models/AdaBoost_model_50.0.pkl',
    'adaBoost_60': '../ml_models/AdaBoost_model_60.0.pkl',
    'adaBoost_70': '../ml_models/AdaBoost_model_70.0.pkl',
    'adaBoost_80': '../ml_models/AdaBoost_model_80.0.pkl',
    'adaBoost_90': '../ml_models/AdaBoost_model_90.0.pkl',
    'decisionTree_50': '../ml_models/Decision_Tree_model_50.0.pkl',
    'decisionTree_60': '../ml_models/Decision_Tree_model_60.0.pkl',
    'decisionTree_70': '../ml_models/Decision_Tree_model_70.0.pkl',
    'decisionTree_80': '../ml_models/Decision_Tree_model_80.0.pkl',
    'decisionTree_90': '../ml_models/Decision_Tree_model_90.0.pkl',
    'logisticRegression_50': '../ml_models/Logistic_Regression_model_50.0.pkl',
    'logisticRegression_60': '../ml_models/Logistic_Regression_model_60.0.pkl',
    'logisticRegression_70': '../ml_models/Logistic_Regression_model_70.0.pkl',
    'logisticRegression_80': '../ml_models/Logistic_Regression_model_80.0.pkl',
    'logisticRegression_90': '../ml_models/Logistic_Regression_model_90.0.pkl',
    'naiveBayes_50': '../ml_models/Naive_Bayes_model_50.0.pkl',
    'naiveBayes_60': '../ml_models/Naive_Bayes_model_60.0.pkl',
    'naiveBayes_70': '../ml_models/Naive_Bayes_model_70.0.pkl',
    'naiveBayes_80': '../ml_models/Naive_Bayes_model_80.0.pkl',
    'naiveBayes_90': '../ml_models/Naive_Bayes_model_90.0.pkl',
    'gradientBoosting_50': '../ml_models/Gradient_Boosting_model_50.0.pkl',
    'gradientBoosting_60': '../ml_models/Gradient_Boosting_model_60.0.pkl',
    'gradientBoosting_70': '../ml_models/Gradient_Boosting_model_70.0.pkl',
    'gradientBoosting_80': '../ml_models/Gradient_Boosting_model_80.0.pkl',
    'gradientBoosting_90': '../ml_models/Gradient_Boosting_model_90.0.pkl',
  };

const Prediction = mongoose.model("Prediction", {
  symptoms: [String],
  predictedDisease: String,
  timestamp: { type: Date, default: Date.now }
});

const SYMPTOMS = [
  'abdominal_pain', 'blurred_and_distorted_vision', 'breathlessness', 'chest_pain', 'chills', 'cough', 'dark_urine',
    'diarrhoea', 'dizziness', 'excessive_hunger', 'fatigue', 'headache', 'high_fever', 'irritability', 'joint_pain', 'lethargy',
    'loss_of_appetite', 'loss_of_balance', 'malaise', 'mild_fever', 'muscle_pain', 'nausea', 'phlegm', 'skin_rash', 'sweating',
    'swelled_lymph_nodes', 'vomiting', 'weight_loss', 'yellowing_of_eyes', 'yellowish_skin', 'itching'
  
];

app.post("/predict", async (req, res) => {
    try {
      const { symptoms, modelKey } = req.body; // Now expects modelKey
      
      if (!symptoms || symptoms.length === 0) {
        return res.status(400).json({ error: "Please select symptoms." });
      }
  
      const input = Array(SYMPTOMS.length).fill(0);
      symptoms.forEach(symptom => {
        const index = SYMPTOMS.indexOf(symptom);
        if (index !== -1) input[index] = 1;
      });
  
      const options = {
        mode: 'text',
        pythonPath: '/usr/bin/python3',
        scriptPath: '../ml-models',
        args: [JSON.stringify(input), modelKey]
      };
  
      PythonShell.run('predict.py', options, (err, results) => {
        if (err) return res.status(500).json({ error: "Prediction failed" });
        res.json({ disease: results[0] });
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });