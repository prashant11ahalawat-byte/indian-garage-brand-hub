# The Indian Garage Co. — Interactive Brand Hub & Coded Asset Studio

> **"For Everyday Heroes. Built from the ground up with raw energy, obsessive craft, and zero shortcuts."**

A next-generation, living digital brand portal built to replace dead PDF guidelines. Inspired by the interactive brand systems developed by Nonstop HQ and Bloom Ventures, tailored with the official **The Indian Garage Co. (TIGC)** brand book (Aditya Birla Group).

---

## ✨ Features & Architecture

### 1. Interactive Digital Brand Portal
- **Numbered Swiss/Editorial Structure**: Chapters 00 to 11 with smooth scroll spy, mobile drawer, and high-contrast dark/light theme.
- **Brand Story & Archetype**: The Underdog, The Cultural Explorer, The Fashion Wingman.
- **Brand Personality Sliders**: Visualizing masculine vs feminine (85%), casual (75%), effortless (70%), and relatable (90%).
- **Tone Guide & Do's / Don'ts**: Concrete copywriting rules (under 12 words per sentence, active voice, fabric/fit/function first, price as "Worth It", no supermarket jargon like "loot/deal", no feminine terms like "chic/dainty").
- **Interactive Copy Auditor**: In-browser NLP tool that grades drafted marketing copy in real-time against Indian Garage rules.

### 2. Precision Logo & Typography System
- **G-Unit Monogram & Linear Lockup**: Exact vector rendering based on the 1x vertical split and 2x negative space grid.
- **Interactive Safe-Zone Visualizer**: Toggle protected clearspace equal to monogram height ($X$).
- **Official Color Palette**:
  - **Garage Red**: `#D20000` (RGB: 210, 0, 0 | CMYK: 11, 100, 100, 3)
  - **Garage Navy**: `#1E2637` (RGB: 30, 38, 55 | CMYK: 86, 76, 51, 58)
  - **Technical Grey**: `#DCDCDC` (RGB: 220, 220, 220 | CMYK: 12, 9, 10, 0)
  - **Off-White**: `#FAFAFA` (RGB: 250, 250, 250 | Pantone 663 C)
  - Full 50–900 extended scale for Red, Navy, and Neutral Grey.
- **Official Typography**:
  - Headlines (5x Ratio): **Bebas Neue** (Condensed All-Caps Display)
  - Subheadings (2.5x Ratio): **Montserrat Medium**
  - Running Body Text (1.2x Ratio): **Montserrat Regular**
  - Technical Specs: **JetBrains Mono**
  - Live interactive type tester with real-time size, weight, and line-height sliders.

### 3. Coded Generative 3D Asset Studio ("Object Studio")
- Embedded real-time Canvas 3D engine inspired by Nonstop's "Bloom Object Studio".
- 3D Models: Architectural Suspension Bridge, Indian Garage Monogram, Monolith, Slanted Voxel Cube, Helix.
- Camera view modes: Front, 3/4, Side, Hero Orbit.
- Parametric sliders: Cell Size, Margin, Levels / Density, Banding, Ambient Occlusion Shadow, Palette Swatches.
- Instant High-Resolution Export: Export to PNG, Vector SVG, or Data URL.

### 4. Model Context Protocol (MCP) Server for AI Workflows
- Zero-dependency Node.js server (`mcp-server/index.js`) compatible with Claude, Claude Code, Cursor, and Antigravity.
- Connect your brand guidelines directly to AI agents to generate 100% on-brand campaigns, descriptions, and tokens.
- Tools provided:
  - `get_brand_rules`: Ingests channel-specific tone of voice and system prompts.
  - `get_color_palette`: Hex, RGB, CMYK, and WCAG AA/AAA pairings.
  - `get_typography_specs`: Font stacks and hierarchy ratios.
  - `audit_copy`: Programmatic copy compliance checker.
  - `export_design_tokens`: Exports CSS, Tailwind, or JSON tokens.

---

## 🚀 Quick Start

### Start the Brand Hub Web App
```bash
cd /Users/prashantahalawat/.gemini/antigravity/scratch/brand-hub
npm start
# Open http://localhost:3000 in your browser
```

### Connect to Claude Desktop
Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "indian-garage-hub": {
      "command": "node",
      "args": [
        "/Users/prashantahalawat/.gemini/antigravity/scratch/brand-hub/mcp-server/index.js"
      ]
    }
  }
}
```

### Connect to Claude Code CLI
```bash
claude mcp add --transport stdio indian-garage-hub node /Users/prashantahalawat/.gemini/antigravity/scratch/brand-hub/mcp-server/index.js
```
