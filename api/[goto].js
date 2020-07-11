// uri => /api/:id

// Import Dependencies
const dB = require("./db");
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
        // update num of click
        collection.updateOne({
          shorturl: goto
        }, {
          $set: {
            clicks: urlObj.clicks + 1,
          },
        });

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
  } catch (error) {
    // if incorrect params redir to /
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  }
};