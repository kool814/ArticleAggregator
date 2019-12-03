// To run: `node test_ger.js`
<<<<<<< HEAD

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


=======
// write a query that gives proper structure for each like
// clear json file
// write to json
// pull from json
>>>>>>> 7fa0abd9671aaa5a92c9b5000086cc0ffd0c1865
var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm);
// var testObjects = require('./ger_test.json')

// temp_event = [{
//   "namespace": "newsletters",
//   "person": "chris",
//   "action": "likes",
//   "thing": "ben-thompson",
//   "expires_at": "2025-06-06"
// },
// {
//   "namespace": "newsletters",
//   "person": "chris",
//   "action": "likes",
//   "thing": "paul-krugman",
//   "expires_at": "2025-06-06"
// }]

ger.initialize_namespace('newsletters')
.then( function() {
  return ger.events(testObjects)
})
// .then(function() {
//   return ger.events(temp_event)
// })
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
