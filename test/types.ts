// Test TypeScript type declarations compatibilty.
import apollonius from "../index.js"

const c1 = { x: 1, y: 2, r: 1 }
const c2 = { x: 3, y: 2, r: 1 }
const c3 = { x: 3, y: 4, r: 1 }

const c = apollonius(c1, c2, c3)

console.log(c)
