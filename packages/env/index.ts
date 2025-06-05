import dotenv from 'dotenv';

if (globalThis.window === undefined) {
    dotenv.config({ path: '../../.env' });
}


export const ENV = {
    SERVER_URL: process.env.SERVER_URL || 'http://localhost:4000',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000'
}