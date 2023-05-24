import { DataTypes, Model } from "sequelize";
import { sqlClient } from ".";

class Pet extends Model { }

Pet.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    petName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: true
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { sequelize: sqlClient, modelName: 'Pet' })

export default Pet; 