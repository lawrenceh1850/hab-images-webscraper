const fs = require("fs");
const path = require("path");

const rp = require("request-promise");
const querystring = require("querystring");
const request = require("request");

const dependenciesFolder = "webscraper-helper";
const downloadHTML = require(path.join(
  __dirname,
  dependenciesFolder,
  "download.js"
));

// url for search term
const searchURL1 = "https://www.google.com/search?q=";
const searchURL2 = "&source=lnms&tbm=isch";

const queryTerm = "resistor"; // TODO: loop through this
const finalSearchURL = searchURL1 + queryTerm + searchURL2;
const outputFileName = "images.html";
const outputFilePath = path.join(__dirname, outputFileName);

// get the html here
// check if file to store HTML exists
// console.log(fs);
if (!fs.existsSync(outputFilePath)) {
  console.log("File did not exist, downloading again");
  rp(finalSearchURL)
    .then(function(html) {
      downloadHTML(html, outputFilePath);
    })
    .catch(function(err) {
      console.error("34:", err.message);
    });
}

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
