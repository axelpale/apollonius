const apollonius = require('../index.cjs').default

const c1 = { x: 1, y: 2, r: 1 }
const c2 = { x: 3, y: 2, r: 1 }
const c3 = { x: 2, y: 5, r: 2 }

const c = apollonius(c1, c2, c3)

console.log('success', c)
process.exit()
