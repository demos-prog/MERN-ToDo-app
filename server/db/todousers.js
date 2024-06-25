import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv'

dotenv.config();

// const uri = process.env.ATLAS_URI || "";
const uri = 'mongodb+srv://demos:3465@cluster0.ixp4znt.mongodb.net/';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err);
}

let db = client.db("todousers");

export default db;