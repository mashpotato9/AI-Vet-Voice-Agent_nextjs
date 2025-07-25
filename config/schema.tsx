import { integer, json, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().defaultNow().notNull(),
  credits: integer(),
});

export const SessionChatTable = pgTable("session_chat", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar({ length: 255 }).notNull(),
  notes: text().notNull(),
  selectedVet: json(),
  conversation: json(),
  report: json(),
  createdBy: varchar({ length: 255 }).references(() => usersTable.email),
  createdAt: timestamp().defaultNow().notNull(),
})