// uri => /api/

// Import Dependencies
const shortid = require("shortid");
const dB = require("./db");
let db = null;

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = async (req, res) => {
  if (!db) {
    db = await dB.connectToDatabase();
  }
  const collection = await db.collection("shorturls");
  // get the params
  const {
    body
  } = req;
  const url = body.url;

  // check for url
  if (url) {
    // get the ShortUrl obj for query
    await collection
      .findOne({
        url
      })
      .then((shorturlObj) => {
        // check whether shortUrl exists to avoid repetition
        res.status(200).json({
          goto: shorturlObj.shorturl,
        });
      })
      .catch(() => {
        // generate new shortUrl and send back
        const newshortUrl = shortid.generate();
        collection
          .insertOne({
            url: url,
            shorturl: newshortUrl,
            clicks: 0,
            createdOn: Date(),
            byIp: req.headers["x-forwarded-for"],
          })
          .then(() => {
            res.status(201).json({
              goto: newshortUrl,
            });
          });
      });
  } else {
    res.writeHead(302, {
      Location: "/"
    });
    res.end();
  }
};