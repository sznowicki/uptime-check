# Changelog

## v4.1.0
### Dependency removed
- Removed `header-parse` unused dependency.

### Cleanups
- Documentation updated along with types defined index.d.ts.
- Introduce [.npmignore](./.npmignore) which decreases package size from 145.3 kB to 10 kB

## v4.0.0
### BREAKING CHANGE
- Removed `userAgent` option in favor of `headers`. Please check [migration notes](./README.md#v4-migration).

## v3.2.0
### Documentation
- Added index.d.ts (thank you https://github.com/lil5)

## v3.1.0
### Changed
- Updated dependencies.

## v3.0.0
### Breaking changes
- A node-libcurl package is no longer being used in favor of `got`. This might lead to slightly different performance.
- Removed following properties from result: `nameLookupTime`, `connectTime`, `preTransferTime`, `startTransferTime`, `response`, `headerSize`, `header`, `headersParsed`
- Added `headers` property to result which now contains parsed headers object.

## v2.0.1
### Dependency updates
- node-libcurl update to v.2.1.1+

## v2.0.0
### Dependency updates (breaking changes)
- node-libcurl is updated to v2.1+ which contains some breaking changes e.x. dropped support for Node.js 4 and 6

## v1.2.2
### Dependency updates
- updated `node-libcurl` to 1.2.0 with exact version since newer has no release builds yet which makes the installation longer
