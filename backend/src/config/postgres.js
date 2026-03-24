import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mediqueue_db",
  password: "jass@2006",
  port: 5432,
});

export default pool;