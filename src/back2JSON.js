const Papa = require('papaparse');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../transform/consent/');
const outputPath = path.join(__dirname, '../data/consent/data.json');
let dataArray = [];
fs.readdirSync(filePath).forEach((file) => {
  let data = fs.readFileSync(filePath + file, 'utf8');
  let parsedData = Papa.parse(data, { header: true });
  dataArray.push(parsedData.data);
  fs.writeFileSync(outputPath, JSON.stringify(dataArray));
});
