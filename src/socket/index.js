import chatEvents from "./chat.js";
import productEvents from "./products.js";

const init = (socketServer) => {
    chatEvents(socketServer);
    productEvents(socketServer);
};

export default init;