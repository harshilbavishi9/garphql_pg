// user.model.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/pg";
import { Product } from './productModel'; 

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public phone!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user'
    }
);

// Define the association - User has many Products
User.hasMany(Product, {
    foreignKey: 'userId', // This should match the field name in the Product model that associates with the User
    as: 'products', // This alias is optional, but it makes it easier to access the associated products
});

export { User };
