const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const executeQuery=require('../Config/execute')

require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const admin= await executeQuery('SELECT * FROM admin');
    res.status(200).send(admin);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
    const { email } = req.body;
    try {
      const [existingAdmin] = await executeQuery('SELECT * FROM admin WHERE email = ?', [email]);
  
      if (existingAdmin) {
        return res.send({
          message: "Admin already exists",
        });
      }
      const insertResult = await executeQuery('INSERT INTO admin SET ?', [req.body]);
  
      if (insertResult.affectedRows === 1) {
        const [newAdmin] = await executeQuery('SELECT * FROM admin WHERE email = ?', [email]);
        return res.send({ data: newAdmin, message: "Registered" });
      } else {
        return res.send({ message: "Registration failed" });
      }
    } catch (error) {
      console.error(error);
      res.send({ message: "Error during registration" });
    }
  });
  
  router.post("/login", async (req, res) => {
    const { adminID, password } = req.body;
    try {
        const [admin] = await executeQuery('SELECT * FROM admin WHERE adminID = ? AND password = ?', [adminID, password]);
  
      if (admin) {
        const token = jwt.sign({ foo: "bar" }, process.env.key, {
          expiresIn: "24h",
        });
        res.send({ message: "Successful", user: admin, token: token });
      } else {
        res.send({ message: "Wrong credentials" });
      }
    } catch (error) {
      console.error(error);
      res.send({ message: "Error during login" });
    }
  });
  

router.patch("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  const payload = req.body;
  try {
    const [admin] = await executeQuery('UPDATE admin SET ? WHERE adminID = ?', [payload, id]);
    if (admin.affectedRows === 0) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  try {
    const [admin] = await executeQuery('DELETE FROM admin WHERE adminID = ?', [id]);
    if (admin.affectedRows === 0) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

router.post("/password", (req, res) => {
    const { email, userId, password } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });
  
    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: "Account ID and Password",
      text: `This is your User Id : ${userId} and  Password : ${password} .`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.send(error);
      }
      return res.send("Password reset email sent");
    });
  });


  router.post("/forgot", async (req, res) => {
    const { email, type } = req.body;
    let user;
    let userId;
    let password;
  
    try {
      switch (type) {
        case "student":
          [user] = await executeQuery('SELECT * FROM students WHERE email = ?', [email]);
          userId = user?.studentID;
          password = user?.password;
          break;
        case "admin":
          [user] = await executeQuery('SELECT * FROM admin WHERE email = ?', [email]);
          userId = user?.adminID;
          password = user?.password;
          break;
        case "teacher":
          [user] = await executeQuery('SELECT * FROM teachers WHERE email = ?', [email]);
          userId = user?.teacherID;
          password = user?.password;
          break;
        default:
          return res.send({ message: "Invalid user type" });
      }
  
      if (!user) {
        return res.send({ message: "User not found" });
      }
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.email,
          pass: process.env.password,
        },
      });
  
      const mailOptions = {
        from: process.env.email,
        to: email,
        subject: "Account ID and Password",
        text: `This is your User Id : ${userId} and  Password : ${password} .`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.send(error);
        }
        return res.send("Password reset email sent");
      });
    } catch (error) {
      console.error(error);
      res.send({ message: "Error during password reset" });
    }
  });
    

module.exports = router;
