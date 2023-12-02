import http from 'http';

import app from './app.js';
import { initDB } from './db/mongodb.js';
import { init } from './socket.js'

await initDB();

const server = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server iniciado en el puerto 8080`)
})

init(server);