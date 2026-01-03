# Skills

This directory contains Agent Skills that extend Claude's capabilities with specialized knowledge and workflows.

## Available Skills

- **python-uv-backend** - Build, lint, format, run unit tests, and verify Python backend applications using uv package manager

## Adding New Skills

To add a new skill:

1. Create a new directory: `skills/skill-name/`
2. Add a `SKILL.md` file with:
   - YAML frontmatter (name, description)
   - Markdown instructions
3. Optionally add:
   - `scripts/` - Executable code
   - `references/` - Documentation
   - `assets/` - Templates and files
4. Test the skill
5. Package with: `zip -r skill-name.skill skill-name/`

See [python-uv-backend](./python-uv-backend/) for a complete example.
