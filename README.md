# apollonius

Finds a fourth circle touching three given circles i.e. solves Apollonius' problem.

## Usage

```
// Prepare three known circles
const c1 = { x: 3, y: 2, r: 1 }
const c2 = { x: 7, y: 2, r: 2 }
const c3 = { x: 3, y: 5, r: 1 }
// Compute a fourth circle that touches the three.
const c = apollonius(c1, c2, c3)
// Result equals { x: 4.367544..., y: 3.5, r: 1.029822... }
```

## License

The apollonius source code is released under [MIT](LICENSE) license.
