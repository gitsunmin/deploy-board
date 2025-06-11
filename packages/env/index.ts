import dotenv from 'dotenv';

if (!('window' in globalThis)) {
    dotenv.config({ path: '../../.env' });
}

export const ENV = {
    SERVER_PORT: Number(process.env.SERVER_PORT) ?? 8000,
    EXTERNAL_SERVER_URL: process.env.EXTERNAL_SERVER_URL ?? 'http://localhost',
    CLIENT_PORT: Number(process.env.CLIENT_PORT) ?? 3000
}