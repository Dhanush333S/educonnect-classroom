const express = require('express');
const router = express.Router();
const executeQuery = require("../Config/execute");

router.get('/:percentage', async (req, res) => {
  try {
    const percentage = parseFloat(req.params.percentage);

    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      return res.status(400).send({ message: 'Invalid percentage' });
    }

    const [gradeData] = await executeQuery(
      'SELECT grade, details FROM GradeSchema WHERE minMarks <= ? AND maxMarks >= ?',
      [percentage, percentage]
    );

    if (!gradeData) {
      return res.status(404).send({ message: 'Grade not found for the given percentage' });
    }

    const { grade, details } = gradeData;
    return res.status(200).send({ grade, details });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
