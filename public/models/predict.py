import sys
import joblib
import numpy as np
import os

def main():
    try:
        symptoms = list(map(int, sys.argv[1].split()))
        model_path = sys.argv[2]
        
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at: {model_path}")

        model = joblib.load(model_path)
        input_data = np.array(symptoms).reshape(1, -1)
        prediction = model.predict(input_data)[0]
        
        print(prediction)
        
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()