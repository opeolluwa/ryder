alias i := install
alias d := dev
alias b := build
alias l := lint
alias tc := typecheck
alias r := release

# List available commands
@default:
    @just --list --list-heading $'Available commands\n'

# Install package and playground dependencies
@install:
    npm install

# Run the playground dev server
@dev:
    npm run dev

# Build the playground (Nuxt production build)
@build:
    npm run build:playground

# Lint the package and playground
@lint:
    npm run lint

# Type-check the playground against the package
@typecheck:
    npm run typecheck

# Bump version, commit, tag and push a release
release bump="patch":
    bash scripts/release.sh {{ bump }}
