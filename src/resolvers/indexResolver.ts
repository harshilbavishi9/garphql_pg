import { User } from "../model/userModel";
import UserServices from "../services/userServices";
import { ErrorHandler } from "../utils/errorHandler";
import { UserInterface } from "../utils/interface";

const resolvers = {
    Query: {
        hello: () => 'Hello, World!',

        viewSingleUser: async (_: any, { id }: { id: string }) => {
            try {
                let findUser = await User.findByPk(id)
                if (!findUser) {
                    throw ErrorHandler.custom('User can not Found', 400)
                }
                return findUser
            } catch (error: any) {
                throw ErrorHandler.handle(error);
            }
        },

        viewAllUser: async () => {
            try {
                let findUsers = await UserServices.findAllUser();
                if (!findUsers) throw ErrorHandler.custom("user is not found", 400)
                let dataArray = findUsers.map(element => element.dataValues);
                return dataArray;
            } catch (error: any) {
                throw ErrorHandler.handle(error);
            }
        }
    },
    Mutation: {
        createUser: async (_: any, { input }: { input: UserInterface }) => {
            try {
                const result = await UserServices.createUser(input);
                return result;
            } catch (error: any) {
                throw ErrorHandler.handle(error);
            }
        },

        updateUser: async (_: any, { id, input }: { id: any, input: any }) => {
            try {
                const existingUser = await User.findByPk(id);
                if (!existingUser) {
                    throw new Error('User not found');
                }

                await User.update(input, {
                    where: { id },
                });

                const updatedUser = await User.findByPk(id);

                return updatedUser;
            } catch (error: any) {
                throw ErrorHandler.handle(error);
            }
        },

        deleteUser: async (_: any, { id }: { id: string }) => {
            try {
                const deletedUser = await UserServices.deleteUser({ id });
                if (!deletedUser) {
                    throw ErrorHandler.custom('User cannot be deleted', 400);
                }
                return 'user deleted successfully'
            } catch (error: any) {
                throw ErrorHandler.handle(error);
            }
        }
    },
};

export default resolvers;
