import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    products: [
        {
            id: String,
            quantity: Number,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
        },
    ],
    default: [],
})

const cartModel = mongoose.model(cartCollection, cartSchema);

export { cartModel };