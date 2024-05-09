import * as dotenv from 'dotenv';

dotenv.config();

const DATABASE_URI = process.env.DB_URL as string;
const API_PORT = process.env.API_PORT || 0 as number;

export { DATABASE_URI, API_PORT };