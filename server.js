const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/predict', async (req, res) => {
    try {
        const { model, training_percentage, symptoms } = req.body;
        const symptomsString = symptoms.join(' ');
        const modelPath = path.join(
            __dirname,
            'public',
            'models',
            model.replace(/ /g, '_'),
            `${model.replace(/ /g, '_')}_model_${training_percentage}.0.pkl`
        ).replace(/\\/g, '\\\\');

        if (!fs.existsSync(modelPath)) {
            return res.status(400).json({
                success: false,
                message: 'Model not found',
                path: modelPath
            });
        }

        const pythonProcess = spawn('python', [
            path.join(__dirname, 'public', 'models', 'predict.py'),
            symptomsString,
            modelPath
        ]);

        let result = '';
        let error = '';

        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).json({ 
                    success: false,
                    message: 'Prediction failed',
                    error: error.trim()
                });
            }
            
            res.json({ 
                success: true,
                prediction: result.trim()
            });
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Server error',
            error: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});