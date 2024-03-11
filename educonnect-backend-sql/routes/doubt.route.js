const express = require("express");
const executeQuery = require("../Config/execute");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const doubt = await executeQuery('SELECT * FROM solveddoubts AS S Right OUTER JOIN ( SELECT doubt.*, teacher.teacherName FROM doubt LEFT JOIN teacher ON teacher.id = doubt.teacherID ) AS D ON S.doubtID = D.id;');
    res.status(200).send(doubt);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.get("/solved", async (req, res) => {
  try {
    const doubt = await executeQuery('SELECT * FROM SolvedDoubts as S,Doubt as D where S.doubtid=D.id');
    res.status(200).send(doubt);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const insertResult = await executeQuery('INSERT INTO doubt SET ?', [payload]);
    const [doubt] = await executeQuery('SELECT * FROM doubt WHERE id = ?', [insertResult.insertId]);
    res.send({ message: "Doubt successfully created", doubt });
  } catch (error) {
    console.error(error);
    res.send({ error: "Something went wrong, unable to create doubt" });
  }
});
router.post("/createSolve", async (req, res) => {
  const {doubtID,answer} = req.body;
  try {
    const [existingSolvedDoubt] = await executeQuery('SELECT * FROM SolvedDoubts WHERE doubtid = ?', [doubtID]);

    if (existingSolvedDoubt) {
      return res.send({ message: "Already answer exists" });
    }

    const insertResult = await executeQuery('INSERT INTO SolvedDoubts SET ?', [{doubtID,answer}]);
    const [doubt] = await executeQuery('SELECT * FROM doubt WHERE id = ?', [insertResult.insertId]);
    res.send({ message: "Doubt successfully created", doubt });
  } catch (error) {
    console.error(error);
    res.send({ error: "Something went wrong, unable to create doubt" });
  }
});

router.delete("/:doubtId", async (req, res) => {
  const id = req.params.doubtId;
  try {
    const result = await executeQuery('DELETE FROM doubt WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      res.status(404).send({ msg: `Doubt with id ${id} not found` });
    } else {
      res.status(200).send(`Doubt with id ${id} deleted`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Something went wrong, unable to delete doubt" });
  }
});

module.exports = router;
