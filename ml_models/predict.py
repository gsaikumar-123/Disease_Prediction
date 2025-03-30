import sys
import json
import joblib
import numpy as np


MODELS = ['SVM', 'Naive_Bayes', 'Logistic_Regression', 'Random_Forest', 'Gradient_Boosting', 'AdaBoost', 'Decision_Tree', 'KNN']
TRAINING_PERCENTAGES = [50, 60, 70, 80, 90]
MODEL_PATH_TEMPLATE = r'pickle_files\{model}\{model}_model_{percent}.0.pkl'


if __name__ == '__main__':
    # Get input from Node.js
    input_data = json.loads(sys.argv[1])
    
    # Convert to numpy array
    input_array = np.array(input_data).reshape(1, -1)
    
    # Predict
    prediction = model.predict(input_array)[0]
    print(prediction)