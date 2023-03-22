/**
 * IMPORTS
 */
const fs = require("fs");
const path = require("path");
/**
 * CONFIGS
 */
const ignoreFolders = [".git", "node_modules"];
const directory = "simple-directory";
const outFile = "results.json";

// Declare data-list
const files = [];

// Run Function
readDir(directory);
const result = files.map((file) => ({
  path: file.path,
  fileName: file.path.split("/").at(-1),
  extension: file.path.split(".").at(-1),
  size: file.stats,
}));
fs.writeFileSync(outFile, JSON.stringify(result), { encoding: "utf8" });

// Run recursive function in directory
/**
 *
 * @param {string} directoryPath
 */
function readDir(directoryPath) {
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
  for (const entry of entries) {
    if (ignoreFolders.includes(entry.name)) continue;
    if (entry.isDirectory()) {
      readDir(path.join(directoryPath, entry.name));
    } else {
      const filePath = path.join(directoryPath, entry.name);
      files.push({
        path: filePath,
        stats: fs.statSync(path.join(directoryPath, entry.name)).size,
      });
    }
  }
}
