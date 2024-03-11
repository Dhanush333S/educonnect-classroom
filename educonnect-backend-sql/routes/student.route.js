const express = require("express");
const mysql = require('mysql2');
const executeQuery = require("../Config/execute");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const student = await executeQuery('SELECT * FROM student');
    res.status(200).send(student);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const [existingStudent] = await executeQuery('SELECT * FROM student WHERE email = ?', [email]);

    if (existingStudent) {
      return res.send({
        message: "Student already exists",
      });
    }

    const insertResult = await executeQuery('INSERT INTO student SET ?', [req.body]);

    if (insertResult.affectedRows === 1) {
      const [newStudent] = await executeQuery('SELECT * FROM student WHERE id = ?', [insertResult.insertId]);
      return res.send({ data: newStudent, message: "Registered" });
    } else {
      return res.send({ message: "Registration failed" });
    }
  } catch (error) {
    console.error(error);
    res.send({ message: "Error during registration" });
  }
});

router.post("/login", async (req, res) => {
  const { studentID, password } = req.body;
  try {
    const [student] = await executeQuery('SELECT * FROM student WHERE studentID = ? AND password = ?', [studentID, password]);

    if (student) {
      const token = jwt.sign({ foo: "bar" }, process.env.key, {
        expiresIn: "24h",
      });
      res.send({ message: "Successful", user: student, token: token });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.error(error);
    res.send({ message: "Error during login" });
  }
});

router.patch("/:studentId", async (req, res) => {
  const id = req.params.studentId;
  const payload = req.body;
  try {
    await executeQuery('UPDATE student SET ? WHERE id = ?', [payload, id]);
    const [updatedStudent] = await executeQuery('SELECT * FROM student WHERE id = ?', [id]);

    if (!updatedStudent) {
      return res.status(404).send({ message: `Student with id ${id} not found` });
    }

    res.status(200).send({ message: `Student Updated`, user: updatedStudent });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:studentId", async (req, res) => {
  const id = req.params.studentId;
  try {
    const [deletedStudent] = await executeQuery('DELETE FROM student WHERE id = ?', [id]);

    if (!deletedStudent) {
      res.status(404).send({ msg: `Student with id ${id} not found` });
    }

    res.status(200).send(`Student with id ${id} deleted`);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
