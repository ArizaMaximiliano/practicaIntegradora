import Cart from '../models/cartModel.js';

export default class CartManager {

    static async createCart(cart) {
        try {
            const newCart = new Cart({ products: [] });

            await newCart.save();

            return newCart;
        } catch (error) {
            throw error;
        }
    }

    static async getCart(cartId) {
        try {
            const cart = await Cart.findById(cartId);
            return cart;
        } catch (error) {
            throw error;
        }
    }

    static async addProductCart(cartId, productId, quantity) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const existingProduct = cart.products.find((product) => product.product.equals(productId));

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            await cart.save();
        } catch (error) {
            throw error;
        }
    }

    static async existsFile(path) {
        try {
            await fs.promises.access(path);
            return true;
        } catch (error) {
            return false;
        }
    }
}
