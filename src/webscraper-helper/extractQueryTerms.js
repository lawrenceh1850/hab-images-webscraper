const readline = require("readline");
const path = require("path");
const fs = require("fs");
const EventEmitter = require("events");

class ExtractQueryTermsJob extends EventEmitter {
  constructor(ops) {
    super(ops);
    this.on("start", () => {
      this.extractQueryTerms();
    });
  }
  extractQueryTerms() {
    const inventoryFilePath = path.join(__dirname, "..", "inventory.txt");
    const outputFilePath = path.join(
      __dirname,
      "..",
      "..",
      "out",
      "inventoryFormatted.json"
    );

    let readInventoryInterface = readline.createInterface({
      input: fs.createReadStream(inventoryFilePath),
      output: fs.createWriteStream(outputFilePath)
    });

    const inventoryObj = {};

    readInventoryInterface.on("line", line => {
      let res = line.split("|");
      for (let i = 0; i < res.length; i++) {
        res[i] = res[i].trim();
      }
      inventoryObj[res[0]] = res[1];
    });

    readInventoryInterface.on("close", () => {
      console.log("Returning inventoryObj");
      this.emit("done", inventoryObj);
    });
  }
}
module.exports.ExtractQueryTermsJob = ExtractQueryTermsJob;
