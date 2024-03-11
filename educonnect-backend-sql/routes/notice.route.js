const express = require("express");
const executeQuery = require("../Config/execute");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const notices = await executeQuery('SELECT * FROM notice');
    res.status(200).send(notices);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const insertResult = await executeQuery('INSERT INTO notice SET ?', [payload]);
    const [notice] = await executeQuery('SELECT * FROM notice WHERE id = ?', [insertResult.insertId]);
    res.send({ message: "Notice successfully created", notice });
  } catch (error) {
    console.error(error);
    res.send({ error: "Something went wrong, unable to create notice" });
  }
});

router.delete("/:noticeId", async (req, res) => {
  const id = req.params.noticeId;
  try {
    const [notice] = await executeQuery('DELETE FROM notice WHERE id = ?', [id]);
    if (notice.affectedRows === 0) {
      res.status(404).send({ msg: `Notice with id ${id} not found` });
    }
    res.status(200).send(`Notice with id ${id} deleted`);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Something went wrong, unable to delete notice" });
  }
});

module.exports = router;
