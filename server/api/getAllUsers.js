// server/api/getAllUsers.js
import db from "../db/todousers.js";

export default async function handler(req, res) {
  try {
    let collection = db.collection("todousers");
    let results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching all users" });
  }
}