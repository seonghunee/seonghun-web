const db = require('../data/database');
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

class Product {
    constructor(title, imageName, summary, price, description) {
        this.title = title;
        this.image = imageName;
        this.summary = summary;
        this.price = +price;
        this.description = description;
        this.imagePath = `product-data/images/${this.image}`;
        this.imageUrl = `/product/assets/images/${this.image}`;
    }

    static async fetchAll() {
        const products = await db.getDb().collection('products').find().toArray();
        return products;
    }
    
    static async getProductOne(id) {
        const productId = new ObjectId(id);
        let product;
        try {
            product = await db.getDb().collection('products').findOne({_id: productId});
        } catch(error) {
            error.code = 404;
            throw error;
        }

        return product;
    }

    static async updateProduct(id, productDocument) {
        const productId = new ObjectId(id)
        await db.getDb().collection('products').updateOne({_id: productId}, {$set: productDocument});
        return;
    }
    
    static async deleteProduct(id) {
        const productId = new ObjectId(id);
        await db.getDb().collection('products').deleteOne({_id: productId});
        
        return;
    }

    async addNewProduct() {
        const newProduct = {
            title: this.title,
            image: this.image,
            summary: this.summary,
            price: this.price,
            description: this.description,
            imagePath: this.imagePath,
            imageUrl: this.imageUrl,
        }

        await db.getDb().collection('products').insertOne(newProduct);
    }
}

module.exports = Product;