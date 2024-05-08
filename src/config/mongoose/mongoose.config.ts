import mongoose from 'mongoose';
import { DATABASE_URI } from '../env.config';
import { error, log } from 'console';

async function connect() {
  try {
    await mongoose.connect(DATABASE_URI);
    log('connected');
  } catch (err) {
    error(err);
  }
}

connect();

export default mongoose;