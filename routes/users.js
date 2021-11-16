var express = require('express');
var router = express.Router();

const request = require('request');
const fakeUa = require('fake-useragent');

const cors = require('./cors');
/* GET users listing. */

const writeXlsxFile = require('write-excel-file');

router.all('/')
  .options('/', cors.corsWithOptions, function (req, res, next) {
    next();
  })
  .post('/', cors.corsWithOptions, async function (req, response, next) {
    const fileNames = req.body.email.split('@')[0] + new Date().toISOString() +  '.xlsx';
    const headingColumnNames = req.body.columns;
    const rows = remoduleRows(req.body.rows, headingColumnNames);
    console.log(fileNames, rows);
    const xl = require('excel4node');
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Output');
    let headingColumnIndex = 1;
    headingColumnNames.forEach(heading => {
      ws.cell(1, headingColumnIndex++)
        .string(heading)
    });
    let rowIndex = 2;
    rows.forEach(record => {
      let columnIndex = 1;
      Object.keys(record).forEach(columnName => {
        ws.cell(rowIndex, columnIndex++)
          .string(record[columnName])
      });
      rowIndex++;
    });
    wb.write(`${fileNames}`);
    response.statusCode = 200;
    response.json({ success: true, msg: 'Sent' });
  });

function remoduleRows(rows, columns) {
  const newRows = [];
  rows.map(row => {
    const newRow = {};
    row.map((rowData, index) => {
      console.log(columns[index]);
      const key = columns[index]
      newRow[columns[index]] = rowData.toString();
    })
    newRows.push(newRow);
  })
  return newRows;
}

function test() {
  [{
    firstName: 'John',
    lastName: 'Bailey',
    purchasePrice: 1000,
    paymentsMade: 100
  }, {
    firstName: 'Leonard',
    lastName: 'Clark',
    purchasePrice: 1000,
    paymentsMade: 150
  }, {
    firstName: 'Phil',
    lastName: 'Knox',
    purchasePrice: 1000,
    paymentsMade: 200
  }, {
    firstName: 'Sonia',
    lastName: 'Glover',
    purchasePrice: 1000,
    paymentsMade: 250
  }, {
    firstName: 'Adam',
    lastName: 'Mackay',
    purchasePrice: 1000,
    paymentsMade: 350
  }, {
    firstName: 'Lisa',
    lastName: 'Ogden',
    purchasePrice: 1000,
    paymentsMade: 400
  }, {
    firstName: 'Elizabeth',
    lastName: 'Murray',
    purchasePrice: 1000,
    paymentsMade: 500
  }, {
    firstName: 'Caroline',
    lastName: 'Jackson',
    purchasePrice: 1000,
    paymentsMade: 350
  }, {
    firstName: 'Kylie',
    lastName: 'James',
    purchasePrice: 1000,
    paymentsMade: 900
  }, {
    firstName: 'Harry',
    lastName: 'Peake',
    purchasePrice: 1000,
    paymentsMade: 1000
  }]


}

test();
module.exports = router;
