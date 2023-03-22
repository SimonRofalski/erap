/**
 * IMPORTS
 */
const fs = require("fs");
const path = require("path");
/**
 * CONFIG VARIABLES
 */
const dirname = "simple-directory";
const endings = ["list", "txt", "md", "md", "log", "pdf", "docx"];
const numberOfFiles = 250;
const size = { min: 10 * 10, max: 10 * 10 * 10 * 10 * 10 };
const content = ["A", "B", " "];
/**
 * SKRIPT
 */
// Remove old directory and create new directory
if (fs.existsSync(dirname)) {
  fs.rmSync(dirname, { recursive: true, force: true });
}
fs.mkdirSync(dirname);

// Add Files to new directory
for (let i = 0; i < numberOfFiles; i++) {
  createNewFile();
}
function createNewFile() {
  const fileSize = Math.floor(Math.random() * (size.max - size.min) + size.min);
  // Create file content
  let fileInput = "";
  for (let i = 0; i < fileSize; i++) {
    fileInput += pickRandomElement(content);
  }
  // Create a filename with a picked file ending
  const filename = `${fileSize}.${pickRandomElement(endings)}`;
  const filePath = path.join(dirname, filename);
  // Write File
  fs.writeFileSync(filePath, fileInput, { encoding: "utf8" });
}

/**
 * Returns a random from the array
 * @param {Array} array
 */
function pickRandomElement(array) {
  // get a random index by generating a number between 0 and 1 und
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
