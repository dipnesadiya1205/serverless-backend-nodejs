const { text, serial, timestamp, pgTable } = require("drizzle-orm/pg-core");

const LeadTable = pgTable("leads", {
  id: serial("id").primaryKey().notNull(),
  email: text("email").notNull(),
  description: text("description").default("This is a description"),
  createdAt: timestamp("created_at").defaultNow(),
});

module.exports.LeadTable = LeadTable;
