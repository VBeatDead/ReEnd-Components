# Contributing to ReEnd-Components

Thank you for your interest in contributing to **ReEnd-Components** — the Arknights: Endfield Design System! Every contribution matters, whether it's a bug fix, a new component, documentation improvement, or feedback.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior by opening an issue.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create a branch** for your changes
4. **Make your changes** and commit them
5. **Push** to your fork and submit a **Pull Request**

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Git](https://git-scm.com/)
- npm, pnpm, yarn, or bun

### Setup

```bash
# Clone your fork
git clone https://github.com/<your-username>/ReEnd-Components.git
cd ReEnd-Components

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server runs at `http://localhost:8080`.

### Available Scripts

| Command              | Description              |
| -------------------- | ------------------------ |
| `npm run dev`        | Start dev server         |
| `npm run build`      | Build docs SPA           |
| `npm run build:dev`  | Build in dev mode        |
| `npm run test`       | Run tests once           |
| `npm run test:watch` | Run tests in watch mode  |
| `npm run lint`       | Run ESLint               |
| `npm run preview`    | Preview production build |

## Making Changes

### Branch Naming

Use descriptive branch names:

- `feat/component-name` — New component or feature
- `fix/issue-description` — Bug fix
- `docs/what-changed` — Documentation changes
- `refactor/what-changed` — Code refactoring
- `test/what-tested` — Adding or fixing tests

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add Accordion component
fix: tooltip positioning on mobile
docs: update installation guide
refactor: extract shared color tokens
test: add Toast component tests
chore: update dependencies
```

## Pull Request Process

1. Ensure all tests pass: `npm run test`
2. Ensure no lint errors: `npm run lint`
3. Ensure the build succeeds: `npm run build`
4. Update documentation if your changes affect the public API
5. Fill out the PR template with a clear description
6. Link any related issues

### PR Guidelines

- Keep PRs focused on a single change
- Include screenshots for UI changes
- Add tests for new components or features
- Don't break existing component APIs without discussion

## Coding Standards

### TypeScript

- Use TypeScript for all source files
- Prefer explicit types over `any`
- Use interfaces for component props

### Styling

- Use Tailwind CSS utility classes
- Use CSS custom properties (variables) for colors
- Follow the existing design token naming pattern (`--ef-*`, `--surface-*`)
- Use the `cn()` utility for conditional class merging

### Components

- Follow the existing component structure in `src/components/ui/`
- Use Radix UI primitives where applicable
- Components should support both dark and light themes
- Components should be accessible (keyboard navigation, ARIA attributes)
- Export all public APIs from the component file

### File Structure

```
src/components/ui/
  my-component.tsx    ← component file (kebab-case)
```

## Reporting Bugs

Use [GitHub Issues](https://github.com/VBeatDead/ReEnd-Components/issues) and include:

1. **Description** — What happened vs. what you expected
2. **Steps to reproduce** — Minimal steps to reproduce the issue
3. **Environment** — Browser, OS, Node.js version
4. **Screenshots** — If applicable

## Requesting Features

Open a [GitHub Issue](https://github.com/VBeatDead/ReEnd-Components/issues) with:

1. **Use case** — Why is this feature useful?
2. **Proposed API** — How would the component/feature be used?
3. **Alternatives** — Any alternative solutions you've considered?

---

Thank you for helping make ReEnd-Components better!
