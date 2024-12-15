import { MongoClient, ServerApiVersion } from "mongodb";

const URI = "mongodb://mongodb:27017";
const client = new MongoClient(URI, {
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
  console.error(err);
}

let db = client.db("employees");

export default db;

// import { MongoClient, ServerApiVersion } from "mongodb";
// import logger from "./logger";  // Import the logger from the same db folder

// const URI = "mongodb://mongodb:27017";
// const client = new MongoClient(URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// try {
//   // Connect the client to the server
//   await client.connect();
  
//   // Send a ping to confirm a successful connection
//   await client.db("admin").command({ ping: 1 });

//   // Log successful connection
//   logger.info("Pinged your deployment. You successfully connected to MongoDB!");
  
// } catch (err) {
//   // Log connection error
//   logger.error(`MongoDB connection failed: ${err.message}`);
//   console.error("Error:", err); // You can still log the error to the console for debugging
// }

// let db = client.db("employees");

// export default db;
