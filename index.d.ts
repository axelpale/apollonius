// Type definitions of apollonius library
// Definitions by: Akseli Palén <akseli.palen@gmail.com>
//

interface Circle2 {
  x: number;
  y: number;
  r: number;
}

declare function apollonius(c1: Circle2, c2: Circle2, c3: Circle2): Circle2 | null;

export = apollonius;
