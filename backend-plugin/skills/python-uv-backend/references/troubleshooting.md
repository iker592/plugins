# Troubleshooting Guide

## uv Issues

### uv command not found

**Problem:** Shell can't find `uv` after installation.

**Solution:**
```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Add to PATH (add to ~/.bashrc or ~/.zshrc)
export PATH="$HOME/.cargo/bin:$PATH"

# Reload shell
source ~/.bashrc  # or source ~/.zshrc
```

### Lock file conflicts

**Problem:** `uv.lock` has merge conflicts after git pull.

**Solution:**
```bash
# Delete lock file and regenerate
rm uv.lock
uv lock

# Or resolve manually and run
uv lock --upgrade
```

### Dependency resolution failures

**Problem:** `uv sync` fails with dependency conflicts.

**Solution:**
```bash
# Try upgrading packages
uv lock --upgrade

# Check for incompatible constraints in pyproject.toml
# Relax version constraints if needed

# Force reinstall
rm -rf .venv
uv sync
```

## Ruff Issues

### Import sorting conflicts

**Problem:** Ruff changes imports differently than expected.

**Solution:**
```toml
# Configure import sorting in pyproject.toml
[tool.ruff.lint.isort]
known-first-party = ["your_package"]
section-order = ["future", "standard-library", "third-party", "first-party", "local-folder"]
```

### Line too long errors

**Problem:** Lines exceed configured length.

**Solution:**
```toml
# Adjust code line length to match pyproject.toml
[tool.ruff]
line-length = 120  # or your preferred length

# For spexific exceptions, ignore specific lines
# Add comment: # noqa: E501
```

### False positives

**Problem:** Ruff reports false positive violations.

**Solution:**
```python
# Ignore specific line
result = some_function()  # noqa: RUF001

# Ignore entire file
# pyproject.toml
[tool.ruff.lint.per-file-ignores]
"path/to/file.py" = ["RUF001"]
```

## MyPy Issues

### Missing type stubs

**Problem:** `error: Library stubs not installed for "package"`.

**Solution:**
```bash
# Install type stubs
uv add --dev types-requests  # for requests
uv add --dev types-redis     # for redis

# Or ignore missing imports
# pyproject.toml
[[tool.mypy.overrides]]
module = ["untyped_package"]
ignore_missing_imports = true
```

### Incompatible types

**Problem:** Type errors in correct code.

**Solution:**
```python
# Add type ignore comment
result = function()  # type: ignore[misc]

# Or use cast
from typing import cast
result = cast(TargetType, function())

# Or improve type hints
def function() -> SpecificType:
    ...
```

### Any type warnings

**Problem:** `error: Returning Any from function declared to return "Type"`.

**Solution:**
```python
# Add explicit type annotations
def process(data: dict) -> ProcessedData:  # Instead of dict, use TypedDict
    ...

# Use TypedDict for dictionaries
from typing import TypedDict

class Config(TypedDict):
    host: str
    port: int
```

## Pytest Issues

### Test discovery problems

**Problem:** Pytest doesn't find tests.

**Solution:**
```bash
# Check naming convention
# Files: test_*.py or *_test.py
# Functions: test_*()
# Classes: Test*

# Explicitly set test paths
# pyproject.toml
[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
```

### Import errors in tests

**Problem:** `ModuleNotFoundError` when running tests.

**Solution:**
```bash
# Install package in editable mode
uv pip install -e .

# Or run with python path
uv run pytest

# Or use src layout with proper structure
# src/package_name/...
# tests/...
```

### Fixture not found

**Problem:** `fixture 'name' not found`.

**Solution:**
```python
# Move fixture to conftest.py
# tests/conftest.py
import pytest

@pytest.fixture
def shared_fixture():
    return "value"

# Or import fixture
from tests.fixtures import my_fixture  # noqa: F401
```

### Coverage not measuring correctly

**Problem:** Coverage report shows 0% or missing files.

**Solution:**
```toml
# Configure coverage source in pyproject.toml
[tool.coverage.run]
source = ["src/package_name"]  # Point to source directory

# Or use --cov flag correctly
# uv run pytest --cov=src/package_name
```

## Pre-commit Issues

### Hooks failing after update

**Problem:** Pre-commit hooks fail after update.

**Solution:**
```bash
# Update hooks to latest versions
uv run pre-commit autoupdate

# Clear cache and reinstall
uv run pre-commit clean
uv run pre-commit install
```

### Hook modifications not committed

**Problem:** Pre-commit modifies files but commit still fails.

**Solution:**
```bash
# Stage the auto-fixed files
git add -u

# Commit again
git commit -m "message"

# Or bypass hooks temporarily (not recommended)
git commit --no-verify -m "message"
```

### Slow pre-commit runs

**Problem:** Pre-commit takes too long.

**Solution:**
```yaml
# Limit files checked in .pre-commit-config.yaml
- repo: https://github.com/pre-commit/mirrors-mypy
  hooks:
    - id: mypy
      files: ^src/  # Only check src directory
      exclude: ^tests/  # Exclude tests

# Or run on changed files only (default behavior)
# Pre-commit automatically runs only on staged files
```

## Docker Issues

### Large image size

**Problem:** Docker image is too large.

**Solution:**
```dockerfile
# Use slim base image
FROM python:3.12-slim

# Multi-stage build
FROM python:3.12-slim AS builder
# ... build steps
FROM python:3.12-slim
COPY --from=builder /app/.venv /app/.venv

# Clean up in same layer
RUN apt-get update && apt-get install -y pkg \
    && rm -rf /var/lib/apt/lists/*
```

### Permission errors

**Problem:** Permission denied errors in container.

**Solution:**
```dockerfile
# Create non-root user
RUN useradd -m -u 1000 appuser

# Change ownership before switching user
RUN chown -R appuser:appuser /app
USER appuser
```

### uv sync fails in Docker

**Problem:** `uv sync` fails during Docker build.

**Solution:**
```dockerfile
# Install uv properly
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Copy lock file
COPY uv.lock ./

# Use frozen install
RUN uv sync --frozen --no-dev
```

## CI/CD Issues

### CI cache not working

**Problem:** CI rebuilds dependencies every time.

**Solution:**
```yaml
# GitHub Actions
- name: Install uv
  uses: astral-sh/setup-uv@v4
  with:
    enable-cache: true  # Enable caching

# GitLab CI
cache:
  paths:
    - .cache/pip
    - .venv/
```

### Tests pass locally but fail in CI

**Problem:** Tests work locally but fail in CI environment.

**Solution:**
```bash
# Check Python version matches
# pyproject.toml
requires-python = ">=3.11"

# CI config
python-version: "3.11"

# Check for environment-specific issues
# Use explicit paths instead of relative
# Mock time-dependent tests
# Avoid hardcoded file paths
```

### Coverage threshold failing

**Problem:** Coverage check fails in CI but passes locally.

**Solution:**
```toml
# Ensure consistent coverage settings
[tool.coverage.report]
fail_under = 80
precision = 2

# Run exact same command locally
uv run pytest --cov=. --cov-fail-under=80
```

## General Tips

### Debug mode

```bash
# Verbose output
uv run pytest -vv
uv run ruff check --verbose

# Debug specific test
uv run pytest tests/test_file.py::test_function -vv
```

### Clean slate

```bash
# Remove all caches and virtual environment
rm -rf .venv .pytest_cache .mypy_cache .ruff_cache __pycache__
find . -type d -name __pycache__ -exec rm -rf {} +

# Reinstall
uv sync --all-extras --dev
```

### Check versions

```bash
# Check tool versions
uv --version
uv run python --version
uv run pytest --version
uv run ruff --version
uv run mypy --version
```
