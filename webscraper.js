// filesystem
const fs = require("fs");
const path = require("path");

// local dependencies
const dependenciesFolder = "webscraper-helper";
const HTMLDownloadJob = require(path.join(
  __dirname,
  dependenciesFolder,
  "downloadHTML.js"
)).HTMLDownloadJob;

// url for search term
const searchURL1 = "https://www.google.com/search?q=";
const searchURL2 = "&source=lnms&tbm=isch";
const queryTerm = "photon particle"; // TODO: loop through this
const finalSearchURL = searchURL1 + queryTerm + searchURL2;

// html file to download results to
const outputFileName = queryTerm + ".html";
const outputFilePath = path.join(__dirname, outputFileName);

let downloadHTMLJob = new HTMLDownloadJob();

downloadHTMLJob.on("done", details => {
  console.log(`HTML download job completed on ${details.completedOn}`);
});

downloadHTMLJob.emit("start", outputFilePath, finalSearchURL);

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
