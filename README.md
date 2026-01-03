# Skills for AI Agents

A Claude Code plugin providing development skills, agents, commands, and automation for software engineering workflows.

## Installation

Add this plugin to Claude Code by adding the repository URL to your plugin settings:

```
https://github.com/iker592/skills
```

Or clone locally and add the path:

```bash
git clone https://github.com/iker592/skills.git
# Add local path in Claude Code settings
```

## Plugin Structure

```
skills/
├── .claude-plugin/           # Plugin metadata
│   └── plugin.json          # Plugin configuration
├── skills/                   # Agent Skills
│   └── python-uv-backend/   # Python + uv development skill
├── agents/                   # Standalone agents (future)
├── commands/                 # Slash commands (future)
├── hooks/                    # Hook configurations (future)
├── scripts/                  # Shared utility scripts (future)
├── LICENSE                   # MIT License
└── README.md                # This file
```

## Available Skills

### python-uv-backend

Build, lint, format, run unit tests, and verify Python backend applications using uv package manager.

**Features:**
- Automated verification script (lint, format, type check, test)
- Pre-commit hooks setup
- Configuration templates for ruff, mypy, pytest
- CI/CD templates (GitHub Actions, GitLab CI)
- Docker multi-stage build template
- Comprehensive best practices and troubleshooting guides

**Usage:**
- Triggered automatically when working with Python + uv projects
- Provides scripts and templates for project setup
- See [skills/python-uv-backend/SKILL.md](skills/python-uv-backend/SKILL.md) for details

**Packaged version:** `python-uv-backend.skill` (ready to install separately)

## Directory Purpose

### skills/
Agent Skills that extend Claude's capabilities with specialized knowledge, workflows, and tools. Each skill is a self-contained package with:
- `SKILL.md` - Instructions and documentation
- `scripts/` - Executable code (optional)
- `references/` - Reference documentation (optional)
- `assets/` - Templates and files (optional)

See [skills/README.md](skills/README.md) for more details.

### agents/
Standalone agent definitions for specialized AI assistants. Agents are configured for specific tasks or domains with custom prompts and tool access.

See [agents/README.md](agents/README.md) for more details.

### commands/
Custom slash commands for quick access to common workflows and templated responses.

See [commands/README.md](commands/README.md) for more details.

### hooks/
Hook configurations for automated actions triggered by events in Claude Code (e.g., auto-format after file edits).

See [hooks/README.md](hooks/README.md) for more details.

### scripts/
Shared utility scripts used by hooks, agents, and commands (e.g., formatters, linters, validators).

See [scripts/README.md](scripts/README.md) for more details.

## Contributing

### Adding a New Skill

1. Create directory: `skills/your-skill-name/`
2. Add `SKILL.md` with YAML frontmatter and instructions
3. Optionally add `scripts/`, `references/`, `assets/`
4. Test the skill
5. Package: `zip -r your-skill-name.skill skills/your-skill-name/`
6. Update this README

### Adding Other Components

- **Agents**: Create `.md` file in `agents/`
- **Commands**: Create `.md` file in `commands/`
- **Hooks**: Create or update `hooks.json` in `hooks/`
- **Scripts**: Add executable scripts to `scripts/`

## Plugin Development

This plugin follows the [Claude Code Plugin Structure](https://code.claude.com/docs/en/plugins-reference).

**Key files:**
- `.claude-plugin/plugin.json` - Plugin metadata and configuration
- Each component directory has its own README with detailed guidance

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Links

- **Repository**: https://github.com/iker592/skills
- **Claude Code Docs**: https://code.claude.com/docs
- **Issue Tracker**: https://github.com/iker592/skills/issues
