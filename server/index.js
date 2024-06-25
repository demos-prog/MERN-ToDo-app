import express from "express";
import cors from "cors";
import getAllUsers from './api/getAllUsers.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/todo", getAllUsers);
app.use("/", (_, res) => {
  res.send('Hello from server')
});


app.listen(5050, () => {
  console.log(`Server listening on http://localhost:5050/`);
});

export default app;