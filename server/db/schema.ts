import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const projectsTable = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true, precision: 6 }),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    precision: 6,
  }).$onUpdateFn(() => new Date()),
});

export const environmentsTable = pgTable("environments", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  projectId: uuid("project_id")
    .references(() => projectsTable.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, precision: 6 }),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    precision: 6,
  }).$onUpdateFn(() => new Date()),
});

export const variablesTable = pgTable("variables", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  value: text("value").notNull(),
  environmentId: uuid("environment_id")
    .references(() => environmentsTable.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, precision: 6 }),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    precision: 6,
  }).$onUpdateFn(() => new Date()),
});

export type Project = typeof projectsTable.$inferSelect;
export type Environment = typeof environmentsTable.$inferSelect;
export type Variable = typeof variablesTable.$inferSelect;
