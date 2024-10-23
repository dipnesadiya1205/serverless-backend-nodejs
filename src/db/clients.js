const { neon } = require("@neondatabase/serverless");
const secrets = require("../lib/secrets");

const getDbClient = async () => {
  const dbURL = await secrets.getDatabaseUrl();
  const sql = neon(dbURL);
  return sql;
};

module.exports.getDbClient = getDbClient;
