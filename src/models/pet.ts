import { DataTypes, Model } from "sequelize";
import { sqlClient } from ".";

class Pet extends Model { }

Pet.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
    },
    petName: {
        type: DataTypes.STRING
    },
    weight: {
        type: DataTypes.INTEGER
    }, 
    breed: {
        type: DataTypes.STRING
    }, 
    note: {
        type: DataTypes.STRING
    }
}, {sequelize: sqlClient, modelName: 'Pet'})
   
export default Pet; 