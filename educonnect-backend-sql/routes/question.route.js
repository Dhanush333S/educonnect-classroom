const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const executeQuery = require("../Config/execute");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    const expectedHeaders = ['testID', 'subject', 'questionNumber', 'marksAllotted'];
    const actualHeaders = Object.keys(data[0]);

    if (!expectedHeaders.every((header) => actualHeaders.includes(header))) {
      return res.status(400).send({ message: 'Invalid headers in the Excel file' });
    }

    const promises = data.map(async (row) => {
      try {
        const [result] = await executeQuery(
          'INSERT INTO questionpaper (testID, subject, questionNumber, marksAllotted) VALUES (?, ?, ?, ?)',
          [row.testID, row.subject, row.questionNumber, row.marksAllotted]
        );
        return `Successfully inserted row with ID: ${result.insertId}`;
      } catch (error) {
        return `Error inserting data into questionpaper: ${error.message}`;
      }
    });

    const results = await Promise.all(promises);
    return res.status(200).send({ results });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
});


router.post('/student', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
      }
  
      const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);
  
      const expectedHeaders = ['studentID', 'testID', 'questionNumber', 'marksObtained'];
      const actualHeaders = Object.keys(data[0]);
  
      if (!expectedHeaders.every((header) => actualHeaders.includes(header))) {
        return res.status(400).send({ message: 'Invalid headers in the Excel file' });
      }
  
      const insertionPromises = data.map(async (row) => {
        try {
          const [result] = await executeQuery(
            'INSERT INTO TestResults (studentID, testID, questionNumber, marksObtained) VALUES (?, ?, ?, ?)',
            [row.studentID, row.testID, row.questionNumber, row.marksObtained]
          );
          return `Successfully inserted row with ID: ${result.insertId}`;
        } catch (error) {
          return `Error inserting data into TestResults: ${error.message}`;
        }
      });
  
      const results = await Promise.all(insertionPromises);
      return res.status(200).send({ results });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  });

module.exports = router;
