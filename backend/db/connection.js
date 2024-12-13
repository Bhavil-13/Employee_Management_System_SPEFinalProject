import { MongoClient, ServerApiVersion } from "mongodb";

// const URI = "mongodb://mongodb:27017";
const MONGO_URI = process.env.MONGO_URI
console.log("The mongo_URI from env is: ")
console.log(MONGO_URI)
const client = new MongoClient(/*URI*/MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  // console.log("HIIII");
  console.error(err);
}

let db = client.db("employees");

export default db;
