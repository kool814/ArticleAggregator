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

var testObjects = require('./ger_test.json')

function createJson(sqlQuery, likeOrDislike) {
  var jsonData = [];
  var i;
  for(i = 0; i < sqlQuery.length; i++){
    jsonData.push({
      "namespace": "newsletters",
      "person": sqlQuery[i]['name'],
      "action": likeOrDislike,
      "thing": sqlQuery[i]['author'],
      "expires_at": "2025-06-06"
    });
  }
  return jsonData
}

const getArticle = (request, response) => {
  pool.query('\
      SELECT author, person.name FROM article, likes, person\
      WHERE article.article_id = likes.article_id and \
      likes.person_id = person.person_id\
      ', 
    (error, results) => {
    if (error) {
      throw error
    }
    testObjects = createJson(results.rows, "likes")
    response.status(200).json(testObjects)
    // console.log("response=", response)
  })
}


module.exports = {
  getArticle,
}


var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm);

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
// .then( function() {
//   // What newsletters are similar to paul-krugman's?
//   return ger.recommendations_for_thing('newsletters', 'paul-krugman', {actions: {likes: 1}})
// })
// .then( function(recommendations) {
//   console.log("\nRecommendations Like 'paul-krugman'")
//   console.log(JSON.stringify(recommendations, null, 2))
// })
