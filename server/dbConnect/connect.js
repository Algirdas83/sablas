
import mysql from 'mysql2/promise'
import Sequelize from 'sequelize'
import Post2 from '../model/post.js'
import Users from '../model/users.js'


const dataBa = {}

 const dataBaseTemp = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog2'
}



 try {
    
    // Creating mysqul data base connection
       const connection = await mysql.createConnection({

    host:dataBaseTemp.host,
    user:dataBaseTemp.user,
    password: dataBaseTemp.password,
   
   
    
})
//Linas apacioje skirtas jei norime ir data base skurti iskarto prie lenteliu
await connection.query('CREATE DATABASE IF NOT EXISTS ' + dataBaseTemp.database)

const sequelize = new Sequelize(dataBaseTemp.database, dataBaseTemp.user, dataBaseTemp.password,{
    dialect: 'mysql'
} )
//Sequelize conection test
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }


dataBa.Post2 = Post2(sequelize)
dataBa.Users = Users(sequelize)


  dataBa.Users.hasMany(dataBa.Post2, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
 dataBa.Post2.belongsTo(dataBa.Users)

await sequelize.sync({ alter: false });

} catch (error) {

    console.log(error)
    console.log('Nepavyko su duombaze pacanai');
    
}


export default  dataBa
