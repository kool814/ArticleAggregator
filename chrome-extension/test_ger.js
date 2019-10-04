// To run: `node test_ger.js`

var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm);

ger.initialize_namespace('newsletters')
.then( function() {
  return ger.events([
    {
      namespace: 'newsletters',
      person: 'bob',
      action: 'likes',
      thing: 'paul-krugman',
      expires_at: '2025-06-06'
    },
    {
      namespace: 'newsletters',
      person: 'bob',
      action: 'likes',
      thing: 'theSkimm',
      expires_at: '2025-06-06'
    },
    {
      namespace: 'newsletters',
      person: 'alice',
      action: 'likes',
      thing: 'paul-krugman',
      expires_at: '2025-06-06'
    },
    {
      namespace: 'newsletters',
      person: 'dave',
      action: 'dislikes',
      thing: 'paul-krugman',
      expires_at: '2025-06-06'
    },
    {
      namespace: 'newsletters',
      person: 'dave',
      action: 'likes',
      thing: 'accelerated',
      expires_at: '2025-06-06'
    },
    {
      namespace: 'newsletters',
      person: 'kyle',
      action: 'likes',
      thing: 'paul-krugman',
      expires_at: '2025-06-06'
    },
    {
      namespace: 'newsletters',
      person: 'kyle',
      action: 'likes',
      thing: 'accelerated',
      expires_at: '2025-06-06'
    },
  ])
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