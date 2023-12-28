

import { Optional, WhereOptions } from 'sequelize';
import { Product } from '../model/productModel';

class ProductServices {
    static async createProduct(input: Optional<any, any>) {
        return Product.create(input);
    }

    static async viewSingleProduct(query: WhereOptions) {
        return Product.findOne({ where: query });
    }

    static async viewAllProducts() {
        return Product.findAll();
    }

    static async deleteProduct(query: WhereOptions) {
        return Product.destroy({ where: query });
    }

    static async updateProduct(update: any, query: WhereOptions) {
        await Product.update(update, { where: query });
        return Product.findOne({ where: query });
    }
}

export default ProductServices;