require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const movie = require('./movies-data')
const cors = require('cors')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(function validateBearerToken(req, res, next) {
    const bearerToken = req.get('Authorization').split(' ')[1]
    const apiToken = process.env.API_TOKEN
    console.log(apiToken, "=", bearerToken)
    if (apiToken == bearerToken) {
        next()
    } else {
        return res.status(401).send('Token Not Valid!')
    }
})


app.get('/movie', (req, res) => {
    const {genre, country, avg_vote} = req.query;
    let data = movie;
    if(genre) {
        data = data.filter(a => a.genre.toLowerCase() == genre.toLowerCase()) 
    }
    if(country) {
        data = data.filter(a => a.country.toLowerCase() == country.toLowerCase())
    }
    if(avg_vote) {
        data = data.filter(a => a.avg_vote >= avg_vote)
    }
    res.json(data)
})


const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})