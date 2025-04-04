# Disease Prediction System

A machine learning-based system that predicts diseases based on symptoms, using multiple classification models with different training configurations.

## Features

- Predicts 41 different diseases
- Supports 8 different machine learning models
- Allows selection of training percentage (50%, 60%, 70%, 80%, 90%)
- Provides accuracy metrics for each configuration
- Visualizes confusion matrices and feature importance

## Supported Diseases

The system can predict the following diseases:

- Migraine
- Alcoholic hepatitis
- Hypertension 
- Heart attack
- Dengue
- Arthritis
- Hepatitis E
- Psoriasis
- Acne
- Chronic cholestasis
- Fungal infection
- Jaundice
- Chicken pox
- GERD
- Typhoid
- Hepatitis C
- Common Cold
- Tuberculosis
- Dimorphic hemmorhoids(piles)
- Hypoglycemia
- Osteoarthristis
- Diabetes 
- Pneumonia
- Hepatitis B
- Peptic ulcer disease
- Hepatitis D
- Bronchial Asthma
- Paralysis (brain hemorrhage)
- Gastroenteritis
- Impetigo
- Cervical spondylosis
- Drug Reaction
- Hypothyroidism
- Malaria
- Urinary tract infection
- Varicose veins
- Allergy
- (vertigo) Paroymsal Positional Vertigo
- Hepatitis A
- Hyperthyroidism
- AIDS

## Supported Models

1. Random Forest
2. Decision Tree
3. Logistic Regression
4. KNN (K-Nearest Neighbors)
5. SVM (Support Vector Machine)
6. AdaBoost
7. Gradient Boosting
8. Naive Bayes

## Symptoms

The system considers 31 symptoms including:

- Abdominal pain
- Blurred and distorted vision
- Breathlessness
- Chest pain
- Chills
- Cough
- Dark urine
- Diarrhoea
- Dizziness
- Excessive hunger
- Fatigue
- Headache
- High fever
- Irritability
- Joint pain
- Lethargy
- Loss of appetite
- Loss of balance
- Malaise
- Mild fever
- Muscle pain
- Nausea
- Phlegm
- Skin rash
- Sweating
- Swelled lymph nodes
- Vomiting
- Weight loss
- Yellowing of eyes
- Yellowish skin
- Itching

## Workflow

### 1. Data Preprocessing

```python
def preprocess(data, min_occurrence_percentage=5):
    # Convert symptoms to binary features
    # Filter rare symptoms
    # Return processed DataFrame
```

### 2. Model Training

```python
def evaluate_all_models():
    # Trains models with different training percentages
    # Saves models as .pkl files in public/models/
    # Generates evaluation metrics and visualizations
```

### 3. Prediction API

```python
@app.post('/api/predict')
def predict():
    # Loads selected model
    # Processes input symptoms
    # Returns predicted disease
```

### 4. Frontend Interface

- Model selection dropdown
- Training percentage selection
- Symptom checklist
- Prediction results display

## File Structure

```
public/
├── models/
│   ├── Random_Forest/
│   │   ├── Random_Forest_model_50.0.pkl
│   │   ├── Random_Forest_confusion_matrix_50.png
│   │   └── ...
│   ├── Decision_Tree/
│   │   └── ...
│   └── ...
├── model_evaluation_results.csv
src/
├── components/
│   └── PredictionForm.jsx
├── App.jsx
├── main.jsx
└── styles.css
server.js
predict.py
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   pip install -r requirements.txt
   ```
3. Place your dataset as `dataset.csv` in the root directory
4. Run the preprocessing and model training:
   ```bash
   python Disease_Prediction.ipynb
   ```
5. Start the backend server:
   ```bash
   node server.js
   ```
6. Start the frontend:
   ```bash
   npm run dev
   ```

## Usage

1. Select a machine learning model
2. Choose a training percentage
3. Check the symptoms present
4. Click "Predict Disease"
5. View the predicted disease

## Evaluation Metrics

The system tracks and compares:
- Accuracy
- Precision
- Recall
- F1 Score

For each model and training percentage combination.