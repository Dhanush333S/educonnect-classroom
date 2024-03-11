const express = require("express");
const executeQuery = require("../Config/execute");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [adminCount] = await executeQuery('SELECT COUNT(*) AS count FROM admin');
    const [studentCount] = await executeQuery('SELECT COUNT(*) AS count FROM student');
    const [teacherCount] = await executeQuery('SELECT COUNT(*) AS count FROM teacher');
    const [noticeCount] = await executeQuery('SELECT COUNT(*) AS count FROM notice');

    const data = {
      admin: adminCount.count,
      student: studentCount.count,
      teacher: teacherCount.count,
      notice: noticeCount.count,
    };

    res.status(200).send({ data });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

module.exports = router;
