import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import todo from './routes/todo.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/todo", todo);




app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/`);
});