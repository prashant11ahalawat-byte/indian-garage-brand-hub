# Brand Hub MCP Server

Connect your live Brand Guidelines, Design Tokens, and Copy Voice to any AI assistant (Claude, Claude Code, Antigravity, Cursor) via the [Model Context Protocol](https://modelcontextprotocol.io/).

## Available Tools

1. **`get_brand_rules`**: Pulls tone of voice, pillars, and system prompt snippet for any channel.
2. **`get_color_palette`**: Returns official hex, RGB, role descriptions, and contrast pairings.
3. **`get_typography_specs`**: Font stacks, weights, hierarchy, and modular scale.
4. **`audit_copy`**: Automated copy compliance checker (detects corporate cliches, passive voice, word count).
5. **`export_design_tokens`**: Design tokens formatted in CSS, Tailwind, or JSON.

---

## 1. Claude Desktop Setup

Add this snippet to your `claude_desktop_config.json` (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "brand-hub": {
      "command": "node",
      "args": [
        "/Users/prashantahalawat/.gemini/antigravity/scratch/brand-hub/mcp-server/index.js"
      ]
    }
  }
}
```

---

## 2. Claude Code CLI Setup

Run:

```bash
claude mcp add --transport stdio brand-hub node /Users/prashantahalawat/.gemini/antigravity/scratch/brand-hub/mcp-server/index.js
```

---

## 3. Antigravity Setup

Add to your `mcpSettings.json`:

```json
{
  "mcpServers": {
    "brand-hub": {
      "command": "node",
      "args": [
        "/Users/prashantahalawat/.gemini/antigravity/scratch/brand-hub/mcp-server/index.js"
      ]
    }
  }
}
```

---

## 4. Cursor Setup

Under **Cursor Settings > Features > MCP**, click **Add New MCP Server**:
- **Name**: `brand-hub`
- **Type**: `command`
- **Command**: `node /Users/prashantahalawat/.gemini/antigravity/scratch/brand-hub/mcp-server/index.js`
