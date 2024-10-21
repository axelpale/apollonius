# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [1.2.1] - 2024-10-21

### Added

- More documentation on special cases (#8)
- Add a link to the demo (#4)
- More tests
- More package keywords

### Changed

- Improved introduction
- Improved installation docs
- Improved API docs

### Fixed

- Repair demo interaction precedence when dragging overlapping circles (#9)


## [1.2.0] - 2024-10-18

### Added

- Add UMD bundle that is distributed via GitHub Releases and Unpkg.com (#7)
- Add documentation section for project acknowledgements.
- Add documentation for the supported module formats (#5)

### Changed

- CommonJS module is now relocated under dist/ (#6)

### Fixed

- correct circle draw order in demo.html
- correct package.json properties for CommonJS support (#6)


## [1.1.0] - 2024-10-13

### Added

- include package-lock.json in the NPM package. (#3)
- add Actions workflow and a badge for it.
- write CHANGELOG.md (#2)

### Fixed

- detect invalid circles and circle properties (#1)


## [1.0.0] - 2024-10-12

### Added

- Support CommonJS via rollup and package.json `exports.require`

### Changed

- *Breaking:* ES6 module syntax with named exports replaces the callable `module.exports`.
- improve documentation (#6)

### Migration Tips

The module root is now an object instead of a function. Therefore if you previously `const apollonius = require('apollonius')` and then `const c = apollonius(c1, c2, c3)` then just switch to `const c = apollonius.solve(c1, c2, c3)`.


## [0.3.0] - 2024-10-12

### Added

- test suite
- TypeScript type declaration


## [0.2.0] - 2024-10-07

### Added

- improved documentation with illustrations


## [0.1.0] - 2024-10-02

### Added

- migrate `apollonius` function from [affineplane-circlepack](https://github.com/axelpale/affineplane-circlepack)
- minimal documentation
