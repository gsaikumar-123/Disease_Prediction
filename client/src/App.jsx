import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const SYMPTOMS = [
    'abdominal_pain', 'blurred_and_distorted_vision', 'breathlessness', 'chest_pain', 'chills', 'cough', 'dark_urine',
    'diarrhoea', 'dizziness', 'excessive_hunger', 'fatigue', 'headache', 'high_fever', 'irritability', 'joint_pain', 'lethargy',
    'loss_of_appetite', 'loss_of_balance', 'malaise', 'mild_fever', 'muscle_pain', 'nausea', 'phlegm', 'skin_rash', 'sweating',
    'swelled_lymph_nodes', 'vomiting', 'weight_loss', 'yellowing_of_eyes', 'yellowish_skin', 'itching'
  ];

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        symptoms: selectedSymptoms
      });
      setPrediction(response.data.disease);
    } catch (error) {
      console.error(error);
      alert("Prediction failed!");
    } finally {
      setLoading(false);
    }
  };

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <div className="app">
      <h1>Disease Predictor</h1>
      
      <div className="symptoms">
        <h2>Select Symptoms</h2>
        {SYMPTOMS.map(symptom => (
          <div key={symptom} className="symptom">
            <input
              type="checkbox"
              id={symptom}
              checked={selectedSymptoms.includes(symptom)}
              onChange={() => toggleSymptom(symptom)}
            />
            <label htmlFor={symptom}>
              {symptom.replace(/_/g, " ")}
            </label>
          </div>
        ))}
      </div>

      <button onClick={handlePredict} disabled={loading}>
        {loading ? "Predicting..." : "Predict Disease"}
      </button>

      {prediction && (
        <div className="result">
          <h3>Predicted Disease:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default App;