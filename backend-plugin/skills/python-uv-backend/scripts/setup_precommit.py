#!/usr/bin/env python3
"""
Set up pre-commit hooks for Python + uv projects.
"""

import argparse
import subprocess
import sys
from pathlib import Path


def run_command(cmd: list[str]) -> tuple[bool, str]:
    """Run a command and return success status and output."""
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            check=False
        )
        output = result.stdout + result.stderr
        return result.returncode == 0, output
    except FileNotFoundError:
        return False, f"Command not found: {' '.join(cmd)}"


def check_precommit_config_exists() -> bool:
    """Check if .pre-commit-config.yaml exists."""
    return Path(".pre-commit-config.yaml").exists()


def install_precommit() -> bool:
    """Install pre-commit using uv."""
    print("Installing pre-commit...")
    success, output = run_command(["uv", "add", "--dev", "pre-commit"])

    if not success:
        print(f"Failed to install pre-commit:\n{output}")
        return False

    print("✓ pre-commit installed")
    return True


def install_hooks() -> bool:
    """Install pre-commit hooks."""
    print("Installing pre-commit hooks...")
    success, output = run_command(["uv", "run", "pre-commit", "install"])

    if not success:
        print(f"Failed to install hooks:\n{output}")
        return False

    print("✓ pre-commit hooks installed")
    return True


def run_hooks_on_all_files() -> bool:
    """Run pre-commit on all files."""
    print("Running pre-commit on all files...")
    success, output = run_command(["uv", "run", "pre-commit", "run", "--all-files"])

    print(output)

    if not success:
        print("⚠ Some hooks failed on existing files (this is normal for first run)")
        print("Files have been auto-fixed where possible. Review and commit changes.")
        return True  # Not a fatal error

    print("✓ All hooks passed")
    return True


def main():
    parser = argparse.ArgumentParser(
        description="Set up pre-commit hooks for Python + uv project"
    )
    parser.add_argument(
        "--skip-run",
        action="store_true",
        help="Skip running hooks on all files after setup"
    )

    args = parser.parse_args()

    print("🔧 Setting up pre-commit hooks\n")

    # Check if config exists
    if not check_precommit_config_exists():
        print("ERROR: .pre-commit-config.yaml not found")
        print("Please create it first (use the template from assets/)")
        sys.exit(1)

    # Install pre-commit
    if not install_precommit():
        sys.exit(1)

    # Install hooks
    if not install_hooks():
        sys.exit(1)

    # Run on all files
    if not args.skip_run:
        if not run_hooks_on_all_files():
            sys.exit(1)

    print("\n✅ Pre-commit setup complete!")
    print("\nPre-commit will now run automatically on git commit.")
    print("To run manually: uv run pre-commit run --all-files")


if __name__ == "__main__":
    main()
