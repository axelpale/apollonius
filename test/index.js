import apollonius from '../index.js'
import test from 'tape'

test('basic apollonius', (t) => {
  // Trivial zero circles
  const c0 = apollonius({ x: 0, y: 0, r: 0 }, { x: 0, y: 0, r: 0 }, { x: 0, y: 0, r: 0 })
  t.deepEqual(c0, { x: 0, y: 0, r: 0 }, 'should handle zeros')

  // Basic
  const c1 = apollonius({ x: 0, y: 0, r: 2 }, { x: 9, y: -2, r: 3 }, { x: 6, y: 11, r: 5 })
  // Read rough limits from a drawing.
  t.ok(c1.r > 3, 'should be larger than three')
  t.ok(c1.r < 4, 'should be smaller than four')

  // The primary usage example in README
  const cex = apollonius({ x: 3, y: 2, r: 1 }, { x: 7, y: 2, r: 2 }, { x: 3, y: 5, r: 1 })
  t.ok(cex.x > 4.3, 'example circle x lower')
  t.ok(cex.x < 4.4, 'example circle x upper')
  t.ok(cex.y > 3.4, 'example circle y lower')
  t.ok(cex.y < 3.6, 'example circle y upper')
  t.ok(cex.r > 1.0, 'example circle r lower')
  t.ok(cex.r < 1.1, 'example circle r upper')

  // The usage example in README for internal tangency:
  const cin = apollonius({ x: 3, y: 2, r: -1 }, { x: 7, y: 2, r: 2 }, { x: 3, y: 5, r: -1 })
  t.ok(cin.x > 2.7, 'example circle x lower')
  t.ok(cin.x < 2.8, 'example circle x upper')
  t.ok(cin.y > 3.4, 'example circle y lower')
  t.ok(cin.y < 3.6, 'example circle y upper')
  t.ok(cin.r > 2.5, 'example circle r lower')
  t.ok(cin.r < 2.6, 'example circle r upper')

  // Two concentric zero circles with gap to a non-zero circle.
  const c2 = apollonius({ x: 0, y: 0, r: 0 }, { x: 0, y: 0, r: 0 }, { x: 6, y: 0, r: 2 })
  t.deepEqual(c2, { x: 2, y: 0, r: 2 }, 'should be half of the gap')

  // Concentric circles with non-zero radius.
  const c3 = apollonius({ x: 0, y: 0, r: 2 }, { x: 0, y: 0, r: 2 }, { x: 0, y: 0, r: 2 })
  t.deepEqual(c3, { x: 2, y: 0, r: 0 }, 'should find only zero radius')

  // Overlapping circles with no gap
  const r4 = apollonius({ x: 0, y: 0, r: 1 }, { x: 1, y: 0, r: 1 }, { x: 0.5, y: 1, r: 1 })
  t.ok(r4.r < 0, 'should find negative circle')

  t.end()
})

test('linearly dependent apollonius', (t) => {
  // Circle centers on the same horizontal line.
  const ch = apollonius({ x: 0, y: 0, r: 5 }, { x: 10, y: 0, r: 3 }, { x: 20, y: 0, r: 5 })
  // Read rough limits from a drawing.
  t.equal(ch.x, 10, 'should be horizontally centered')
  t.ok(ch.r > 20, 'should be larger than 20')
  t.ok(ch.r < 25, 'should be smaller than 25')

  // Circle centers on the same vertical line.
  const cv = apollonius({ x: 2, y: -10, r: 5 }, { x: 2, y: 0, r: 3 }, { x: 2, y: 10, r: 5 })
  // Read rough limits from a drawing.
  t.equal(cv.y, 0, 'should be vertically centered')
  t.ok(cv.r > 20, 'should be larger than 20')
  t.ok(cv.r < 25, 'should be smaller than 25')

  // Mixed order, horizontal line
  const cm = apollonius({ x: 20, y: 0, r: 5 }, { x: 0, y: 0, r: 5 }, { x: 10, y: 0, r: 3 })
  // Read rough limits from a drawing.
  t.deepEqual(cm, ch, 'should be equivalent to the first')

  t.end()
})
