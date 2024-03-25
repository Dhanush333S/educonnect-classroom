const express = require("express");
const executeQuery = require("../Config/execute");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/allTeachers", async (req, res) => {
  try {
    const teacher = await executeQuery('SELECT id,teacherID,teacherName,email FROM teacher');
    res.status(200).send(teacher);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});


router.get("/", async (req, res) => {
  try {
    const teacher = await executeQuery('SELECT T.id,T.teacherID,teacherName,email,subject FROM teacher as T, TeacherAssignment as A where T.id = A.teacherID;');
    res.status(200).send(teacher);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const [existingTeacher] = await executeQuery('SELECT * FROM teacher WHERE email = ?', [email]);
    
    if (existingTeacher) {
      return res.send({
        message: "Teacher already exists",
      });
    }

    const insertResult = await executeQuery('INSERT INTO teacher SET ?', [req.body]);
    const [data] = await executeQuery('SELECT * FROM teacher WHERE id = ?', [insertResult.insertId]);
    res.send({ data, message: "Registered" });
  } catch (error) {
    console.error(error);
    res.send({ message: "Error during registration" });
  }
});

router.post("/login", async (req, res) => {
  const { teacherID, password } = req.body;
  try {
    const [teacher] = await executeQuery('SELECT * FROM teacher WHERE teacherID = ? AND password = ?', [teacherID, password]);

    if (teacher) {
      const token = jwt.sign({ foo: "bar" }, process.env.key, {
        expiresIn: "24h",
      });
      res.send({ message: "Successful", user: teacher, token: token });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.error(error);
    res.send({ message: "Error during login" });
  }
});

router.patch("/:teacherId", async (req, res) => {
  const id = req.params.teacherId;
  const payload = req.body;
  if (payload.DOB && payload.DOB.length > 10) {
    payload.DOB = payload.DOB.slice(0, 10);
  }
  try {
    const teacher = await executeQuery('UPDATE teacher SET ? WHERE id = ?', [payload, id]);
    
    if (!teacher) {
      return res.status(404).send({ message: `Teacher with id ${id} not found` });
    }
    
    const [updatedTeacher] = await executeQuery('SELECT * FROM teacher WHERE id = ?', [id]);
    res.status(200).send({ message: `Teacher Updated`, user: updatedTeacher });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:teacherId", async (req, res) => {
  const id = req.params.teacherId;
  try {
    const [teacher] = await executeQuery('DELETE FROM teacher WHERE id = ?', [id]);

    if (!teacher) {
      res.status(404).send({ msg: `Teacher with id ${id} not found` });
    }

    res.status(200).send(`Teacher with id ${id} deleted`);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
