const express = require("express");
const executeQuery = require("../Config/execute");

const router = express.Router();
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
