import mongoose from 'mongoose';

const productInCartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: Number,
});

const cartSchema = new mongoose.Schema({
    products: [productInCartSchema],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
