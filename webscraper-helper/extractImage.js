const EventEmitter = require("events");
const fs = require("fs");

class ExtractImageJob extends EventEmitter {
  constructor(ops) {
    super(ops);
    this.on("start", htmlFileName => {
      this.getImageLink(htmlFileName);
    });
  }
  getImageLink(htmlFileName) {
    console.log(`Going to extract image from ${htmlFileName}`);
  }
}
module.exports.ExtractImageJob = ExtractImageJob;

// const download = function(uri, filename, callback) {
//   request.head(uri, function(err, res, body) {
//     console.log("content-type:", res.headers["content-type"]);
//     console.log("content-length:", res.headers["content-length"]);

//     request(uri)
//       .pipe(fs.createWriteStream(filename))
//       .on("close", callback);
//   });
// };

// download(
//   "https://www.google.com/images/srpr/logo3w.png",
//   "google.png",
//   function() {
//     console.log("done");
//   }
// );
