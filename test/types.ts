// Test TypeScript type declarations compatibilty.
//
import { solve, options } from '../index.js'

const c1 = { x: 1, y: 2, r: 1 }
const c2 = { x: 3, y: 2, r: 1 }
const c3 = 'bad'

// @ts-expect-error
const c = solve(c1, c2, c3)

// @ts-expect-error
options.epsilon = 'bad'
