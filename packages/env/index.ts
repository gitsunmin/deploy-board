export const ENV = {
    SERVER_PORT: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 8000,
    SERVER_URI: process.env.SERVER_URI || 'http://localhost',

    WS_SERVER_PORT: process.env.WS_SERVER_PORT ? parseInt(process.env.WS_SERVER_PORT, 10) : 8000,
    WS_SERVER_URI: process.env.WS_SERVER_URI || 'http://localhost',

    CLIENT_PORT: process.env.CLIENT_PORT ? parseInt(process.env.CLIENT_PORT, 10) : 3000,
    CLIENT_URI: process.env.CLIENT_URI || 'http://localhost'
}