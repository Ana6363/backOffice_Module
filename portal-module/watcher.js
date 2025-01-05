const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3001; // Backend server port

// Enable CORS for all origins (you can restrict this to specific origins if needed)
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Absolute paths for communication
const planningModulePath = path.join(__dirname, '../../planningModule');
const inputFilePath = path.join(planningModulePath, 'input.txt');
const outputFilePath = path.join(planningModulePath, 'output.txt');
const prologExecutable = path.join(planningModulePath, 'genetic.exe');

// API Endpoint to process the date
app.post('/process-date', (req, res) => {
    const { date } = req.body;
    if (!date) {
        return res.status(400).json({ error: 'Date is required' });
    }

    // Write the date to input.txt
    try {
        fs.writeFileSync(inputFilePath, date, 'utf8');
        console.log(`Date written to ${inputFilePath}: ${date}`);
    } catch (err) {
        console.error('Error writing date:', err.message);
        return res.status(500).json({ error: 'Failed to write date to input file' });
    }

    // Execute the Prolog program
    exec(prologExecutable, { cwd: planningModulePath, maxBuffer: 10024 * 10024 }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Prolog: ${error.message}`);
            return res.status(500).json({ error: 'Failed to execute Prolog program' });
        }
        if (stderr) {
            console.error(`Prolog Error: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }
        console.log(`Prolog Output: ${stdout}`);

        // Read the result from output.txt
        try {
            const result = fs.readFileSync(outputFilePath, 'utf8');
            console.log('Result from Prolog:', result);
            res.json({ result });
        } catch (err) {
            console.error('Error reading result:', err.message);
            res.status(500).json({ error: 'Failed to read result from output file' });
        }
    });
});

// Start the backend server
app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
