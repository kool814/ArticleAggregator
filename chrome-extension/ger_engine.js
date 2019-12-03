// To run: `node test_ger.js`
// write a query that gives proper structure for each like
// clear json file
// write to json
// pull from json
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
