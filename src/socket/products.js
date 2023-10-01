import ProductManager from "../dao/database/productManager.js";
const pmanagersocket = new ProductManager()

const productEvents = (socketServer) => {
    socketServer.on("connection", async (socket) => {
        console.log('client connected with id', socket.id);

        const listadeproductos = await pmanagersocket.getProducts()
        socket.emit("sendproducts", listadeproductos)

        socket.on("addProduct", async (obj) => {
            await pmanagersocket.addProduct(obj)
            const updateProducts = await pmanagersocket.getProducts()
            socket.emit("sendproducts", updateProducts)
        });
    });
};

export default productEvents;