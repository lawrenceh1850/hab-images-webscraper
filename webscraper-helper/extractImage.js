const EventEmitter = require("events");
const fs = require("fs");
const cheerio = require("cheerio");
const querystring = require("querystring");
const request = require("request");

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
      this.downloadImage(imageURL, downloadImagePath);
    });
  }
  downloadImage(imageURL, downloadPath) {
    request.head(uri, function(err, res, body) {
      console.log("content-type:", res.headers["content-type"]);
      console.log("content-length:", res.headers["content-length"]);

      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on("close", callback);
    });
  }
}
module.exports.ExtractImageJob = ExtractImageJob;

// const download = function(uri, filename, callback) {

// };

// download(
//   "https://www.google.com/images/srpr/logo3w.png",
//   "google.png",
//   function() {
//     console.log("done");
//   }
// );
