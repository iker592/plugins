---
name: python-uv-backend
description: Build, lint, format, run unit tests, and verify Python backend applications using uv package manager. Use when working with Python projects that use uv, when setting up Python development workflows, configuring linting/formatting with ruff and mypy, setting up pytest, configuring pre-commit hooks, creating CI/CD pipelines for Python projects, or dockerizing Python applications. Provides scripts for automated verification, templates for configuration files, and comprehensive best practices.
---

# Python + uv Backend Development

Comprehensive toolkit for building, linting, formatting, testing, and verifying Python backend applications using uv as the package manager.

## Quick Start

### New Project Setup

```bash
# Initialize new project with uv
uv init project-name
cd project-name

# Copy configuration template
cp assets/pyproject.toml.template pyproject.toml

# Edit placeholders in pyproject.toml
# Replace PROJECT_NAME, PROJECT_DESCRIPTION

# Install dependencies
uv sync --all-extras --dev

# Set up pre-commit hooks
cp assets/pre-commit-config.yaml.template .pre-commit-config.yaml
python scripts/setup_precommit.py

# Run verification
python scripts/verify.py
```

### Existing Project Integration

```bash
# Copy and merge pyproject.toml configuration
# Add tool configurations for ruff, mypy, pytest, coverage

# Install development dependencies
uv add --dev pytest pytest-cov ruff mypy pre-commit

# Copy pre-commit config
cp assets/pre-commit-config.yaml.template .pre-commit-config.yaml

# Set up hooks
python scripts/setup_precommit.py

# Run verification
python scripts/verify.py
```

## Core Workflows

### 1. Verification Workflow

Run comprehensive checks on Python project:

```bash
# Run all checks (lint, format, type check, test with coverage)
python scripts/verify.py

# Auto-fix linting issues
python scripts/verify.py --fix

# Auto-format code
python scripts/verify.py --format

# Skip specific checks
python scripts/verify.py --skip-lint --skip-mypy

# Adjust coverage threshold
python scripts/verify.py --min-coverage 90

# Run without coverage
python scripts/verify.py --no-coverage
```

**Script:** `scripts/verify.py` - Orchestrates all verification steps with colored output and summary.

### 2. Pre-commit Hooks Setup

Install and configure pre-commit hooks for automated checks on commit:

```bash
# Full setup (installs pre-commit, hooks, runs on all files)
python scripts/setup_precommit.py

# Setup without initial run
python scripts/setup_precommit.py --skip-run
```

**Requirements:**
- `.pre-commit-config.yaml` must exist (use template from `assets/`)
- Installs pre-commit as dev dependency
- Configures hooks to run on git commit

**Script:** `scripts/setup_precommit.py`

### 3. CI/CD Integration

#### GitHub Actions

Copy template to `.github/workflows/ci.yml`:

```bash
mkdir -p .github/workflows
cp assets/github-actions-ci.yml.template .github/workflows/ci.yml
```

**Features:**
- Matrix testing across Python 3.11 and 3.12
- Parallel jobs: test, security scanning, build
- Coverage upload to Codecov
- uv caching for faster runs
- Artifact upload for distributions

#### GitLab CI

Copy template to `.gitlab-ci.yml`:

```bash
cp assets/gitlab-ci.yml.template .gitlab-ci.yml
```

**Features:**
- Stages: lint, test, build
- Coverage reporting
- Caching for dependencies
- Artifact management

### 4. Docker Deployment

Use multi-stage Dockerfile for production:

```bash
# Copy Dockerfile template
cp assets/Dockerfile.template Dockerfile

# Edit Dockerfile
# Replace PROJECT_MODULE with your module name

# Build image
docker build -t project-name:latest .

# Run container
docker run -p 8000:8000 project-name:latest
```

**Template features:**
- Multi-stage build for minimal image size
- Non-root user for security
- uv integration for fast dependency installation
- Health check placeholder
- Best practices for Python containers

## Tool Configuration

### Ruff (Linting + Formatting)

Ruff replaces multiple tools: black, isort, flake8, pylint. Configuration in `pyproject.toml`:

**Key settings:**
- Line length: 100 characters
- Target: Python 3.11+
- Auto-fix enabled
- Comprehensive rule selection (E, F, I, N, UP, B, C4, PT, RET, SIM, RUF)

**Commands:**
```bash
# Lint
uv run ruff check .

# Lint with auto-fix
uv run ruff check --fix .

# Format check
uv run ruff format --check .

# Format code
uv run ruff format .
```

### MyPy (Type Checking)

Strict type checking configuration:

**Key settings:**
- Strict mode enabled
- Warn on Any returns
- Disallow untyped definitions
- Show error codes for easy suppression

**Commands:**
```bash
# Type check
uv run mypy .

# Type check specific file
uv run mypy path/to/file.py
```

### Pytest (Testing)

Testing framework with coverage integration:

**Key settings:**
- Test discovery: `tests/` directory
- Coverage threshold: 80%
- Branch coverage enabled
- Markers for slow/integration tests

**Commands:**
```bash
# Run all tests
uv run pytest

# Run with coverage
uv run pytest --cov=. --cov-report=term-missing

# Run specific test
uv run pytest tests/test_file.py::test_function

# Run with markers
uv run pytest -m "not slow"  # Skip slow tests
```

## Additional Resources

### Configuration Templates

All templates in `assets/` directory:

- `pyproject.toml.template` - Complete project configuration with ruff, mypy, pytest, coverage
- `pre-commit-config.yaml.template` - Pre-commit hooks for ruff, mypy, security checks
- `github-actions-ci.yml.template` - GitHub Actions workflow
- `gitlab-ci.yml.template` - GitLab CI pipeline
- `Dockerfile.template` - Multi-stage Docker build
- `gitignore.template` - Python-specific .gitignore

### Best Practices

See `references/best-practices.md` for:
- Project structure recommendations
- uv command reference
- Testing patterns and fixtures
- Type hints guidelines
- Performance tips
- Security best practices
- Common code patterns

### Troubleshooting

See `references/troubleshooting.md` for solutions to:
- uv installation and configuration issues
- Ruff linting conflicts
- MyPy type checking errors
- Pytest discovery and fixture problems
- Pre-commit hook failures
- Docker build issues
- CI/CD debugging

## Common Tasks

### Add New Dependency

```bash
# Production dependency
uv add requests

# Development dependency
uv add --dev black
```

### Update Dependencies

```bash
# Update all dependencies
uv lock --upgrade

# Sync to updated lock file
uv sync
```

### Run Single Check

```bash
# Just lint
uv run ruff check .

# Just format check
uv run ruff format --check .

# Just type check
uv run mypy .

# Just tests
uv run pytest
```

### Fix All Issues

```bash
# Auto-fix linting + format + run tests
python scripts/verify.py --fix --format
```

## Integration Notes

### IDE Setup

**VS Code:**
- Install Python extension
- Install Ruff extension
- Install MyPy extension
- Configure settings to use uv

**PyCharm:**
- Configure Python interpreter to use `.venv/bin/python`
- Enable ruff as external tool
- Configure mypy as type checker

### Pre-commit vs Verify Script

- **Pre-commit hooks:** Run automatically on `git commit`, fast checks on changed files
- **Verify script:** Run manually or in CI, comprehensive checks on entire codebase

Use both for best results: pre-commit for fast feedback, verify script for thorough validation.

## Tips

1. **Start minimal:** Copy only the templates you need
2. **Customize configuration:** Adjust line length, coverage thresholds, rules to your project
3. **Incremental adoption:** Add type hints gradually, start with lower coverage threshold
4. **Use markers:** Mark slow tests to skip during development
5. **Cache in CI:** Enable uv caching for faster CI runs
6. **Security scanning:** Add safety checks for dependency vulnerabilities
