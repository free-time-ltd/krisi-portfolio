import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import * as schema from "./schema";
export * from "./schema";
export { eq, asc, inArray, type SelectedFields } from "drizzle-orm";

const connection = connect({
  url: process.env.DATABASE_URL,
});

export const db = drizzle(connection, {
  logger: process.env.NODE_ENV !== "production",
  schema,
});
