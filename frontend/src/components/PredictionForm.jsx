import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';

const SYMPTOMS = [
    'abdominal_pain', 'blurred_and_distorted_vision', 'breathlessness', 'chest_pain', 
    'chills', 'cough', 'dark_urine', 'diarrhoea', 'dizziness', 'excessive_hunger', 
    'fatigue', 'headache', 'high_fever', 'irritability', 'joint_pain', 'lethargy',
    'loss_of_appetite', 'loss_of_balance', 'malaise', 'mild_fever', 'muscle_pain', 
    'nausea', 'phlegm', 'skin_rash', 'sweating', 'swelled_lymph_nodes', 'vomiting', 
    'weight_loss', 'yellowing_of_eyes', 'yellowish_skin', 'itching'
];

const TRAINING_PERCENTAGES = [50, 60, 70, 80, 90];
const MODELS = [
    'Random_Forest', 'Decision_Tree', 'Logistic_Regression', 'KNN', 
    'SVM', 'AdaBoost', 'Gradient_Boosting', 'Naive_Bayes'
];

const PredictionForm = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [trainingPercentage, setTrainingPercentage] = useState(50);
    const [selectedModel, setSelectedModel] = useState('Random_Forest');
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSymptomChange = (symptom) => {
        if (selectedSymptoms.includes(symptom)) {
            setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
        } else {
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (selectedSymptoms.length === 0) {
            setError('Please select at least one symptom');
            return;
        }
    
        setLoading(true);
        setError(null);
        
        try {
            const inputData = SYMPTOMS.map(symptom => 
                selectedSymptoms.includes(symptom) ? 1 : 0
            );
    
            const response = await axios.post('http://localhost:5000/api/predict', {
                model: selectedModel.replace(' ', '_'),
                training_percentage: trainingPercentage,
                symptoms: inputData
            });
    
            setPrediction(response.data.prediction);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to make prediction');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="prediction-form p-4 border rounded">
            <h2 className="mb-4">Disease Predictor</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                    <Form.Label>Select Model:</Form.Label>
                    <Form.Select 
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                    >
                        {MODELS.map(model => (
                            <option key={model} value={model}>
                                {model.replace('_', ' ')}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Training Percentage:</Form.Label>
                    <div className="d-flex gap-3">
                        {TRAINING_PERCENTAGES.map(percent => (
                            <Form.Check
                                key={percent}
                                type="radio"
                                id={`percent-${percent}`}
                                label={`${percent}%`}
                                checked={trainingPercentage === percent}
                                onChange={() => setTrainingPercentage(percent)}
                            />
                        ))}
                    </div>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Select Symptoms:</Form.Label>
                    <Row>
                        {SYMPTOMS.map(symptom => (
                            <Col key={symptom} xs={6} md={4} lg={3}>
                                <Form.Check 
                                    type="checkbox"
                                    id={symptom}
                                    label={symptom.replace(/_/g, ' ')}
                                    checked={selectedSymptoms.includes(symptom)}
                                    onChange={() => handleSymptomChange(symptom)}
                                />
                            </Col>
                        ))}
                    </Row>
                </Form.Group>

                <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                    className="w-100"
                >
                    {loading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Predicting...
                        </>
                    ) : 'Predict Disease'}
                </Button>
            </Form>

            {prediction && (
                <div className="prediction-result mt-4 p-3 bg-light rounded">
                    <h3>Predicted Disease:</h3>
                    <p className="display-6">{prediction}</p>
                </div>
            )}
        </div>
    );
};

export default PredictionForm;