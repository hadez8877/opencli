# opencli-scripts

## 1.0.0

### Major Changes

- [#76](https://github.com/hadez8877/opencli/pull/76) [`d3354a2`](https://github.com/hadez8877/opencli/commit/d3354a2fbd2bd9c20c663b6b3691168cd09c857f) Thanks [@hadez8877](https://github.com/hadez8877)! - Removes the `sort-labels` command and turbo package generators

  The `sort-labels` subcommand is no longer available. If you relied on `opencli-scripts sort-labels` to sort GitHub labels, migrate to an alternative YAML sorting tool.

  Turbo generators (`opencli-scripts create-package`) have been removed along with all package scaffolding templates. This includes the `@turbo/gen` dependency and `.hbs` template files for generating new packages, labels, and labeler configurations.

  Adds `build` and `dev` commands that use esbuild for building the monorepo.

## 0.2.0

### Minor Changes

- [`8d9d831`](https://github.com/hadez8877/opencli/commit/8d9d831fdefd80b6a1366d1988daaf31203a1bec) Thanks [@hadez8877](https://github.com/hadez8877)! - Rewrites the package from TypeScript to plain JavaScript for faster startup and lower maintenance overhead

## 0.1.0

### Patch Changes

- [#54](https://github.com/hadez8877/opencli/pull/54) [`ccc9742`](https://github.com/hadez8877/opencli/commit/ccc9742cfafab7c56f1e3ff50afa24de98b3f0eb) Thanks [@hadez8877](https://github.com/hadez8877)! - Initial release of the `opencli-scripts` package, providing shared scripts and utilities for the opencli monorepo workflows.
