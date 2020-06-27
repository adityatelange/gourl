// uri => /api/:id

// Import Dependencies
const url = require("url");
const MongoClient = require("mongodb").MongoClient;

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

  // Get params we need
  var {
    query: { goto },
  } = req;
  // params we get after rewrite is xxx?id=xxx
  // so we split at ? and get the 0th val
  goto = goto.split("?")[0];

  // get the ShortUrl obj for query
  await collection
    .findOne({ shorturl: goto })
    .then((urlObj) => {
      // update num of click
      collection.updateOne(
        { shorturl: goto },
        {
          $set: {
            clicks: urlObj.clicks + 1,
          },
        }
      );

      // Redirect user to destination
      res.writeHead(302, {
        Location: urlObj.url,
      });
      res.end();
    })
    .catch(() => {
      // if no shorturl found redir to /
      res.writeHead(302, {
        Location: "/",
      });
      res.end();
    });
};
