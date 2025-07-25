import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { text } from "stream/consumers";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().defaultNow().notNull(),
  credits: integer(),
});
