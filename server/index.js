import express from "express";
import cors from "cors";
import db from "./db/todousers.js";
// import getAllUsers from './api/getAllUsers.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/todo", async function handler(_, res) {
  try {
    let collection = db.collection("todousers");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching all users" });
  }
});
app.use("/", (_, res) => {
  res.send('Hello from server')
});


app.listen(5050, () => {
  console.log(`Server listening on http://localhost:5050/`);
});

export default app;