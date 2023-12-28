import { Optional, WhereOptions } from "sequelize";
import { User } from "../model/userModel";
import { UserInterface } from "../utils/interface";

class UserServices {
    constructor() { }

    static async createUser(input: Optional<UserInterface, any> | undefined) {
        return User.create(input);
    }

    static async findOneUser(query: WhereOptions) {
        return User.findOne({ where: query });
    }

    static async findUser(query: WhereOptions) {
        return User.findAll({ where: query });
    }

    static async findAllUser() {
        return User.findAll();
    }

    static async deleteUser(query: WhereOptions) {
        return User.destroy({ where: query });
    }

    static async updateUser(query: WhereOptions, update: UserInterface) {
        await User.update(update, { where: query });
        return User.findOne({ where: query });
    }
}

export default UserServices;
