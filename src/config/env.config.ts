import * as dotenv from 'dotenv';

dotenv.config();

const DATABASE_URI = process.env.DATABASE_URI as string;
const API_PORT = process.env.API_PORT || 0 as number;
const SECRET = process.env.SECRET as string;

console.log('uri: ', DATABASE_URI);


export { DATABASE_URI, API_PORT };