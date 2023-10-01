import fs from "fs"

export default class ProductManager {

    constructor() {
        this.products = [];
        this.path = './products.json';
    }

    async getId() {
        let data = await this.getProducts();
        return data.length + 1;
    }

    async addProduct(title, description, category, price, thumbnail, code, stock, status) {
        const newProduct = {
            title,
            description,
            category,
            price,
            thumbnail,
            code,
            stock,
            status,
        };

        try {
            if (!fs.existsSync(this.path)) {
                const newList = [];
                newList.push({ ...newProduct, id: await this.getId() });

                await fs.promises.writeFile(this.path, JSON.stringify(newList, null, '\t'))

            } else {
                const data = await this.getProducts();
                const repeatCode = this.products.some(e => e.code == newProduct.code)
                repeatCode == true ? console.log("El codigo esta repetido") : data.push({ ...newProduct, id: await this.getId()});
                await fs.promises.writeFile(
                this.path, 
                JSON.stringify(data, null, '\t'));

            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProducts(id) {
        const product = await this.getProducts()
        const productNoId = product.filter((producto) => producto.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(productNoId, null, '\t'));
    }


    async getProducts() {
        const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
        return data;
    }

    async getProductsById(id) {
        let data = await this.getProducts()
        let productFind = data.find(e => e.id == id)
        return productFind === undefined ? console.log("Not found") : productFind
    }

    async updateProducts(id, product) {
        let data = await this.getProducts()
        let i = data.findIndex(e => e.id === id)
        product.id = id
        data.splice(i, 1, product)
        await fs.promises.writeFile(this.path, JSON.stringify(data))

    }
}