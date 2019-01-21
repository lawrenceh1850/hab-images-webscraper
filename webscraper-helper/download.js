const fs = require("fs");

module.exports = function downloadHTML(htmlText, filePath) {
  fs.writeFile(filePath, htmlText, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
};
