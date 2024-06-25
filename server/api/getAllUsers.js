import db from "../db/todousers.js";

export default async function handler(_, res) {
  try {
    let collection = db.collection("todousers");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching all users" });
  }
}