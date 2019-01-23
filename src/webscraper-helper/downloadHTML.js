// ***** Imports ******
// filesystem modules
const fs = require("fs");
// query modules
const rp = require("request-promise");
// events
const EventEmitter = require("events");

// Public
class HTMLDownloadJob extends EventEmitter {
  constructor(ops) {
    super(ops);
    this.on("start", (outputFilePath, searchURL) => {
      this.downloadHTML(outputFilePath, searchURL);
    });
  }
  downloadHTML(outputFilePath, searchURL) {
    // get the html here
    // check if file to store HTML exists
    if (!fs.existsSync(outputFilePath)) {
      console.log(`File ${outputFilePath} did not exist, downloading again`);
      rp(searchURL)
        .then(function(htmlText) {
          fs.writeFile(outputFilePath, htmlText, function(err) {
            if (err) {
              console.log("Error downloading html:", err);
            } else {
              console.log("The file was saved!");
            }
          });
        })
        .catch(function(err) {
          console.log(err.message);
        });
      this.emit("done", { completedOn: new Date() });
    } else {
      console.log(`File ${outputFilePath} already existed`);
      this.emit("done", { completedOn: new Date() });
    }
  }
}
module.exports.HTMLDownloadJob = HTMLDownloadJob;
