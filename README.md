# 🔗 GoURL

URL Shortner using Vercel /Zeit-Now 's Serverless Api and MongoDB

---

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/adityatelange/gourl/)

## How to Deploy

- Click the above button to Deploy

- In the Environment variables put a new variable with

  `NAME = GOURLDB`

  and

  `VALUE = <MongoDB Cluster URL>`

  ex. `mongodb+srv://gourl:JUYEGBF8HDH@cluster0-gfgr.mongodb.net/gourl?retryWrites=true&w=majority`

- If Everything goes well you have your own URL Shortner :)

---

🌟 MongoDB Atlas offers `512 mb` for FREE tier, with 1 ShortURL using `~200 b` of space one can have `2.5 Million+` Urls in a Cluster !

Notes:

- https://vercel.com/docs/v2/serverless-functions/introduction
- https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel
- https://vercel.com/docs/v2/build-step#environment-variables
- https://vercel.com/blog/deploy-button
