const express = require('express');
const executeQuery = require("../Config/execute");

const router = express.Router();

router.get('/testIDs/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const results = await executeQuery(
      'SELECT DISTINCT testID FROM TestResults WHERE studentID = ?',
      [studentId]
    );

    const testIDs = results.map((result) => result.testID);
    
    return res.status(200).send({ testIDs });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
});

router.get('/:studentID/:testID', async (req, res) => {
    try {
      const studentID = req.params.studentID;
      const testID = req.params.testID;
      // Fetch TestResults and QuestionPaper data based on studentID and testID
      const testResults = await executeQuery(
        'SELECT questionNumber, marksObtained FROM TestResults WHERE studentID = ? AND testID = ?',
        [studentID, testID]
      );
  
      const questionPaper = await executeQuery(
        'SELECT questionNumber, marksAllotted FROM QuestionPaper WHERE testID = ?',
        [testID]
      );
      res.status(200).json({ testResults, questionPaper });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

module.exports = router;
