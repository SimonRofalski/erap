/**
@param {string} url
@param {string} filename
\*/
const fs = require("fs");
const axios = require("axios").default;
async function downloadImage(url, filePath) {
  // Responsetype is try & error, Arraybuffer works most of the time
  const data = (await axios.get(url, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(filePath, data, { encoding: "binary" });
}
downloadImage(
  "https://upload.wikimedia.org/wikipedia/commons/8/82/TeTuatahianui.jpg",
  "kiwi.jpg"
);
