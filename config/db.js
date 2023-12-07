require('dotenv').config()
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(process.env.DB,process.env.ROOT,process.env.PW,{
	host:process.env.HOST,
	dialect:'mysql'
})

sequelize.authenticate().then(()=>console.log('database is authenticated'))
.catch((err)=>console.log('database not yet authenticated',err))

module.exports = sequelize