# Commands

This directory contains custom slash commands for Claude Code.

## What are Commands?

Commands are shortcuts that users can invoke with `/command-name` syntax. They provide:
- Quick access to common workflows
- Templated responses
- Structured prompts

## Directory Structure

Each command is a Markdown file:

```markdown
---
name: command-name
description: Brief description
---

# Command Content

Instructions or template that gets executed when command is invoked...
```

## Examples

Future commands might include:
- `review.md` - `/review` - Quick code review
- `test.md` - `/test` - Generate tests for code
- `deploy.md` - `/deploy` - Deployment checklist

Place command definition files (`.md`) in this directory.
