const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { neon, neonConfig } = require("@neondatabase/serverless");

const dbClient = async () => {
  neonConfig.fetchConnectionCache = true;
  const sql = neon(process.env.DATABASE_URL);
  return sql;
};

app.get("/", async (req, res, next) => {
  const db = await dbClient();
  const result = await db`select * from playing_with_neon;`;

  return res.status(200).json({
    message: "Hello from root!",
    result,
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
