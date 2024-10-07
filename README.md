# apollonius

![Figure: Tangent Circles](doc/example.png "Find a circle that is tangent to three others.")

[![npm version](https://img.shields.io/npm/v/apollonius?color=green)](https://www.npmjs.com/package/apollonius)
[![license](https://img.shields.io/npm/l/apollonius)](#license)

The `apollonius` function finds a circle that touches three known circles. The resulting circle is a solution to the [Problem of Apollonius](https://en.wikipedia.org/wiki/Problem_of_Apollonius). In other words, it finds a circle that is *tangent to* each of the known three circles if such a circle exists and it usually does. The three known circles can be placed freely and are allowed to overlap each other.

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

// Prepare three known circles.
const c1 = { x: 3, y: 2, r: 1 }
const c2 = { x: 7, y: 2, r: 2 }
const c3 = { x: 3, y: 5, r: 1 }

// Compute a fourth circle that touches the three.
const c = apollonius(c1, c2, c3)

// Result equals { x: 4.367544..., y: 3.5, r: 1.029822... }
```

The result is a circle object `{ x, y, r }`. By default, the resulting circle is **externally tangent** to each of the three given circles. To find a circle that is **internally tangent** to some of the circles, specify those circles with negative radius. See below for an example.

```
// Prepare circles.
const c1 = { x: 3, y: 2, r: -1 }  // r < 0, thus internally tangent
const c2 = { x: 7, y: 2, r: 2 }   // r > 0, thus externally tangent
const c3 = { x: 3, y: 5, r: -1 }  // r < 0, thus internally tangent

// Compute the fourth circle.
const c = apollonius(c1, c2, c3)

// Result equals { x: 2.732213..., y: 3.5, r: 2.523715... }
```

The code above is illustrated below:

![Figure: Internally Tangent Circles](doc/example_internal.png "The result circle must be internally tangent to the circles 1 and 3 and externally tangent to the circle 2.")

The resulting circle is internally tangent to the known circles `c1` and `c3` and externally tangent to the known circle `c2`. Note that while the known circles can have negative radii, the output circle always has positive or zero radius.


## Special cases

The fourth circle cannot be found for some configurations of known circles. These configurations may appear when there are:

- **nested circles:** a circle cannot be internally or externally tangent two or more nested circles at the same time.
- **identical circles along a line:** when three same-size circles are arranged along a straight line, the radius of the tangent circle would go to infinity.

If the fourth circle cannot be found, the function will return `null`.


## License

The apollonius source code is released under [MIT](LICENSE) license.
