import fs from "fs";
import path from "path";
import csv from "csv-parser";

const inputFilePath = path.join("nasdaq-stock-data.csv");

const outputFilePath = path.join(__dirname, "companies.ts");

const companies = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", (row) => {
    const { Symbol, Name } = row;
    if (Symbol && Name) {
      companies.push({ name: Name, ticker: Symbol });
    }
  })
  .on("end", () => {
    const content = `export const companies = ${JSON.stringify(
      companies,
      null,
      2
    )};\n`;
    fs.writeFileSync(outputFilePath, content);
    console.log("CSV file successfully processed and companies.ts created.");
  });
