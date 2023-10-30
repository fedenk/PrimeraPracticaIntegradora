import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import Messages from './dao/dbManagers/messages.manager.js';


const messageManager = new Messages();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use(express.static(`${__dirname}/public`))

try {
    await mongoose.connect('mongodb+srv://fedenkoptv:86VUQzMmgjkJQ26Z@cluster55575fgs.es4ndyh.mongodb.net/ecommerce?retryWrites=true&w=majority');
    console.log('DB connected');
} catch (error) {
    console.log(error.message);
}

const server = app.listen(8080, () => console.log('server running'));

const socketServer = new Server(server);

const logs = [];

socketServer.on('connection', socket => {
    socket.on('message1', data => {
        socketServer.emit('log', data);
    })

    socket.on('message2', data => {
        logs.push({ socketid: socket.id, message: data })
        socketServer.emit('log', { logs });

        messageManager.save({ socketid: socket.id, message: data });
    })
})