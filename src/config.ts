import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.SECRET || 'secret_key';

export default secret;