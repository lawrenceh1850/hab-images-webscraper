// ***** Imports ******
// filesystem modules
const fs = require("fs");
// query modules
const rp = require("request-promise");
const querystring = require("querystring");
const request = require("request");
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
              return console.log(err);
            }
            console.log("The file was saved!");
          });
        })
        .catch(function(err) {
          console.error(err.message);
        });
    }
    this.emit("done", { completedOn: new Date() });
  }
}
module.exports.HTMLDownloadJob = HTMLDownloadJob;
