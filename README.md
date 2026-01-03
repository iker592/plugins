# Claude Code Plugins

A collection of Claude Code plugins for development workflows, skills, agents, and automation.

## Available Plugins

### [coding-plugin](./coding-plugin/)

Comprehensive coding plugin for Python backend development with uv package manager.

**Features:**
- **Skills**: python-uv-backend skill with verification scripts, templates, and best practices
- **Agents**: Placeholder for specialized development agents
- **Commands**: Placeholder for custom slash commands
- **Hooks**: Placeholder for automated workflows

**Installation:**
```
https://github.com/iker592/plugins/coding-plugin
```

**Documentation:** [coding-plugin/README.md](./coding-plugin/README.md)

### [frontend-plugin](./frontend-plugin/)

Comprehensive frontend development plugin for TypeScript, React, and Vite projects using Bun.

**Features:**
- **Skills**: bun-vite-react skill with verification workflows, templates, and best practices
- **Agents**: react-ts-reviewer agent for comprehensive code review
- **Verification**: ESLint, Prettier, TypeScript, Vitest with coverage
- **Templates**: Configuration files for Bun + Vite + React + TypeScript projects
- **CI/CD**: GitHub Actions and Docker templates

**Installation:**
```
https://github.com/iker592/plugins/frontend-plugin
```

**Documentation:** [frontend-plugin/README.md](./frontend-plugin/README.md)

## Installation

To install a plugin in Claude Code:

1. Open Claude Code settings
2. Navigate to Plugins section
3. Add plugin URL: `https://github.com/iker592/plugins/<plugin-name>`

Or clone locally:

```bash
git clone https://github.com/iker592/plugins.git
# Add local path to Claude Code settings
```

## Plugin Structure

Each plugin follows the [Claude Code Plugin Structure](https://code.claude.com/docs/en/plugins-reference):

```
plugin-name/
├── .claude-plugin/           # Plugin metadata
│   └── plugin.json          # Required configuration
├── skills/                   # Agent Skills
├── agents/                   # Standalone agents
├── commands/                 # Slash commands
├── hooks/                    # Event hooks
├── scripts/                  # Utility scripts
├── LICENSE                   # License file
└── README.md                # Plugin documentation
```

## Creating a New Plugin

1. Create directory: `mkdir my-plugin`
2. Add `.claude-plugin/plugin.json` with metadata
3. Add components: skills, agents, commands, hooks, scripts
4. Add README.md documenting the plugin
5. Test the plugin
6. Submit a pull request

## Repository Structure

```
plugins/
├── coding-plugin/           # Python development plugin
├── (future plugins)         # More plugins coming soon
└── README.md               # This file
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add or improve a plugin
4. Test thoroughly
5. Submit a pull request

## License

Each plugin has its own license. See individual plugin directories for details.

## Links

- **Repository**: https://github.com/iker592/plugins
- **Claude Code Docs**: https://code.claude.com/docs
- **Plugin Reference**: https://code.claude.com/docs/en/plugins-reference
- **Issue Tracker**: https://github.com/iker592/plugins/issues
