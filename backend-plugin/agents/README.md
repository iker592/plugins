# Agents

This directory contains standalone agent definitions that can be invoked by Claude Code.

## What are Agents?

Agents are specialized AI assistants configured for specific tasks or domains. They have:
- Custom system prompts
- Specific tool access
- Defined capabilities

## Directory Structure

Each agent is a Markdown file with frontmatter:

```markdown
---
name: agent-name
description: What this agent does
---

# Agent Instructions

Detailed instructions for the agent...
```

## Examples

Future agents might include:
- `security-reviewer.md` - Security-focused code reviewer
- `performance-tester.md` - Performance analysis specialist
- `api-designer.md` - REST API design expert

Place agent definition files (`.md`) in this directory.
