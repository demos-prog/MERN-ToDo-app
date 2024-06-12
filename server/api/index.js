import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import todo from '../routes/todo.js';
import auth from 'express-oauth2-jwt-bearer';

dotenv.config();

const jwtCheck = auth({
  audience: 'https://server-bi2rst9xr-demosprogs-projects.vercel.app',
  issuerBaseURL: 'https://dev-w26ivbb4k6504lsx.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(jwtCheck);
app.use(express.json());

app.use("/todo", todo);
app.get('/', (_, res) => {
  res.status(200).send('Hello from Server!');
})

export default app;

// app.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:${PORT}/`);
// });