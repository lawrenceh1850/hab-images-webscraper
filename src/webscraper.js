// filesystem
const path = require("path");

// local dependencies
const dependenciesFolder = "webscraper-helper";
const HTMLDownloadJob = require(path.join(
  __dirname,
  dependenciesFolder,
  "downloadHTML.js"
)).HTMLDownloadJob;
const ExtractImageJob = require(path.join(
  __dirname,
  dependenciesFolder,
  "extractImage.js"
)).ExtractImageJob;

// url for search term
const searchURL1 = "https://www.google.com/search?q=";
const searchURL2 = "&source=lnms&tbm=isch";
const queryTerm = "myo arm band"; // TODO: loop through list of these
const finalSearchURL = searchURL1 + queryTerm + searchURL2;

// html file to download results to
const htmlFileName = queryTerm + ".html";
const htmlFolder = "HTMLFolder"; // html download folder
const htmlFilePath = path.join(
  __dirname,
  "..",
  "out",
  htmlFolder,
  htmlFileName
);

// images folder to download results to
const imagesFolder = "ImagesFolder"; // output folder
const imagesFilePath = path.join(
  __dirname,
  "..",
  "out",
  imagesFolder,
  queryTerm
);

// download HTML webpage of search result
const downloadHTMLJob = new HTMLDownloadJob();
const extractImageJob = new ExtractImageJob();

// print job done
downloadHTMLJob.on("done", details => {
  console.log(`HTML download job completed on ${details.completedOn}`);
});

// start image extraction
downloadHTMLJob.on("done", () => {
  extractImageJob.emit("start", htmlFilePath, imagesFilePath);
});

// start HTML download
downloadHTMLJob.emit("start", htmlFilePath, finalSearchURL);
