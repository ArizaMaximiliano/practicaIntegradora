import Product from '../models/productModel.js';

export default class ProductManager {

    static async addProduct(product) {
        try {
            const { title, description, code, price, status, stock, category, thumbnail } = product;

            if (!title || !description || !code || !price || !status || !category) {
                throw new Error('Todos los campos son obligatorios.');
            }

            const newProduct = new Product({
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail,
            });

            await newProduct.save();

            console.warn('Producto agregado correctamente.');

            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    static async getProduct() {
        try {
            const products = await Product.find().lean();
            return products;
        } catch (error) {
            throw error;
        }
    }

    static async getProductByID(id) {
        try {
            const product = await Product.findById(id);
            if (product) {
                console.warn(`Producto con el ID (${id}) encontrado:`);
                return product;
            } else {
                console.error(`Error: ID (${id}) no existente.`);
            }
        } catch (error) {
            throw error;
        }
    }

    static async updateProduct(id, updatedProduct) {
        try {
            const product = await Product.findById(id);
            if (!product) {
                console.error(`Error: Producto con ID (${id}) no encontrado.`);
                return;
            }

            const { title, description, code, price, status, stock, category, thumbnail } = updatedProduct;

            if (!title || !description || !code || !price || !status || !category) {
                console.error('Todos los campos son obligatorios.');
                return;
            }

            product.title = title;
            product.description = description;
            product.code = code;
            product.price = price;
            product.status = status;
            product.stock = stock;
            product.category = category;
            product.thumbnail = thumbnail;

            await product.save();

            console.warn(`Producto con ID (${id}) actualizado correctamente.`, product);
        } catch (error) {
            throw error;
        }
    }

    static async deleteProduct(id) {
        try {
            const product = await Product.findById(id);
            if (!product) {
                console.error(`Error: Producto con ID (${id}) no encontrado.`);
                return;
            }

            await product.remove();

            console.warn(`Producto con ID (${id}) eliminado correctamente.`);
        } catch (error) {
            throw error;
        }
    }
}

