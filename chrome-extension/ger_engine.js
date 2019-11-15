// To run: `node test_ger.js`

// var pg = require('pg');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'karthiksuresh',
  host: 'localhost',
  database: 'articles',
  password: '',
  port: 5432,
})

const getArticle = (request, response) => {
  pool.query('SELECT * FROM article', (error, results) => {
    if (error) {
      throw error
    }
    console.log(JSON.stringify(results.rows, null, 2))
    response.status(200).json(results.rows)
  })
}


module.exports = {
  getArticle,
}

var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm);
var testObjects = require('./ger_test.json')

ger.initialize_namespace('newsletters')
.then( function() {
  return ger.events(testObjects)
})
.then( function() {
  // What things might alice like?
  return ger.recommendations_for_person('newsletters', 'alice', {actions: {likes: 1}})
})
.then( function(recommendations) {
  console.log("\nRecommendations For 'alice'")
  console.log(JSON.stringify(recommendations, null, 2))
})
.then( function() {
  // What things are similar to paul-krugman?
  return ger.recommendations_for_thing('newsletters', 'paul-krugman', {actions: {likes: 1}})
})
.then( function(recommendations) {
  console.log("\nRecommendations Like 'paul-krugman'")
  console.log(JSON.stringify(recommendations, null, 2))
})