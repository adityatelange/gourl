// Import Dependencies
const url = require("url");
const MongoClient = require("mongodb").MongoClient;

// connection Uri
const uri = process.env.GOURLDB
// Create cached connection variable
let cachedDb = null;

// Don't respond to external api requests
module.exports = async (req, res) => {
    res.end()
}

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
module.exports.connectToDatabase = async function connectToDatabase() {
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