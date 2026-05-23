---
description: Create semantic commits from all available changes
agent: build
---

# Git Create Semantic Commits

Create Angular-style semantic commits from all available changes.

Do not make one big commit by default.
Group files by purpose.
Commit each group separately.

Follow Angular Commit Convention strictly.

---

# Goal

Turn the current working tree into clean, meaningful commits.

No guessing.
No mega commits.
No vague messages.
No mixing unrelated changes.

Produce a professional Git history compatible with:

- commitlint
- semantic-release
- release-please
- conventional-changelog
- changesets
- Nx/Turbo monorepos

---

# Steps

## 1. Inspect repository state

Check what changed:

```bash
git status --short
```

Check staged changes:

```bash
git diff --cached
```

Check unstaged changes:

```bash
git diff
```

Check untracked files:

```bash
git ls-files --others --exclude-standard
```

Understand every available change before committing.

Do not assume intent without inspecting diffs.

---

## 2. Detect issue key

Check branch name and context for an issue key.

```bash
git branch --show-current
```

Examples:

- PROJ-123
- POW-456
- #123

If there is a clear issue key, use it in every related commit.

If there is no issue key, commit without it.

Do not invent one.

---

## 3. Group changes semantically

Group files and hunks by intent.

Examples of valid groups:

- one bug fix
- one feature
- one refactor
- one test update
- one documentation change
- one dependency update
- one config or CI change

One commit = one purpose.

If two files changed for the same reason, commit them together.

If one file contains unrelated changes, split hunks.

Use:

```bash
git add -p
```

or stage files explicitly:

```bash
git add <file>
```

Do not use:

```bash
git add -A
```

blindly when changes are unrelated.

---

## 4. Create commits one by one

For each semantic group:

1. Stage only the files or hunks for that group
2. Verify the staged diff
3. Create an Angular-style commit message
4. Commit
5. Repeat until no meaningful changes remain

Verify staged diff:

```bash
git diff --cached
```

Commit format:

```bash
git commit -m "<type>(<scope>): <description>"
```

Breaking change:

```bash
git commit -m "<type>(<scope>)!: <description>"
```

With issue key:

```bash
git commit -m "<issue-key>: <type>(<scope>): <description>"
```

Examples:

```bash
git commit -m "fix(auth): handle expired token refresh"
git commit -m "feat(api): add user activity endpoint"
git commit -m "refactor(ui): simplify modal state handling"
git commit -m "test(auth): cover expired token flow"
git commit -m "PROJ-123: fix(auth): handle token refresh"
```

---

## 5. Keep committing until done

After each commit, check remaining changes:

```bash
git status --short
```

If changes remain:

- inspect them again
- regroup semantically
- create the next commit

Stop only when:

- all intentional changes are committed
- unrelated or unsafe changes are left unstaged intentionally
- the user must decide ambiguous changes manually

---

# Angular Commit Types

Use official Angular Commit Convention types:

- feat: new feature
- fix: bug fix
- docs: documentation only
- style: formatting only, no logic change
- refactor: code change without behavior change
- perf: performance improvement
- test: tests added or updated
- build: build system or dependencies
- ci: CI/CD changes
- chore: maintenance
- revert: revert previous commit

Prefer official Angular types only.

Do not invent custom types unless already used by the repository.

---

# Scope Rules

Use a short lowercase scope when useful.

Examples:

```bash
fix(auth): handle expired session
feat(payments): add retry flow
docs(readme): update setup instructions
test(cart): cover discount calculation
```

Skip scope only if it adds no value:

```bash
chore: update dependencies
```

Good scopes are usually:

- feature area
- package name
- route name
- module name
- service name
- config name

Examples:

```bash
fix(login): show invalid credentials error
feat(dashboard): add revenue chart
test(api): cover pagination params
ci(github): cache pnpm dependencies
build(vite): update bundle config
```

---

# Message Rules

- Follow Angular Commit Convention
- Description must be lowercase
- No period at the end
- Use present tense
- Be concise and specific
- Header should preferably stay under 100 characters
- Scope should be lowercase
- Describe intent, not implementation details unless necessary
- Avoid vague descriptions

Avoid:

- updates
- fixes
- misc
- wip
- changes
- stuff

Good:

```bash
feat(auth): support refresh token rotation
fix(cli): resolve markdown sorting regression
refactor(api): simplify route validation
test(cache): cover ttl expiration
docs(readme): document pnpm setup
```

Breaking change:

```bash
feat(api)!: remove legacy v1 endpoints
```

Bad:

```bash
fix: stuff
feat: updates
chore: misc changes
WIP
changed files
```

---

# Breaking Changes

Use `!` after scope when the commit introduces a breaking change.

Example:

```bash
feat(api)!: remove deprecated auth endpoints
```

Optionally include footer:

```text
BREAKING CHANGE: legacy auth tokens are no longer supported
```

---

# Optional Body And Footer

Use body/footer only when useful.

Example:

```text
feat(parser): support nested markdown lists

Improve parsing for deeply nested structures.

Closes #142
```

Example with breaking change:

```text
fix(cache): prevent stale entries after ttl expiration

BREAKING CHANGE: cache keys now include namespace
```

---

# Splitting Rules

Split commits when changes are unrelated.

Examples:

- UI change + dependency update = two commits
- bug fix + test for that bug = usually one commit
- refactor + behavior change = two commits
- docs for a feature + feature code = usually one commit
- formatting many files + logic change = two commits
- generated lockfile from dependency update = same commit as dependency update

If a change cannot be explained by the same sentence, split it.

---

# Safety Rules

Never commit:

- secrets
- .env files with real values
- API keys
- tokens
- credentials
- debug logs
- local editor files
- temporary files
- build artifacts unless intentionally tracked
- unrelated experiments

Before each commit, verify staged content:

```bash
git diff --cached
```

If staged diff contains unrelated changes, unstage and split:

```bash
git restore --staged <file>
```

---

# Final Check

When finished, run:

```bash
git status --short
```

Then report briefly:

- commits created
- files intentionally left uncommitted
- anything skipped for safety

Done means clean semantic history, not just zero pending files.
