const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { PythonShell } = require("python-shell");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGODB_CONNECTION);

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
    const { symptoms } = req.body;
    
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
      pythonPath: '/usr/bin/python3', // Change to your Python path
      scriptPath: '../ml_models',
      args: [JSON.stringify(input)]
    };

    PythonShell.run('predict.py', options, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Prediction failed" });
      }
      const prediction = results[0];
      
      new Prediction({ symptoms, predictedDisease: prediction }).save();
      
      res.json({ disease: prediction });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));