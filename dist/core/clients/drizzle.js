import * as schema from '../../db/schema/index.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import "dotenv/config";
const client = postgres(String(process.env.DATABASE_URL));
console.log(schema);
export const drizzleClient = drizzle(client, { logger: true, schema });
//# sourceMappingURL=drizzle.js.map