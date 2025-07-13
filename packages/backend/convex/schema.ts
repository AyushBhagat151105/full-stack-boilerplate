// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
  {
    ...authTables,
    tasks: defineTable({
      text: v.string(),
      isCompleted: v.boolean(),
    }),
  },
  { schemaValidation: true }
);
