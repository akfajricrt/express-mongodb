const router = require("express").Router();
const client = require("./connection");
const ObjectId = require("mongodb").ObjectId;

router.get("/todos", async (req, res) => {
  try {
    const db = client.db("latihan");
    const result = await db.collection("todos").find().toArray();

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/todo/:id", async (req, res) => {
  try {
    const db = client.db("latihan");
    const result = await db
      .collection("todos")
      .findOne({ _id: ObjectId(req.params.id) });

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
router.post("/todo", async (req, res) => {
  try {
    const { todo } = req.body;
    const db = client.db("latihan");

    await db.collection("todos").insertOne({ todo });

    res.status(201).json({ status: 201, message: "data berhasil ter upload" });
  } catch (error) {
    console.log(error);
  }
});
router.put("/todo/:id", async (req, res) => {
  try {
    const { todo } = req.body;
    const db = client.db("latihan");

    await db
      .collection("todos")
      .updateOne({ _id: ObjectId(req.params.id) }, { $set: { todo } });

    res.status(201).json({ status: 201, message: "data berhasil diedit" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/todo/:id", async (req, res) => {
  try {
    const db = client.db("latihan");

    await db.collection("todos").deleteOne({ _id: ObjectId(req.params.id) });

    res.status(200).json({ status: 200, message: "data berhasil dihapus" });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
