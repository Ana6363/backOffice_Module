const express = require("express");
const { spawn } = require("child_process");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/open-terminal", (req, res) => {
    const { path: dirPath, file } = req.body;

    if (!dirPath || !file) {
        return res.status(400).json({ error: "Path and file are required" });
    }

    try {
        const batchFilePath = path.join(dirPath, "execute_swipl.bat");
        const batchCommands = `
        @echo off
        cd /d "${dirPath}"
        swipl -s "${file}"
        `;

        fs.writeFileSync(batchFilePath, batchCommands, "utf8");

        spawn("cmd.exe", ["/c", "start", "cmd.exe", "/k", batchFilePath], {
            shell: true,
        });

        res.json({
            success: true,
            message: `Terminal opened with ${file} executed.`,
        });

        setTimeout(() => {
            try {
                fs.unlinkSync(batchFilePath);
                console.log("Temporary batch file deleted.");
            } catch (err) {
                console.error("Error deleting batch file:", err);
            }
        }, 10000);
    } catch (error) {
        console.error("Error opening terminal:", error);
        res.status(500).json({ error: "Failed to open terminal." });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
