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
    res.json({cake: cake})
})
app.post('/', (req, res, next) =>{
    const body = req.body
    cakes.push(body)
    res.json({cakes: cakes})
})

app.use(notFound)
app.use(errorHandler)

function notFound(req, res, next) {
    res.status(404).send({error: 'Not found!', status: 404, url: req.originalUrl})
}

function errorHandler(err, req, res, next) {
    console.error('ERROR', err)
    const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
    res.status(500).send({error: err.message, stack, url: req.originalUrl})
}

app.listen(port, () => console.log(`I got you on ${port}`))