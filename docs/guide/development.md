# Contributing

```sh
npm install
npm run dev            # Nuxt dev on the playground
npm run build:playground
npm run lint
npm run typecheck
```

A `Justfile` wraps the same commands: `just dev`, `just build`, `just lint`,
`just typecheck`, `just release <bump>`.

## Release flow

Semver git tags; consumers pin tags by exact SHA.

1. Summarize the change under `CHANGELOG.md` and commit it.
2. Run `just release patch|minor|major` (or `bash scripts/release.sh <bump>`):
   it bumps `package.json` + the lockfile root version, commits
   `release: vX.Y.Z`, tags `vX.Y.Z`, and pushes the branch and tag.
3. Create the GitHub release: `gh release create vX.Y.Z --generate-notes`.
4. Let GitHub Actions pass (`lint` + `build:playground`).
5. In each consumer, bump
   `"@opeolluwa/ryder": "github:opeolluwa/ryder#vX.Y.Z"` and `npm install` to
   record the new SHA.