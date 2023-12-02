import express from "express";
import handlebars from "express-handlebars";
import path from 'path';

import productsRouter from './routers/productRouter.js';
import cartsRouter from './routers/cartRouter.js';
import chatRouter from './routers/chatRouter.js';

import { __dirname } from './utils.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'handlebars');

app.use('/', chatRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use((error, req, res, next) => {
    const message = 'Ocurrio un error inesperado: ${error.message}';
    console.error(message);
    res.status(500).json({ message });
})

export default app;