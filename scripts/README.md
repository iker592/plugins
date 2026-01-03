# Scripts

This directory contains shared utility scripts used by hooks, agents, and commands.

## What are Scripts?

Scripts are executable programs that can be:
- Called by hooks (e.g., formatters, linters, validators)
- Used by agents for complex operations
- Shared across multiple components

## Supported Languages

- Bash/Shell scripts (`.sh`)
- Python scripts (`.py`)
- JavaScript/Node.js (`.js`)
- Any executable with proper shebang

## Best Practices

1. **Make scripts executable**: `chmod +x script.sh`
2. **Use shebangs**: `#!/usr/bin/env bash` or `#!/usr/bin/env python3`
3. **Handle errors**: Exit with non-zero code on failure
4. **Document usage**: Add help text and comments
5. **Use `${CLAUDE_PLUGIN_ROOT}`**: For reliable path resolution

## Example

```bash
#!/usr/bin/env bash
# format-python.sh - Format Python files with ruff

set -e

echo "Formatting Python files..."
ruff format .
echo "✓ Formatting complete"
```

Place utility scripts in this directory.
