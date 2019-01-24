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
const ExtractQueryTermsJob = require(path.join(
  __dirname,
  dependenciesFolder,
  "extractQueryTerms.js"
)).ExtractQueryTermsJob;

// url for search term
const searchURL1 = "https://www.google.com/search?q=";
const searchURL2 = "&source=lnms&tbm=isch";

function downloadInventory(inventoryObj) {
  for (id in inventoryObj) {
    console.log(`downloading id ${id}`);
    // html file to download results to
    const queryTerm = inventoryObj[id];
    const htmlFileName = id + ".html";
    const htmlFolder = "HTMLFolder"; // html download folder
    const htmlFilePath = path.join(
      __dirname,
      "..",
      "out",
      htmlFolder,
      htmlFileName
    );
    const finalSearchURL = searchURL1 + queryTerm + searchURL2;

    // images folder to download results to
    const imagesFolder = "ImagesFolder"; // output folder
    const imagesFilePath = path.join(__dirname, "..", "out", imagesFolder, id);

    // download HTML webpage of search result
    const downloadHTMLJob = new HTMLDownloadJob();

    downloadHTMLJob.on("done", details => {
      console.log(`success: ${details.success}`);
      if (details.success) {
        // print job done
        console.log(`HTML download job completed on ${details.completedOn}`);

        // start image extraction
        const extractImageJob = new ExtractImageJob();
        extractImageJob.emit("start", htmlFilePath, imagesFilePath);
      } else {
        console.error("An error occurred with the HTML download");
      }
    });

    // start HTML download
    downloadHTMLJob.emit("start", htmlFilePath, finalSearchURL);
  }
}

const extractQueryTermsJob = new ExtractQueryTermsJob();
extractQueryTermsJob.emit("start");
extractQueryTermsJob.on("done", downloadInventory);
