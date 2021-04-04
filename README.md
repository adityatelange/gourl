# 🔗 GoURL

URL Shortner using Vercel /Zeit-Now 's Serverless Api and MongoDB

---

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fadityatelange%2Fgourl&env=GOURLDB&envDescription=GOURLDB%20is%20a%20required%20environment%20variable)

## How to Deploy

- Click the above button to Deploy

- In the Environment variables put a new variable with
  
  | NAME | VALUE (WILL BE ENCRYPTED) [example] |
  | - | - |
  | GOURLDB | mongodb+srv://\<username>:\<password>@cluster0.wwlhg.mongodb.net/\<dbname>?retryWrites=true&w=majority |

- If Everything goes well you have your own URL Shortner :)

---

> 🌟 MongoDB Atlas offers `512 mb` for FREE tier, with 1 ShortURL using `~200 b` of space one can have `2.5 Million+` Urls in a Cluster !

<kbd><img src="https://i.ibb.co/hdKRRcB/Screenshot-from-2020-07-06-23-15-27.png" /></kbd>

---

Notes:

- https://vercel.com/docs/v2/serverless-functions/introduction
- https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel
- https://vercel.com/docs/v2/build-step#environment-variables
- https://vercel.com/blog/deploy-button
