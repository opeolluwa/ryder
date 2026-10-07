#!/usr/bin/env bash
set -euo pipefail

PACKAGE_JSON="package.json"
LOCKFILE="package-lock.json"

BUMP_TYPE=${1:-patch}

CURRENT_VERSION=$(node -p "require('./${PACKAGE_JSON}').version")

IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

case "$BUMP_TYPE" in
  major)
    MAJOR=$((MAJOR + 1))
    MINOR=0
    PATCH=0
    ;;
  minor)
    MINOR=$((MINOR + 1))
    PATCH=0
    ;;
  patch)
    PATCH=$((PATCH + 1))
    ;;
  *)
    echo "Invalid bump type: $BUMP_TYPE"
    echo "Use: patch | minor | major"
    exit 1
    ;;
esac

NEW_VERSION="$MAJOR.$MINOR.$PATCH"
TAG="v$NEW_VERSION"

echo "Current version: $CURRENT_VERSION"
echo "New version: $NEW_VERSION"

# Keep package.json and the lockfile's root version in sync without running
# `npm install` (no network, no git clean-tree checks).
node - "$NEW_VERSION" <<'NODE'
const fs = require("node:fs");
const version = process.argv[2];

for (const file of ["package.json", "package-lock.json"]) {
  if (!fs.existsSync(file)) continue;

  const json = JSON.parse(fs.readFileSync(file, "utf8"));
  json.version = version;

  if (json.packages && json.packages[""]) {
    json.packages[""].version = version;
  }

  fs.writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
}
NODE

git add "$PACKAGE_JSON" "$LOCKFILE"
git commit -m "release: $TAG"
git tag "$TAG"

BRANCH=$(git rev-parse --abbrev-ref HEAD)
git push origin "$BRANCH"
git push origin "$TAG"

echo "Release $TAG created"
