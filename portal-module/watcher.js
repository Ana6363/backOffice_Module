const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

// Absolute paths for communication
const planningModulePath = path.join(__dirname, '../../planningModule'); // Adjust the relative path
const inputFilePath = path.join(planningModulePath, 'input.txt');
const outputFilePath = path.join(planningModulePath, 'output.txt');
const prologExecutable = path.join(planningModulePath, 'genetic.exe'); // Update the executable name

// Watch for changes to input.txt
fs.watchFile(inputFilePath, (curr, prev) => {
    console.log(`${inputFilePath} changed.`);

    // Execute the Prolog program
    exec(prologExecutable, { cwd: planningModulePath, maxBuffer: 10024 * 10024 }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Prolog: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Prolog Error: ${stderr}`);
            return;
        }
        console.log(`Prolog Output: ${stdout}`);
    
        // Read the result from output.txt
        try {
            const result = fs.readFileSync(outputFilePath, 'utf8');
            console.log('Result from Prolog:', result);
        } catch (err) {
            console.error('Error reading result:', err.message);
        }
    });
    
});

// Write the date to input.txt
const writeDateToInput = (date) => {
    try {
        fs.writeFileSync(inputFilePath, date, 'utf8');
        console.log(`Date written to ${inputFilePath}: ${date}`);
    } catch (err) {
        console.error('Error writing date:', err.message);
    }
};


