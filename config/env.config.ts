import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URI = process.env.DB_URL || '';
const API_PORT = process.env.API_PORT || 0;

export { DATABASE_URI, API_PORT };