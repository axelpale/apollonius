# apollonius

This function finds a circle touching three known circles, known as [Apollonius' problem](https://en.wikipedia.org/wiki/Problem_of_Apollonius). In other words, it finds a circle that is *tangent to* each of the known three circles regardless of their positions, overlap, or radii.

Because a circle can be either internally or externally tangent to another circle, the problem of Apollonius has eight solutions, one for each combination of tangency rules of the three circles. The function here finds one solution at a time but can be used to find all eight.

The function is extremely efficient. It has time complexity of O(1) and does not call any trigonometric functions.

## Usage

Install via NPM or Yarn:

```
$ npm install apollonius
```

Specify your three known circles as `{ x, y, r }` objects, where `x` and `y` are the circle center coordinates and `r` is the radius. Then call the apollonius function with the circles. The order of the circles does not matter.

```
import 'apollonius'

// Prepare three known circles
const c1 = { x: 3, y: 2, r: 1 }
const c2 = { x: 7, y: 2, r: 2 }
const c3 = { x: 3, y: 5, r: 1 }

// Compute a fourth circle that touches the three.
const c = apollonius(c1, c2, c3)

// Result equals { x: 4.367544..., y: 3.5, r: 1.029822... }
```

The result is a circle object `{ x, y, r }`. By default, the resulting circle is **externally tangent** to each of the three given circles. To find a circle that is **internally tangent** to some of the circles, specify those circles with negative radius.

## License

The apollonius source code is released under [MIT](LICENSE) license.
