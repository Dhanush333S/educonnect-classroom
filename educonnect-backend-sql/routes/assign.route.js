const express = require("express");
const executeQuery = require("../Config/execute");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { teacherID, classInput, subject } = req.body;
    const [existingEntry] = await executeQuery(
      "SELECT * FROM TeacherAssignment WHERE teacherID = ? AND class = ? AND subject = ?",
      [teacherID, classInput, subject]
    );
    if (existingEntry) {
      return res.status(200).send({ message: "Entry already exists" });
    }
    await executeQuery(
      "INSERT INTO TeacherAssignment (teacherID, class, subject) VALUES (?, ?, ?)",
      [teacherID, classInput, subject]
    );

    res.status(200).send({ message: "Successfully" });
  } catch (error) {
    console.error("Error during assignment:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
