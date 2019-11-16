const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const db = require('./ger_engine')


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/allArticle', db.getArticle)
// app.get('/recommendation/:user', db.runRecommendation, db.getArticle)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
