// Test TypeScript type declarations compatibilty.
import { apollonius, options } from '../index.js'

const c1 = { x: 1, y: 2, r: 1 }
const c2 = { x: 3, y: 2, r: 1 }
const c3 = 'bad'

const c = apollonius(c1, c2, c3)

// options.epsilon = 'bad'

// console.log(c, options.epsilon)
