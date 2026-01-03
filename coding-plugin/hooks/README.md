# Hooks

This directory contains hook configurations for automated actions in Claude Code.

## What are Hooks?

Hooks are automated responses to events in Claude Code. They can:
- Run scripts after tool use
- Validate actions before execution
- Trigger notifications
- Automate workflows

## Configuration

Create `hooks.json` with event handlers:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format.sh"
          }
        ]
      }
    ]
  }
}
```

## Available Events

- `PreToolUse`, `PostToolUse`, `PostToolUseFailure`
- `PermissionRequest`, `UserPromptSubmit`
- `Notification`, `Stop`
- `SubagentStart`, `SubagentStop`
- `SessionStart`, `SessionEnd`, `PreCompact`

## Hook Types

- `command` - Run shell command
- `prompt` - Inject prompt
- `agent` - Launch agent

Place hook configuration files (`.json`) in this directory.
