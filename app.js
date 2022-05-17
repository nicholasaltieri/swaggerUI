const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json')

const port = process.env.PORT || 3000

var restaurants = [{id:0, name:"Woodshill"}, {id:1, name:"Painters"}]

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/restaurants', (req, res) => {
    res.send(restaurants)
})

app.post('/restaurant', (req, res) => {
    restaurants.push({id: req.body.id, name:req.body.name})
    res.send(`${JSON.stringify(restaurants)} created.`)
});

app.delete("/restaurant/:id", (req,res)=>{
    console.log('delete:id:'+req.params.id)
    restaurants = restaurants.filter(item=> item.id != req.params.id)
    res.send("restaurants left:"+JSON.stringify(restaurants));
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})