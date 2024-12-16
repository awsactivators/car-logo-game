import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folder containing car logos
const folderPath = path.join(__dirname, "logos/optimized");

// Fisher-Yates Shuffle Function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Generate JSON for car logos
const generateCarData = () => {
  const files = fs.readdirSync(folderPath); // Get all files in the directory

  // Filter only .png or valid image files
  const imageFiles = files.filter((file) => file.endsWith(".png"));

  // Shuffle the file list
  shuffleArray(imageFiles);

  const carData = {};

  // Assign shuffled files to levels
  imageFiles.forEach((file, index) => {
    const fileName = path.parse(file).name; // Extract car name from file
    carData[index + 1] = {
      name: fileName, // Car name
      image: `./logos/optimized/${file}`, // Image path
    };
  });

  return carData;
};

// Write JSON to a file
const outputFilePath = path.join(__dirname, "carData.json");
fs.writeFileSync(outputFilePath, JSON.stringify(generateCarData(), null, 2));
console.log(`Car data generated successfully: ${outputFilePath}`);
