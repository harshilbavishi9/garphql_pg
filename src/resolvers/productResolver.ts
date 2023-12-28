import { Product } from "../model/productModel";
import ProductServices from "../services/prodcutServices";
import { ErrorHandler } from "../utils/errorHandler";
import { productInterface } from "../utils/interface";

const resolvers = {
    Query: {
        hello: () => 'Hello, World!',

        viewSingleProduct: async (_: any, { id }: { id: string }) => {
            try {
                let findProduct = await Product.findByPk(id)
                if (!findProduct) {
                    throw ErrorHandler.custom('Product can not Found', 400)
                }
                return findProduct
            } catch (error: any) {
                throw ErrorHandler.handle(error);
            }
        },

        viewAllProducts: async () => {
            try {
                let findProducts = await ProductServices.viewAllProducts();
                if (!findProducts) throw ErrorHandler.custom("Product is not found", 400)
                let dataArray = findProducts.map(element => element.dataValues);
                return dataArray;
            } catch (error: any) {
                throw ErrorHandler.handle(error);
            }
        }
    },
    Mutation: {
        createProduct: async (_: any, { input }: { input: productInterface }) => {
            try {
                const result = await ProductServices.createProduct(input);
                return result;
            } catch (error: any) {
                throw ErrorHandler.handle(error);
            }
        },

        updateProduct: async (_: any, { id, input }: { id: any, input: any }) => {
            try {
                const existingProduct = await Product.findByPk(id);
                if (!existingProduct) {
                    throw new Error('Product not found');
                }

                await Product.update(input, {
                    where: { id },
                });

                const updatedProduct = await Product.findByPk(id);

                return updatedProduct;
            } catch (error: any) {
                throw ErrorHandler.handle(error);
            }
        },

        deleteProduct: async (_: any, { id }: { id: string }) => {
            try {
                const deletedProduct = await ProductServices.deleteProduct({ id });
                if (!deletedProduct) {
                    throw ErrorHandler.custom('Product cannot be deleted', 400);
                }
                return 'Product deleted successfully'
            } catch (error: any) {
                throw ErrorHandler.handle(error);
            }
        }
    },
};

export default resolvers;
