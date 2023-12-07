const {Sequelize,DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const Wrestler = sequelize.define('Wrestler',{
	name:{
		type: DataTypes.STRING
	},
	finisher:{
		type: DataTypes.STRING
	},
	status:{
		type: DataTypes.STRING
	}
})

module.exports = Wrestler;