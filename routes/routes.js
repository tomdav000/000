const express = require('express')
const Promotion = require('../models/Promotion')
const Wrestler = require('../models/Wrestler')
const sequelize = require('../config/db')
const router = express.Router()

Promotion.hasMany(Wrestler,{as:'wrestlers'})
Wrestler.belongsTo(Promotion)

sequelize.sync({alter:true}).then(()=>console.log('N*Sync'))
.catch((err)=>console.log('not syncing',err))

//Routes Promo//
router.get('/test',(req,res)=>{
	res.send('Hello World Folks')
})

router.get('/',async(req,res)=>{
	try{
		const promos = await Promotion.findAll({include:'wrestlers'})
		res.send(promos)
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})

router.get('/:id',async(req,res)=>{
	try{
		const promo = await Promotion.findByPk(req.params.id,{include:'wrestlers'})
		res.send(promo)
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})

router.put('/:id',async(req,res)=>{
	try{
		const promo = await Promotion.findByPk(req.params.id)
		if(promo){
			promo.name = req.body.name;
			promo.hometown = req.body.hometown;
			await promo.save()
			res.redirect('/api/things')
		}
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})

router.post('/',async(req,res)=>{
	try{
		const newProm = {
			name: req.body.name,
			hometown: req.body.hometown
		}
		const promo = await Promotion.create(newProm)
		console.log(promo)
		res.redirect('/api/things')
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})

router.delete('/:id',async(req,res)=>{
	try{
		const promo = await Promotion.findByPk(req.params.id)
		if(promo){
			await promo.destroy()
			res.redirect('/api/things')
		}
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})
//End Promo//

//Wrs routes//
router.get('/:id/wrestlers',async(req,res)=>{
	try{
		const promos = await Wrestler.findAll({where:{PromotionId:  req.params.id}})
		res.send(promos)
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})

router.get('/:id/wrestlers/:id',async(req,res)=>{
	try{
		const promo = await Wrestler.findByPk(req.params.id,{where:{PromotionId: req.params.id}})
		res.send(promo)
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})

router.put('/:id/wrestlers/:id',async(req,res)=>{
	try{
		const wrestler = await Wrestler.findByPk(req.params.id)
		if(wrestler){
			wrestler.name = req.body.name;
			wrestler.finisher = req.body.finisher;
			wrestler.status = req.body.status;
			wrestler.PromotionId = wrestler.PromotionId;
			await wrestler.save()
			res.redirect('/api/things')
		}
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})

router.post('/:id/wrestlers',async(req,res)=>{
	try{
		const newWrestler = {
			name: req.body.name,
			finisher: req.body.finisher,
			status: req.body.status,
			PromotionId: req.params.id
		}
		const promo = await Wrestler.create(newWrestler)
		console.log(promo)
		res.redirect('/api/things')
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})

router.delete('/:id/wrestlers/:id',async(req,res)=>{
	try{
		const promo = await Wrestler.findByPk(req.params.id)
		if(promo){
			await promo.destroy()
			res.redirect('/api/things')
		}
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})
//End Wrs//

module.exports = router