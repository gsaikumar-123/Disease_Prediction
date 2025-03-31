import sys
import joblib
import numpy as np
import os

def main():
    try:
        # Get arguments
        symptoms = list(map(int, sys.argv[1].split()))
        model_path = sys.argv[2]
        
        # Fix path separators for Windows
        model_path = model_path.replace('/', '\\')
        
        # Verify model file exists
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at: {model_path}")
        
        # Load model
        model = joblib.load(model_path)
        
        # Convert input to numpy array and reshape
        input_data = np.array(symptoms).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(input_data)[0]
        
        # Return ONLY the prediction
        print(prediction)
        
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()