const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cakes = require('./data.json')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.json({cakes: cakes})
})

app.get('/cakes/:id', (req, res, next) => {
    const id = req.params.id
    if (!(Number(id))){
        next()
    }
    const cake = cakes.filter(item => item.id == id)[0]
    res.json({cake: cakes})
})

app.listen(port, () => console.log(`I got you on ${port}`))