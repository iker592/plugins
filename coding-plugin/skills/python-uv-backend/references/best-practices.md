# Python + uv Best Practices

## Project Structure

Recommended directory structure:

```
project-name/
├── src/
│   └── project_name/
│       ├── __init__.py
│       ├── main.py
│       └── ...
├── tests/
│   ├── __init__.py
│   ├── test_main.py
│   └── ...
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── .pre-commit-config.yaml
├── pyproject.toml
├── uv.lock
├── README.md
└── Dockerfile
```

## uv Commands Reference

### Project Initialization

```bash
# Create new project
uv init project-name
cd project-name

# Initialize from existing directory
uv init
```

### Dependency Management

```bash
# Add production dependency
uv add requests

# Add development dependency
uv add --dev pytest

# Add optional dependency group
uv add --optional dev pytest ruff mypy

# Install all dependencies
uv sync

# Install with extras
uv sync --all-extras

# Update dependencies
uv lock --upgrade

# Remove dependency
uv remove package-name
```

### Running Commands

```bash
# Run Python script
uv run python script.py

# Run module
uv run -m module_name

# Run installed tool
uv run pytest
uv run ruff check .
uv run mypy .
```

## Code Quality Configuration

### Ruff Configuration

Ruff combines linting and formatting. Key configuration in `pyproject.toml`:

```toml
[tool.ruff]
line-length = 100
target-version = "py311"

[tool.ruff.lint]
select = ["E", "F", "I", "N", "UP", "B", "C4", "PT", "RET", "SIM", "RUF"]
```

### MyPy Configuration

For strict type checking:

```toml
[tool.mypy]
strict = true
warn_return_any = true
disallow_untyped_defs = true
```

### Pytest Configuration

```toml
[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = ["-v", "--strict-markers", "--tb=short"]
```

## Testing Best Practices

### Test Organization

```python
# tests/test_feature.py
import pytest
from project_name.feature import function


class TestFeature:
    """Test suite for feature functionality."""

    def test_basic_case(self):
        """Test basic functionality."""
        result = function("input")
        assert result == "expected"

    def test_edge_case(self):
        """Test edge case handling."""
        with pytest.raises(ValueError):
            function(None)

    @pytest.mark.slow
    def test_slow_operation(self):
        """Test that takes significant time."""
        # Long-running test
        pass
```

### Fixtures

```python
# tests/conftest.py
import pytest


@pytest.fixture
def sample_data():
    """Provide sample data for tests."""
    return {"key": "value"}


@pytest.fixture
def mock_service(mocker):
    """Mock external service."""
    mock = mocker.patch("project_name.external.Service")
    mock.return_value.get.return_value = "mocked"
    return mock
```

### Coverage

Aim for 80%+ coverage, but focus on critical paths:

```bash
# Run tests with coverage
uv run pytest --cov=. --cov-report=html

# View coverage report
open htmlcov/index.html
```

## Type Hints

Use type hints consistently:

```python
from typing import Optional, List, Dict, Any
from pathlib import Path


def process_data(
    input_file: Path,
    options: Optional[Dict[str, Any]] = None
) -> List[str]:
    """Process data from file with optional configuration.

    Args:
        input_file: Path to input file
        options: Optional configuration dictionary

    Returns:
        List of processed strings

    Raises:
        FileNotFoundError: If input file doesn't exist
        ValueError: If options are invalid
    """
    if options is None:
        options = {}

    # Implementation
    return []
```

## Pre-commit Hooks

Pre-commit hooks catch issues before commit:

```bash
# Install hooks
uv run pre-commit install

# Run manually
uv run pre-commit run --all-files

# Update hook versions
uv run pre-commit autoupdate
```

## CI/CD Integration

### GitHub Actions

Workflows run on push and pull request. Key jobs:
- Lint (ruff check + format check)
- Type check (mypy)
- Test (pytest with coverage)
- Build (package creation)

### GitLab CI

Similar pipeline stages with caching for faster runs.

## Docker Best Practices

### Multi-stage Builds

Use builder stage to minimize final image size:
- Install dependencies in builder
- Copy only necessary files to runtime
- Run as non-root user

### Security

- Use slim Python images
- Don't run as root
- Pin dependency versions
- Scan for vulnerabilities

## Performance Tips

### uv Performance

- Use `uv.lock` for reproducible builds
- Enable caching in CI
- Use `--frozen` for production installs

### Testing Performance

- Mark slow tests with `@pytest.mark.slow`
- Run fast tests during development
- Use parallel execution: `pytest -n auto`

## Security

### Dependency Scanning

```bash
# Check for known vulnerabilities
uv run pip install safety
uv run safety check
```

### Secrets Detection

Pre-commit hook detects secrets:

```bash
# Initialize baseline
uv run detect-secrets scan > .secrets.baseline

# Audit findings
uv run detect-secrets audit .secrets.baseline
```

## Common Patterns

### CLI Applications

```python
import argparse


def main():
    parser = argparse.ArgumentParser(description="My CLI tool")
    parser.add_argument("input", help="Input file")
    parser.add_argument("--verbose", action="store_true")

    args = parser.parse_args()
    # Implementation


if __name__ == "__main__":
    main()
```

### Configuration Management

```python
from pathlib import Path
from typing import Dict, Any
import tomllib


def load_config(config_path: Path) -> Dict[str, Any]:
    """Load configuration from TOML file."""
    with open(config_path, "rb") as f:
        return tomllib.load(f)
```

### Error Handling

```python
import logging

logger = logging.getLogger(__name__)


def robust_function():
    """Function with proper error handling."""
    try:
        # Risky operation
        result = risky_operation()
    except ValueError as e:
        logger.error(f"Invalid value: {e}")
        raise
    except Exception as e:
        logger.exception("Unexpected error")
        # Handle or re-raise
        raise
    else:
        logger.info("Operation successful")
        return result
    finally:
        # Cleanup
        pass
```
