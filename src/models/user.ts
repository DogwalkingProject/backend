import { DataTypes, Model } from "sequelize";
import { sqlClient } from ".";

class User extends Model { }

User.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
    },
    username: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING, 
        allowNull: false 
    },
    address: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    pets: {
        type: DataTypes.ARRAY(DataTypes.UUID), 
        allowNull: true
    }
}, {sequelize: sqlClient, modelName: 'User'})

export default User; 