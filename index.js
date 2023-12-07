const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/things',require('./routes/routes'))

if(process.env.PROD_ENV === 'production'){
	app.use(express.static('client/build'))
	const path = require('path')
	app.use('*',(req,res)=>{
		res.sendFile(path.resolve('client','build','index.html'))
	})
}

const PORT = process.env.PORT || 8700;

app.listen(PORT,()=>console.log(`live on port ${PORT}`))