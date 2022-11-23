import { DataTypes } from "sequelize"

// const sequelize = new Sequelize("sqlite::memory:")
// Modelio varijantas is sequelize puslapio

const Users = (sequelize) => {

    const Schema ={

        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull:false
        },
    
        email:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false
        },
        role:{
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue: 0
        }
       
    
    }


    return sequelize.define('users', Schema)
}
      
      


export default Users

