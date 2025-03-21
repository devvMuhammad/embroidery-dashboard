import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const poolConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "pulseid",
  password: "khanbaba",
});

export const db = drizzle({ client: poolConnection });