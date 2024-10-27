const { neon } = require("@neondatabase/serverless");
const { drizzle } = require("drizzle-orm/neon-http");
const secrets = require("../lib/secrets");

const getDbClient = async () => {
  const dbURL = await secrets.getDatabaseUrl();
  const sql = neon(dbURL);
  return sql;
};

const getDrizzleDbClient = async () => {
  const sql = await getDbClient();
  return drizzle(sql);
};

module.exports.getDbClient = getDbClient;
module.exports.getDrizzleDbClient = getDrizzleDbClient;
