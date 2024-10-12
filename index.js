const defaultEpsilon = 0.0000000001 // precision from affineplane
const options = {
  epsilon: defaultEpsilon // keep epsilon modifiable
}

const bitangent = (c1, c2) => {
  // Find a circle that is externally tangent to the circles c1, c2.
  // If the circles overlap, will return a circle with radius 0.
  // If there is gap between the two circles, will return a circle with the diameter equal to the gap.
  // If the two circles are concentric and have equal radius,
  // will return a zero diameter circle at the shared circumference.
  // Else retuns null.
  //
  // Return:
  //   a circle2 or null
  //
  const dx = c2.x - c1.x
  const dy = c2.y - c1.y
  const d = Math.sqrt(dx * dx + dy * dy)
  const epsilon = options.epsilon

  if (d < epsilon) {
    // The circles are concentric.
    if (Math.abs(c1.r - c2.r) < epsilon) {
      // The circles share radius.
      const x = c1.x + c1.r
      const y = c1.y
      const r = 0
      return { x, y, r }
    }
    // Else the circles are nested
    return null
  }

  if (c1.r + c2.r <= d) {
    // There is a gap. We can find the target circle there.
    const gap = d - c1.r - c2.r
    const r = gap / 2
    const x = c1.x + (c1.r + r) * dx / d
    const y = c1.y + (c1.r + r) * dy / d
    return { x, y, r }
  }

  // No gap, only two intersecting points.
  // Solve in local coordinates where c1 = (0, 0, r1).
  const r1 = c1.r / d
  const r2 = c2.r / d
  const r12 = r1 + r2
  const dr12 = r2 - r1
  const xhat = (r1 * r1 - r2 * r2 + 1) / 2
  const yhat = Math.sqrt(-(dr12 - 1) * (dr12 + 1) * (r12 - 1) * (r12 + 1)) / 2
  const x = c1.x + xhat * dx - yhat * dy
  const y = c1.y + xhat * dy + yhat * dx
  const r = 0
  return { x, y, r }
}

const dependent = (c1, c2, c3) => {
  // The circle centers are linearly dependent.
  //
  // Parameters:
  //   c1
  //     a circle2
  //   c2
  //     a circle2
  //   c3
  //     a circle2
  //
  // Return:
  //   a circle2 or null
  //

  // Circle differences
  const dx12 = c2.x - c1.x
  const dx23 = c3.x - c2.x
  const dx31 = c1.x - c3.x
  const dy12 = c2.y - c1.y
  const dy23 = c3.y - c2.y
  const dy31 = c1.y - c3.y

  const epsilon = options.epsilon

  // First we handle the cases where the circle centers are equal.
  // In these case a solution can be found only when the radii of the circles are equal.
  if (Math.abs(dx12) + Math.abs(dy12) < epsilon) {
    if (Math.abs(c1.r - c2.r) < epsilon) {
      return bitangent(c3, c1)
    }
    return null
  } else if (Math.abs(dx23) + Math.abs(dy23) < epsilon) {
    if (Math.abs(c2.r - c3.r) < epsilon) {
      return bitangent(c1, c2)
    }
    return null
  } else if (Math.abs(dx31) + Math.abs(dy31) < epsilon) {
    if (Math.abs(c3.r - c1.r) < epsilon) {
      return bitangent(c2, c3)
    }
    return null
  }
  // We notice that the point c3 = c1 + b * v12.
  // Let solve the target circle center x,y first in normalized coordinates
  // where c1 is at origin and c2 at (1,0).
  let b = 0
  if (Math.abs(dx12) >= epsilon) {
    b = -dx31 / dx12
  } else if (Math.abs(dy12) >= epsilon) {
    b = -dy31 / dy12
  } else {
    // Points likely the same.
    return null
  }
  // Radii too must be mapped to this normalized scale.
  const scale2 = 1 / (dx12 * dx12 + dy12 * dy12)
  const scale = Math.sqrt(scale2)
  // Radius differences:
  const dr12 = (c2.r - c1.r) * scale
  const dr23 = (c3.r - c2.r) * scale
  const dr31 = (c1.r - c3.r) * scale
  // Denominator
  const D = -2 * (b * dr12 + dr31)
  // Special case: denominator zero. Maybe equal radius => infinite target circle radius.
  if (Math.abs(D) < epsilon) return null
  // Radii squared
  const rr1 = c1.r * c1.r * scale2
  const rr2 = c2.r * c2.r * scale2
  const rr3 = c3.r * c3.r * scale2
  // Discriminant for coordinate Y
  let disc = -(dr12 - 1) * (dr12 + 1) * (dr31 - b) * (dr31 + b) * (dr23 - b + 1) * (dr23 + b - 1)
  // Special case: discriminant is negative
  if (Math.abs(disc) < epsilon) disc = 0
  if (disc < 0) return null
  // Normalized coordinates
  const bb = b * b
  const xhat = (rr1 * dr23 + rr2 * dr31 + rr3 * dr12 - bb * dr12 - dr31) / D
  const yhat = Math.sqrt(disc) / D
  const rhat = -(rr3 - b * rr2 + (b - 1) * rr1 - bb + b) / D
  // Map to global coordinates
  const x = c1.x + xhat * dx12 - yhat * dy12
  const y = c1.y + xhat * dy12 + yhat * dx12
  const r = rhat / scale
  return { x, y, r }
}

function apollonius (c1, c2, c3) {
  // Find a circle that is externally tangent to the three circles c1,c2,c3.
  // If no such circle exists on the real plane, return null.
  // The result is one of the solutions to the problem of Apollonius.
  //
  // Parameters:
  //   c1
  //     a circle2
  //   c2
  //     a circle2
  //   c3
  //     a circle2
  //
  // Return:
  //   a circle2 or null
  //
  const epsilon = options.epsilon

  // Circle differences
  const dx12 = c2.x - c1.x
  const dx23 = c3.x - c2.x
  const dx31 = c1.x - c3.x
  const dy12 = c2.y - c1.y
  const dy23 = c3.y - c2.y
  const dy31 = c1.y - c3.y
  // If the vector between circles are linearly dependent i.e. their centers are along the same line,
  // we cannot solve the circle with the common method. We need to check their independency.
  // For a triangle of vectors, it is enough to check independecy of any two vectors.
  const det123 = dx12 * dy23 - dx23 * dy12
  if (Math.abs(det123) < epsilon) {
    // The circle centers are linearly dependent. We solve this separately.
    return dependent(c1, c2, c3)
  }
  // Circle expressions of form x^2 + y^2 - r^2
  const g1 = c1.x * c1.x + c1.y * c1.y - c1.r * c1.r
  const g2 = c2.x * c2.x + c2.y * c2.y - c2.r * c2.r
  const g3 = c3.x * c3.x + c3.y * c3.y - c3.r * c3.r
  // Coefficients for the coordinates x=(a+b*r)/D, y=(c+d*r)/D
  // Determinant (denominator)
  const D = 2 * (c1.y * dx23 + c2.y * dx31 + c3.y * dx12)
  // Special case: determinant is zero.
  if (Math.abs(D) < epsilon) return null
  const a = -(dy23 * g1 + dy31 * g2 + dy12 * g3)
  const b = 2 * (c1.r * dy23 + c2.r * dy31 + c3.r * dy12)
  const c = dx23 * g1 + dx31 * g2 + dx12 * g3
  const d = -2 * (c1.r * dx23 + c2.r * dx31 + c3.r * dx12)
  // We solve r via a quadratic formula r=(-Q±sqrt(Q^2-P*R))/P
  // We use c1 as an anchor.
  const dx = D * c1.x - a
  const dy = D * c1.y - c
  const dr = D * c1.r
  // Coefficients
  const P = b * b + d * d - D * D
  const Q = b * dx + d * dy + D * dr
  const R = dx * dx + dy * dy - dr * dr
  // Special case: quadratic formula denominator is zero.
  if (Math.abs(P) < epsilon) return null
  // Discriminant
  let disc = Q * Q - P * R
  // Special case: discriminant is negative. Deal with floating point issues.
  if (Math.abs(disc) < epsilon) disc = 0
  if (disc < 0) return null
  // Find the target radius
  const r = (Q - Math.sqrt(disc)) / P
  // Find the target circle center
  const x = (a + b * r) / D
  const y = (c + d * r) / D
  // Return the circle
  return { x, y, r }
};

export { apollonius, options }
export default apollonius
