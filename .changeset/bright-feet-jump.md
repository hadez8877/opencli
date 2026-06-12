---
'opencli-scripts': major
---

Removes the `sort-labels` command and turbo package generators

The `sort-labels` subcommand is no longer available. If you relied on `opencli-scripts sort-labels` to sort GitHub labels, migrate to an alternative YAML sorting tool.

Turbo generators (`opencli-scripts create-package`) have been removed along with all package scaffolding templates. This includes the `@turbo/gen` dependency and `.hbs` template files for generating new packages, labels, and labeler configurations.

Adds `build` and `dev` commands that use esbuild for building the monorepo.
