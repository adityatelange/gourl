// uri => /api/

// Import Dependencies
const url = require("url");
const shortid = require("shortid");
const MongoClient = require("mongodb").MongoClient;

// reference: https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel
// Create cached connection variable
let cachedDb = null;

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
async function connectToDatabase(uri) {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }

  // If no connection is cached, create a new one
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Select the database through the connection,
  // using the database path of the connection string
  const db = await client.db(url.parse(uri).pathname.substr(1));

  // Cache the database connection and return the connection
  cachedDb = db;
  return db;
}

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = async (req, res) => {
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  const db = await connectToDatabase(process.env.GOURLDB);
  const collection = await db.collection("shorturls");

  // get the params
  const { body } = req;
  const url = body.url;

  // check for url
  if (url) {
    // generate new shortUrl and send back
    const newshortUrl = shortid.generate();
    collection
      .insertOne({
        url: url,
        shorturl: newshortUrl,
        clicks: 0,
      })
      .then(() => {
        res.status(201).json({
          goto: newshortUrl,
        });
      });
  } else {
    res.writeHead(302, { Location: "/" });
    res.end();
  }
};
