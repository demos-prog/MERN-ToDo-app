import express from "express";
import db from "../db/todousers.js";
import { ObjectId } from "mongodb";


const router = express.Router();

// get ALL users
router.get("/", async (req, res) => {
  let collection = db.collection("todousers");
  let results = await collection.find({}).toArray();
  res.status(200).send(results);
});

// get the data of ONE user
router.get("/:name", async (req, res) => {
  let collection = db.collection("todousers");
  const result = await collection.findOne({ name: req.params.name });
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

// creating of a user
router.post('/createuser', async (req, res) => {
  try {
    const newUser = {
      name: req.body.name,
      password: req.body.password,
      todos: [],
    }
    const collection = db.collection("todousers");
    const result = await collection.insertOne(newUser)
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error adding user" });
  }
})

// user's authentication
router.get('/auth/:name/:password', async (req, res) => {
  try {
    const collection = db.collection("todousers");
    const result = await collection.findOne({ name: req.params.name })
    if (result) {
      if (result.password === req.params.password) {
        res.send(result)
      } else {
        res.status(404).send({ message: 'Incorrect password' })
      }
    } else {
      res.status(404).send({ message: 'User not found' })
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error finding user" });
  }
})

// adding todo item for a certain user
router.post('/:name', async (req, res) => {
  try {
    const collection = db.collection("todousers");
    const user = await collection.findOne({ name: req.params.name });
    if (user) {
      const usersTodoList = user.todos;
      usersTodoList.push({
        text: req.body.todo,
        complition: false
      })
      const result = await collection.findOneAndReplace({
        name: user.name,
        todos: usersTodoList,
      })
      res.send(result)
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error adding record" });
  }
})

router.patch("/:id", async (req, res) => {

  try {
    let collection = db.collection("todousers");
    const user = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (user) {

    }



  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error adding record" });
  }
});



export default router;