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
const ExtractImageJob = require(path.join(
  __dirname,
  dependenciesFolder,
  "extractImage.js"
)).ExtractImageJob;

// url for search term
const searchURL1 = "https://www.google.com/search?q=";
const searchURL2 = "&source=lnms&tbm=isch";
const queryTerm = "photon particle"; // TODO: loop through this
const finalSearchURL = searchURL1 + queryTerm + searchURL2;

// html file to download results to
const outputFileName = queryTerm + ".html";
const htmlFolder = "HTMLFolder";
const htmlFilePath = path.join(__dirname, htmlFolder, outputFileName);

// download HTML webpage of search result
const downloadHTMLJob = new HTMLDownloadJob();
const extractImageJob = new ExtractImageJob();
downloadHTMLJob.on("done", details => {
  console.log(`HTML download job completed on ${details.completedOn}`);
});
downloadHTMLJob.on("done", () => {
  extractImageJob.emit("start", htmlFilePath);
});

downloadHTMLJob.emit("start", htmlFilePath, finalSearchURL);
