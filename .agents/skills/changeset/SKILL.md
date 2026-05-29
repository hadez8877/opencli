---
name: changeset
description: Create a changeset for the OpenCLI monorepo. Use this skill whenever you need to add a changeset file to a PR, write a changelog entry, or document a package version bump for a published package. Also trigger when the user says "add a changeset", "write a changeset", "create a changeset", or when another skill instructs you to create a changeset.
---

# Changeset

Create changeset files for the OpenCLI monorepo. Changesets declare which packages changed, the semver bump type, and a user-facing message that becomes the CHANGELOG entry.

Every PR that modifies a package requires a changeset. Only `examples/*` changes are exempt.

## Creating the File

Run `pnpm changeset --empty` from the repo root. This creates a randomly-named `.md` file in `.changeset/` with empty front matter — no need to invent a filename or inspect the directory. Then edit the generated file to add the package bump and message.

## Format

```md
---
'<package-name>': patch
---

<changeset message>
```

- Package names must match the `name` field in the package's `package.json` exactly (e.g., `'opencli'`, `'@opencli/render-media'`)
- Bump types: `patch`, `minor`, or `major`
- A single changeset file can cover multiple packages
- `major` and `minor` bumps to the core `opencli` package are blocked by CI and require maintainer review

## Writing the Message

The changeset message is a public CHANGELOG entry. Write it for **OpenCLI users**, not for code reviewers.

Begin with a **present tense verb** that completes the sentence "This PR ...":

- Adds, Removes, Fixes, Updates, Refactors, Improves, Deprecates

Describe the change **as someone using OpenCLI to build a CLI will experience it**, not how it was implemented internally:

```md
// Too implementation-focused
Improves internal option parsing and token normalization

// Better -- user-facing impact
Improves option parsing for command definitions with nested flags
```

### Patch updates

One line is usually enough. No end punctuation required unless writing multiple sentences.

```md
---
'opencli': patch
---

Fixes a bug where command help output could omit required options
```

```md
---
'opencli': patch
---

Refactors internal command resolution to improve startup performance
```

Help the reader understand whether the change affects them. Include the specific command, option, hook, or configuration name when relevant.

```md
// Vague
Improves automatic output formatting

// Clear -- reader can tell if it affects them
Improves automatic formatting for `help` output in nested commands
```

### New features (minor)

Start with "Adds", name the new feature or capability, and describe what users can now do. Include a code example when helpful:

````md
---
'opencli': minor
---

Adds a new `timeout` option for command execution hooks

This value lets you stop long-running command hooks after a maximum number of milliseconds.

```ts
const cmd = new Command({
  name: 'deploy',
  hooks: {
    beforeRun: {
      timeout: 5000
    }
  }
});
```
````

New features are an opportunity to write a richer description that can feed into release notes. Keep the entry focused on the behavior OpenCLI users gain.

### Breaking changes (major)

Use verbs like "Removes", "Changes", or "Deprecates". Must include migration guidance. Use diff code samples when appropriate:

````md
---
'opencli': major
---

Removes support for the legacy `handler` option in favor of `action`

Update command definitions to use `action` instead of `handler`:

```diff
const cmd = new Command({
  name: 'build',
- handler: () => {
+ action: () => {
    // ...
  },
})
```
````

Changes to default values must mention the old default, the new default, and how to restore previous behavior.

### Longer changesets

For longer descriptions, use `####` and deeper headings (never `##` or `###`) to divide sections. This keeps the CHANGELOG readable when your entry is incorporated:

```md
---
'opencli': minor
---

Adds a new command composition helper for building multi-command CLIs.

#### Defining shared options

<!-- ... -->

#### Composing subcommands

<!-- ... -->
```
