import express from "express";
import __dirname from "./utils.js"
import handlebars from 'express-handlebars';
import viewsRouter from './router/views.router.js'
import { Server } from "socket.io";


const app = express();
const server_port = 8080;


//configuracion para recibir objetos json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//uso de carpeta public
app.use(express.static(`${__dirname}/public`));

//uso de vistas de  plantillas 
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);



const httpServer = app.listen(server_port, () => {
    console.log(`Servidor escuchando por el puerto: ${server_port}`)
})
const socketServer = new Server(httpServer);

let messages =[];
socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado: ");
    socket.on("message", data => {
        console.log(data);
        messages.push(data);
        socketServer.emit("messageLogs", messages)
    });

    socket.on("userConnected", data=>{
        console.log("User Connected: " + data.user)
        socket.broadcast.emit("userConnected", data.user)
    })
});