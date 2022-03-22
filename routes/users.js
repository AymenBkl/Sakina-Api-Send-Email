var express = require('express');
var router = express.Router();

const request = require('request');
const fakeUa = require('fake-useragent');

const cors = require('./cors');
/* GET users listing. */

 const nodemailer = require('./nodemailer');
router.all('/')
  .options('/', cors.corsWithOptions, function (req, res, next) {
    next();
  })
  .post('/', cors.corsWithOptions, async function (req, response, next) {
    try {
    const fileNames =  'New Generated File.xlsx';
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
    wb.write(`./routes/${fileNames}`);
    response.json({success:true,msg:`./routes/${fileNames}`});
  }
  catch(er) {
    response.statusCode = 500;
    response.json({success:false,msg:'Something Went Wrong !'});
  }
  })
  .get('/download',cors.corsWithOptions,async function(req,res,next)  {
    console.log('here');
    res.download('/routes/New Generated File.xlsx');
  })

function remoduleRows(rows, columns) {
  const newRows = [];
  rows.map(row => {
    const newRow = {};
    row.map((rowData, index) => {
      const key = columns[index]
      newRow[columns[index]] = rowData.toString();
    })
    newRows.push(newRow);
  })
  return newRows;
}


module.exports = router;
