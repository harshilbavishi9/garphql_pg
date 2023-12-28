// product.model.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/pg';
import { User } from './userModel'; // Import the User model

class Product extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public userId!: number;

}

Product.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: "id"
});

Product.init(
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
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
    }
);

export { Product };
