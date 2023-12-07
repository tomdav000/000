const {Sequelize,DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const Promotion = sequelize.define('Promotion',{
	name:{
		type: DataTypes.STRING
	},
	hometown:{
		type: DataTypes.STRING
	}
})

module.exports = Promotion;