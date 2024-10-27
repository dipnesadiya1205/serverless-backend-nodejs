const { desc, eq } = require("drizzle-orm");
const client = require("./clients");
const { LeadTable } = require("./schemas");

async function newLead(email, description) {
  const db = await client.getDrizzleDbClient();
  const result = await db
    .insert(LeadTable)
    .values({ email, description })
    .returning();
  return result[0];
}

async function listLeads() {
  const db = await client.getDrizzleDbClient();
  const results = await db
    .select()
    .from(LeadTable)
    .orderBy(desc(LeadTable.createdAt));
  return results;
}

async function getLead(id) {
  const db = await client.getDrizzleDbClient();
  const result = await db.select().from(LeadTable).where(eq(LeadTable.id, id));
  if (result) {
    return result[0];
  }
  return null;
}

module.exports = { newLead, listLeads, getLead };
