import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";

import { env } from "@/config/env";
import * as schema from "@/db/schema";

export const sql = neon(env.DATABASE_URL);

export const db = drizzleNeon(sql, { schema, logger: false });
