const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

// Convert fs.readFile into Promise version
const readFileAsync = promisify(fs.readFile);

// Function to convert an image file to base64
async function imageToBase64(filePath) {
    try {
        const imageBuffer = await readFileAsync(filePath);
        const base64Data = imageBuffer.toString("base64");
        return base64Data;
    } catch (error) {
        throw error;
    }
}

// Directory containing the image files
const imageDirectory = "D:\\final-pbl\\tesst\\images\\";

// Output file for base64 data
const outputFile = "D:\\final-pbl\\public\\base64_images1.txt";

// Function to write data to the output file
function writeToOutputFile(data) {
    fs.appendFileSync(outputFile, data);
}

// Read each image file, convert to base64, and write to the output file
fs.readdir(imageDirectory, async (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const imagePath = path.join(imageDirectory, files[i]);
        const base64Data = await imageToBase64(imagePath);

        // Write to the output file
        writeToOutputFile(`${i + 1}\n${base64Data}\n\n`);
    }

    console.log("Base64 data has been written to the output file.");
});
