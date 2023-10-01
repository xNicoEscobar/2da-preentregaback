import { mensajeModel } from "../dao/models/mensaje.model.js";
const chatEvents = (socketServer) => {
    socketServer.on("connection", (socket) => {
        console.log("client connected to chat with id", socket.id);
        socket.on('mensaje', async (data) => {
            await mensajeModel.create(data);
            const mensajes = await mensajeModel.find().lean();
            console.log(mensajes)
            socketServer.emit('nuevo_mensaje', mensajes)
        });
    });
};

export default chatEvents;