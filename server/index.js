import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import todo from './api/todo.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/todo", todo);
app.use("/", (_, res) => {
  res.send('Hello from server')
});


app.listen(5050, () => {
  console.log(`Server listening on http://localhost:5050/`);
});