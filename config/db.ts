import mysql, { ResultSetHeader } from 'mysql2/promise';

export async function callDatabase(query: string, data:unknown): Promise<ResultSetHeader> {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      ssl: {
        ca: process.env.DB_CA,
        rejectUnauthorized: false, // Optional depending on your environment
      },
    });
    const [result] = await db.execute<ResultSetHeader>(query, data);
    await db.end();

    console.log('Queried from database:', result);
    return result;

  } catch (error) {
    console.error('Error executing query:', error);
    throw new Error('Error Executing Query');
  }
}