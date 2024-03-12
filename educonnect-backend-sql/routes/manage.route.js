const express = require("express");
const executeQuery = require("../Config/execute");

const router = express.Router();

router.get('/students/:teacherId', async (req, res) => {
  const { teacherId } = req.params;

  try {
    const query = `
      SELECT s.studentID, s.studentName
      FROM Manage m
      JOIN student s ON m.studentID = s.id
      WHERE m.teacherID = ?
    `;

    const results = await executeQuery(query, [teacherId]);

    res.status(200).json({ students: results });
  } catch (error) {
    console.error('Error fetching students:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/teachers/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const query = `
      SELECT t.teacherID, t.teacherName
      FROM Manage m
      JOIN teacher t ON m.teacherID = t.id
      WHERE m.studentID = ?
    `;

    const results = await executeQuery(query, [studentId]);

    res.status(200).json({ teachers: results });
  } catch (error) {
    console.error('Error fetching teachers:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/", async (req, res) => {
  try {
    const { teacherID, studentIDs } = req.body;
    for (const studentID of studentIDs) {
      const [student] = await executeQuery(
        "SELECT id FROM student WHERE studentID = ?",
        [studentID]
      );

      if (!student) {
        return res
          .status(200)
          .send({ message: `Student with studentID ${studentID} not found` });
      }
      const studentDbId = student.id;
      const [existingPair] = await executeQuery(
        "SELECT * FROM manage WHERE teacherID = ? AND studentID = ?",
        [teacherID, studentDbId]
      );

      if (existingPair) {
        continue;
      }

      await executeQuery(
        "INSERT INTO manage (teacherID, studentID) VALUES (?, ?)",
        [teacherID, studentDbId]
      );
    }
    res.status(200).send({ message: "Successfully" });
  } catch (error) {
    console.error("Error during insertion:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
