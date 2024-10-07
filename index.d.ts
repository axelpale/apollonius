// Type definitions of apollonius library
// Definitions by: Akseli Palén <akseli.palen@gmail.com>
//
export = Apollonius;

declare function Apollonius(c1: Apollonius.Circle2, c2: Apollonius.Circle2, c3: Apollonius.Circle2): Apollonius.Circle2 | null;

declare namespace Apollonius {
  export interface Circle2 {
    x: number;
    y: number;
    r: number;
  }
}
