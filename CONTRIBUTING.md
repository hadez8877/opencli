# Contributor Manual

Welcome, and thank you for considering contributing to OpenCLI! We’re excited to have you here. This guide covers everything you need to know to get started, from setting up the project to submitting your first contribution. Every contribution, big or small, helps improve OpenCLI for everyone.

> [!Tip]
>
> **For new contributors:** Take a look at [https://github.com/firstcontributions/first-contributions](https://github.com/firstcontributions/first-contributions) for helpful information on contributing

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Repository Setup](#repository-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
  - [Building](#building)
  - [Testing](#testing)
  - [Linting](#linting)
  - [Formatting](#formatting)
- [Making Changes](#making-changes)
  - [Branching Strategy](#branching-strategy)
  - [Commit Convention](#commit-convention)
  - [Changesets](#changesets)
- [Pull Requests](#pull-requests)
- [Release Process](#release-process)
- [Getting Help](#getting-help)

## Getting Started

### Prerequisites

```shell
node: "^>=22.12.0"
pnpm: "^11.1.3"
# otherwise, your build will fail
```

We recommend using Corepack, [read PNPM docs](https://pnpm.io/installation#using-corepack).

### Repository Setup

1. Fork the repository on GitHub.
2. Clone your fork:

```shell
git clone https://github.com/<your-username>/opencli.git
cd opencli
```

3. Install dependencies:

```shell
pnpm install
```

4. Build all packages:

```shell
pnpm run build
```

## Project Structure

This is a **pnpm monorepo** managed with [Turborepo](https://turbo.build/).

```
opencli/
├── packages/
│   └── <package>/        # Each package follows the same structure
│       ├── src/          # Source files
│       ├── __tests__/    # Test files
│       └── package.json
├── scripts/              # Internal tooling and Turbo generators
│   └── turbo/
│       └── generators/   # Package scaffolding templates
├── .changeset/           # Changesets for versioning
├── .github/              # CI/CD workflows, labels, and templates
├── turbo.json            # Turborepo pipeline configuration
├── pnpm-workspace.yaml   # Workspace package globs
├── biome.jsonc           # Biome linter/formatter config
├── eslint.config.mjs     # ESLint config
└── tsconfig.json         # Root TypeScript config
```

## Development Workflow

All tasks are run from the root of the monorepo using `pnpm` scripts powered by Turborepo for caching and parallelism.

### Building

Build all packages:

```shell
pnpm run build
```

Build only packages affected by recent changes:

```shell
pnpm run build:affected
```

Build example packages:

```shell
pnpm run build:examples
```

### Testing

Run all tests:

```shell
pnpm run test
```

Run only tests affected by recent changes:

```shell
pnpm run test:affected
```

Tests use [Vitest](https://vitest.dev/) and are configured via `vitest.config.ts` at the root. Coverage reports are generated in `packages/<name>/coverage/`.

### Linting

```shell
pnpm run lint
```

Lint only affected packages:

```shell
pnpm run lint:affected
```

The project uses both [Biome](https://biomejs.dev/) and [ESLint](https://eslint.org/) for linting. Biome handles formatting and fast lint rules; ESLint handles more complex semantic rules via `eslint-config-neon`.

### Formatting

```shell
pnpm run format
```

This runs both code formatting and import sorting:

```shell
pnpm run format:code     # Biome + Prettier
pnpm run format:imports  # Biome import organizer
```

## Making Changes

### Branching Strategy

Create a branch from `main` for every change:

```shell
git checkout -b feat/my-new-feature
# or
git checkout -b fix/bug-description
```

Use a descriptive, lowercase branch name. Prefer prefixes like `feat/`, `fix/`, `docs/`, `chore/`, etc.

### Commit Convention

This project follows the **Angular Commit Convention** enforced by [commitlint](https://commitlint.js.org/). Every commit message must follow this format:

```
<type>(<scope>): <short description>
```

**Allowed types:**

| Type | When to use |
|------|-------------|
| `build` | Build system or dependency changes |
| `chore` | Maintenance tasks |
| `ci` | CI/CD configuration changes |
| `docs` | Documentation changes only |
| `examples` | Example templates updates |
| `feat` | A new feature |
| `fix` | A bug fix |
| `perf` | Performance improvement |
| `refactor` | Code change without behavior change |
| `revert` | Reverting a previous commit |
| `style` | Formatting, no logic change |
| `test` | Adding or updating tests |
| `types` | Type definition changes |

**Rules:**
- The subject must start with a lowercase letter.
- No period at the end of the description.
- Keep the header under 100 characters.

**Examples:**

```shell
git commit -m "feat(cli): add support for --verbose flag"
git commit -m "fix(parser): handle empty input gracefully"
git commit -m "docs(readme): update installation instructions"
git commit -m "test(cli): cover edge cases in argument parsing"
```

A `commit-msg` git hook enforces this automatically via Husky. If your commit is rejected, check the error message from commitlint.

### Changesets

This project uses [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs. **Every pull request that affects a publishable package must include a changeset.**

To add a changeset:

```shell
pnpm changeset
```

Follow the interactive prompts to:
1. Select which packages are affected.
2. Choose the bump type (`patch`, `minor`, or `major`).
3. Write a summary of the change (this becomes part of the changelog).

The generated file in `.changeset/` must be committed alongside your code changes. If your PR does not affect any publishable package (e.g., only documentation, CI, or internal scripts), you do not need to add a changeset.

## Pull Requests

Before submitting a pull request:

1. Make sure all tests pass: `pnpm run test`.
2. Make sure linting passes: `pnpm run lint`.
3. Make sure the code is formatted: `pnpm run format`.
4. Add a changeset if your change affects a publishable package.
5. Keep the scope focused — one concern per PR.

**PR Title** must follow the same Angular Commit Convention as commit messages (this is enforced by CI).

When you open the PR, fill out the pull request template. Screenshots are welcome for visual changes. Do not delete the Testing section — if no tests were added, briefly explain why.

**Review Process:** At least one maintainer review is required before merging. Feedback will be provided constructively. Please respond to comments or request re-review after addressing them.

## Release Process

Releases are handled by maintainers and are automated via the CI pipeline.

The flow is:
1. Changesets accumulated in PRs are collected on `main`.
2. A release PR is opened automatically that bumps versions and updates changelogs.
3. Once the release PR is merged, packages are published to npm.
4. A Discord announcement is sent to the community automatically.

As a contributor, **you only need to add changesets** — the rest is handled by the maintainer team.

## Getting Help

If you have a question, need support, or want to discuss an idea before opening a PR:

- **Discord**: Join our [Discord Community Server](https://discord.gg/ZmKUnugG6s) for real-time chat and support.
- **GitHub Discussions**: Use the [GitHub Discussions](https://github.com/hadez8877/opencli/discussions) for questions and ideas.
- **GitHub Issues**: Report bugs or request features using the provided issue templates.

Please do **not** open a blank issue — use the templates and fill them out completely. This helps maintainers triage faster.
