const EventEmitter = require("events");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const download = require("image-downloader");
const escapePathSpaces = require(path.join(__dirname, "escapePathSpaces.js"));

class ExtractImageJob extends EventEmitter {
  constructor(ops) {
    super(ops);
    this.on("start", (htmlFilePath, downloadImagePath) => {
      this.getImageURL(htmlFilePath, downloadImagePath);
    });
  }
  getImageURL(htmlFilePath, downloadImagePath) {
    console.log(`Going to extract image from ${htmlFilePath}`);

    fs.readFile(htmlFilePath, (err, data) => {
      if (err) {
        console.error(`Error reading from ${htmlFilePath}`);
      }
      const $ = cheerio.load(data);
      const imageURL = $("img").attr("src");
      console.log(`Image link was: ${imageURL}`);
      console.log(`Downloading to ${downloadImagePath}`);
      this.downloadImage(imageURL, downloadImagePath);
    });
  }
  downloadImage(imageURL, downloadImagePath) {
    // Download to a directory and save with an another filename
    const options = {
      url: imageURL,
      dest: downloadImagePath + ".jpg"
    }; // Save to here

    download
      .image(options)
      .then(({ filename, image }) => {
        console.log("File saved to", filename);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
module.exports.ExtractImageJob = ExtractImageJob;
