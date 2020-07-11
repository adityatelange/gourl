// uri => /api/stats/:id

// Import Dependencies
const dB = require("../db");
let db = null;

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = async (req, res) => {
  if (!db) {
    db = await dB.connectToDatabase();
  }
  const collection = await db.collection("shorturls");
  // Get params we need
  var {
    query: {
      goto
    },
  } = req;

  try {
    // params we get after rewrite is xxx?id=xxx
    // so we split at ? and get the 0th val
    goto = goto.split("?")[0];

    // get the ShortUrl obj for query
    await collection
      .findOne({
        shorturl: goto
      })
      .then((urlObj) => {
        // return stats
        res.status(200).json({
          clicks: urlObj.clicks
        });
      })
      .catch(() => {
        // if no shorturl
        res.status(404).json({});
      });
  } catch (error) {
    res.status(400).json({});
  }
};