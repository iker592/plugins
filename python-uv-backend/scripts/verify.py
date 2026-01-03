#!/usr/bin/env python3
"""
Comprehensive verification script for Python + uv projects.
Runs linting, formatting, type checking, and tests with coverage.
"""

import argparse
import subprocess
import sys
from pathlib import Path
from typing import List, Tuple


class Colors:
    """ANSI color codes for terminal output."""
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'


def print_step(message: str) -> None:
    """Print a step header."""
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{message}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}\n")


def run_command(cmd: List[str], step_name: str) -> Tuple[bool, str]:
    """Run a command and return success status and output."""
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            check=False
        )

        output = result.stdout + result.stderr
        success = result.returncode == 0

        if success:
            print(f"{Colors.GREEN}✓ {step_name} passed{Colors.ENDC}")
        else:
            print(f"{Colors.RED}✗ {step_name} failed{Colors.ENDC}")
            if output.strip():
                print(f"{Colors.YELLOW}Output:{Colors.ENDC}")
                print(output)

        return success, output
    except FileNotFoundError:
        print(f"{Colors.RED}✗ {step_name} failed: Command not found{Colors.ENDC}")
        print(f"{Colors.YELLOW}Command: {' '.join(cmd)}{Colors.ENDC}")
        return False, "Command not found"


def check_uv_installed() -> bool:
    """Check if uv is installed."""
    success, _ = run_command(["uv", "--version"], "uv installation check")
    return success


def run_ruff_check(fix: bool = False) -> bool:
    """Run ruff linting."""
    print_step("Running Ruff Linting")
    cmd = ["uv", "run", "ruff", "check"]
    if fix:
        cmd.append("--fix")
    cmd.append(".")
    success, _ = run_command(cmd, "ruff check")
    return success


def run_ruff_format(check_only: bool = True) -> bool:
    """Run ruff formatting."""
    print_step("Running Ruff Formatting")
    cmd = ["uv", "run", "ruff", "format"]
    if check_only:
        cmd.append("--check")
    cmd.append(".")
    success, _ = run_command(cmd, "ruff format")
    return success


def run_mypy() -> bool:
    """Run mypy type checking."""
    print_step("Running MyPy Type Checking")
    success, _ = run_command(["uv", "run", "mypy", "."], "mypy")
    return success


def run_tests(coverage: bool = True, min_coverage: int = 80) -> bool:
    """Run pytest with optional coverage."""
    print_step("Running Tests with Pytest")

    cmd = ["uv", "run", "pytest"]

    if coverage:
        cmd.extend([
            "--cov=.",
            "--cov-report=term-missing",
            f"--cov-fail-under={min_coverage}"
        ])

    cmd.extend(["-v", "--tb=short"])

    success, _ = run_command(cmd, "pytest")
    return success


def main():
    parser = argparse.ArgumentParser(
        description="Verify Python + uv project (lint, format, type check, test)"
    )
    parser.add_argument(
        "--fix",
        action="store_true",
        help="Auto-fix linting issues where possible"
    )
    parser.add_argument(
        "--format",
        action="store_true",
        help="Auto-format code (not just check)"
    )
    parser.add_argument(
        "--no-coverage",
        action="store_true",
        help="Skip coverage reporting"
    )
    parser.add_argument(
        "--min-coverage",
        type=int,
        default=80,
        help="Minimum coverage percentage (default: 80)"
    )
    parser.add_argument(
        "--skip-lint",
        action="store_true",
        help="Skip linting"
    )
    parser.add_argument(
        "--skip-format",
        action="store_true",
        help="Skip format checking"
    )
    parser.add_argument(
        "--skip-mypy",
        action="store_true",
        help="Skip type checking"
    )
    parser.add_argument(
        "--skip-tests",
        action="store_true",
        help="Skip tests"
    )

    args = parser.parse_args()

    # Track overall success
    all_passed = True
    results = {}

    print(f"{Colors.CYAN}{Colors.BOLD}Python + uv Project Verification{Colors.ENDC}\n")

    # Check uv is installed
    if not check_uv_installed():
        print(f"\n{Colors.RED}ERROR: uv is not installed. Install it first:{Colors.ENDC}")
        print("  curl -LsSf https://astral.sh/uv/install.sh | sh")
        sys.exit(1)

    # Run checks
    if not args.skip_lint:
        results['lint'] = run_ruff_check(fix=args.fix)
        all_passed = all_passed and results['lint']

    if not args.skip_format:
        results['format'] = run_ruff_format(check_only=not args.format)
        all_passed = all_passed and results['format']

    if not args.skip_mypy:
        results['mypy'] = run_mypy()
        all_passed = all_passed and results['mypy']

    if not args.skip_tests:
        results['tests'] = run_tests(
            coverage=not args.no_coverage,
            min_coverage=args.min_coverage
        )
        all_passed = all_passed and results['tests']

    # Print summary
    print_step("Verification Summary")

    for check, passed in results.items():
        status = f"{Colors.GREEN}✓ PASSED{Colors.ENDC}" if passed else f"{Colors.RED}✗ FAILED{Colors.ENDC}"
        print(f"{check.ljust(15)}: {status}")

    print()

    if all_passed:
        print(f"{Colors.GREEN}{Colors.BOLD}🎉 All checks passed!{Colors.ENDC}\n")
        sys.exit(0)
    else:
        print(f"{Colors.RED}{Colors.BOLD}❌ Some checks failed{Colors.ENDC}\n")
        sys.exit(1)


if __name__ == "__main__":
    main()
