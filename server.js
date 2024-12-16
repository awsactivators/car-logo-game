import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Endpoint to serve car data
app.get("/carData", (req, res) => {
  const carDataPath = path.join(__dirname, "carData.json");
  
  if (fs.existsSync(carDataPath)) {
    const carData = JSON.parse(fs.readFileSync(carDataPath, "utf-8"));
    res.json(carData);
  } else {
    res.status(404).json({ error: "Car data file not found" });
  }
});

// Serve static files (logos/images)
app.use("/logos", express.static(path.join(__dirname, "logos")));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
