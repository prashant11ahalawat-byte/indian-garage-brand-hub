#!/usr/bin/env node

/**
 * Model Context Protocol (MCP) Server for The Indian Garage Co. Brand Hub.
 * Provides on-brand intelligence, design tokens, copy verification, and specs
 * to LLMs (Claude, Claude Code, Antigravity, Cursor, etc.) via JSON-RPC stdio.
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Official Indian Garage Brand Configuration (from Revised Brand Book)
let brandData = {
  name: "The Indian Garage Co.",
  tagline: "For Everyday Heroes",
  archetype: "Everyday Hero / The Underdog / Cultural Explorer / Fashion Wingman",
  parentGroup: "Aditya Birla Group",
  version: "v2.0 Revised",
  colors: {
    primary: "#1E2637",       // Garage Navy
    accent: "#D20000",        // Garage Red (Impact, Attention, Action)
    technicalGrey: "#DCDCDC", // Utility, Grid, Specs
    background: "#FAFAFA",    // Indian Garage Off-White (Pantone 663 C)
    surface: "#FFFFFF",
    surfaceDark: "#0D1118",   // Navy 700
    textPrimary: "#1E2637",
    textMuted: "#676A70",     // Neutral 700
    border: "#E6E7E9"
  },
  typography: {
    display: "Bebas Neue, sans-serif (5x Heading Ratio)",
    subheading: "Montserrat Medium, sans-serif (2.5x Ratio)",
    body: "Montserrat Regular, sans-serif (1.2x Ratio)",
    mono: "JetBrains Mono, monospace"
  },
  voice: {
    corePrinciple: "Keep it simple and interesting. Talk like a friend, not a brand. Show, don't sell.",
    tone: "Talk like a bro his own age — equal footing, never preachy. Confident, not loud; energy without desperation.",
    rules: {
      sentenceLimit: "Under 12 words per sentence. One idea per line.",
      voiceStyle: "Active voice ('We made it.'). Talk to one person — use 'you'.",
      attributes: [
        "Simple & Confident",
        "Witty & Relatable",
        "Masculine-Coded: sharp, clean, sorted, solid, fits right"
      ]
    },
    bannedWords: [
      "premium quality", "finest materials", "luxurious", "chic", "elegant",
      "graceful", "delicate", "dainty", "cheap", "affordable", "budget-friendly",
      "just for ₹1099", "loot", "bumper offer", "mega sale", "unbelievable deal",
      "steal", "gyat", "rizz", "delulu", "-core", "synergistic", "game-changing",
      "dear valued customer", "kindly note", "our customers"
    ],
    dos: [
      "Use short sentences — under 12 words. One idea per line.",
      "Use active voice ('We made it.'). Talk to one person — use 'you'.",
      "Lead with facts, fabric, fit, and function ('300 GSM, 100% cotton').",
      "Lead with fashion; phrase price as 'Worth It'.",
      "Use mainstream slang: 'vibe', 'lowkey', 'sorted'.",
      "Use masculine-coded language: sharp, clean, sorted, solid, fits right."
    ],
    donts: [
      "Never write long, complicated sentences stacking multiple ideas.",
      "Never use passive voice or address crowds ('our customers').",
      "Never use unprovable adjectives ('premium quality', 'finest materials').",
      "Avoid words like cheap, affordable, budget-friendly, or 'Just for ₹1099'.",
      "Never use cringe Gen-Z slang ('gyat', 'rizz', 'delulu', '-core').",
      "Never use supermarket sales phrases: 'loot', 'bumper offer', 'unbelievable deal'.",
      "Avoid feminine-coded descriptors: chic, elegant, graceful, delicate, dainty."
    ]
  },
  logo: {
    monogram: "G-Unit geometric interlocking monogram",
    lockup: "INDIAN [IG] GARAGE",
    clearspace: "Equal to the height of the monogram on all sides (X)",
    minDigital: "24px height",
    minPrint: "8mm height",
    rules: [
      "Always maintain clear space equal to the height of the monogram on all sides.",
      "Never alter the G-unit monogram internal split (1x) or negative space (2x).",
      "Never stretch, rotate, or modify the 45° corner curves."
    ]
  }
};

// Tool definitions for MCP
const TOOLS = [
  {
    name: "get_brand_rules",
    description: "Returns official Indian Garage brand guidelines, tone of voice, copy rules, and system prompt instructions for generating on-brand content.",
    inputSchema: {
      type: "object",
      properties: {
        channel: {
          type: "string",
          description: "Target context: 'social_media', 'website_product', 'bof_ads', 'push_notifications', 'retail_instore', 'crm_emails'",
          enum: ["social_media", "website_product", "bof_ads", "push_notifications", "retail_instore", "crm_emails", "all"]
        }
      }
    }
  },
  {
    name: "get_color_palette",
    description: "Returns official Indian Garage hex, RGB, CMYK, and role descriptions for Garage Red (#D20000), Garage Navy (#1E2637), and Technical Grey.",
    inputSchema: {
      type: "object",
      properties: {}
    }
  },
  {
    name: "get_typography_specs",
    description: "Returns approved font families: Bebas Neue (Headlines 5x) and Montserrat (Subheading 2.5x, Body 1.2x).",
    inputSchema: {
      type: "object",
      properties: {}
    }
  },
  {
    name: "audit_copy",
    description: "Audits drafted copy against Indian Garage tone rules (under 12 words/sentence, active voice, bans words like 'cheap/loot/chic/delulu').",
    inputSchema: {
      type: "object",
      required: ["text"],
      properties: {
        text: {
          type: "string",
          description: "Marketing copy, caption, or headline to audit."
        }
      }
    }
  },
  {
    name: "export_design_tokens",
    description: "Exports Indian Garage design tokens in CSS Custom Properties, Tailwind Config, or JSON format.",
    inputSchema: {
      type: "object",
      properties: {
        format: {
          type: "string",
          enum: ["css", "tailwind", "json"],
          default: "css"
        }
      }
    }
  }
];

function handleToolCall(name, args) {
  switch (name) {
    case "get_brand_rules": {
      const channel = args.channel || "all";
      let channelNote = "";
      if (channel === "social_media") channelNote = "Loosest, most playful. Friends talking — banter, quick takes. Casual Hinglish welcome.";
      else if (channel === "website_product") channelNote = "Simple language. Describe fashion, fabric, fit, function. Clear first, charming second.";
      else if (channel === "bof_ads") channelNote = "Direct and confident. No begging, no urgency countdown tricks. Give a reason, not a timer.";
      else if (channel === "push_notifications") channelNote = "Short, sharp, worth the interruption. If it doesn't earn the tap, don't send it.";
      else if (channel === "crm_emails") channelNote = "Warm and accountable. Wit goes down, clarity goes up. No 'Dear valued customer'.";

      return {
        brand: brandData.name,
        tagline: brandData.tagline,
        archetype: brandData.archetype,
        channelGuidance: channelNote || "Consistent voice across all touchpoints.",
        rules: {
          sentenceLimit: brandData.voice.rules.sentenceLimit,
          dos: brandData.voice.dos,
          donts: brandData.voice.donts,
          bannedWords: brandData.voice.bannedWords
        },
        systemPromptSnippet: `You represent ${brandData.name} ("${brandData.tagline}"). Talk like a relatable, stylish bro his own age on equal footing. Keep sentences under 12 words. Lead with fabric, fit, and function ("300 GSM, 100% cotton"). Never use supermarket words (cheap, loot, deal) or feminine terms (chic, elegant). Banned: ${brandData.voice.bannedWords.slice(0, 10).join(', ')}.`
      };
    }

    case "get_color_palette": {
      return {
        brand: brandData.name,
        palette: brandData.colors,
        printSpecs: {
          garageRed: { hex: "#D20000", rgb: "210 / 0 / 0", cmyk: "11 / 100 / 100 / 3" },
          garageNavy: { hex: "#1E2637", rgb: "30 / 38 / 55", cmyk: "86 / 76 / 51 / 58" },
          technicalGrey: { hex: "#DCDCDC", rgb: "220 / 220 / 220", cmyk: "12 / 9 / 10 / 0" },
          offWhite: { hex: "#FAFAFA", rgb: "250 / 250 / 250", pantone: "663 C" }
        }
      };
    }

    case "get_typography_specs": {
      return {
        brand: brandData.name,
        hierarchy: [
          { role: "Heading (Primary Display)", font: "Bebas Neue", ratio: "5x maximum height", style: "All-Caps Condensed" },
          { role: "Subheading", font: "Montserrat Medium", ratio: "2.5x height" },
          { role: "Running Text", font: "Montserrat Regular", ratio: "1.2x height" },
          { role: "Technical / Specs", font: "JetBrains Mono", ratio: "1.0x height" }
        ],
        rule: "All type measurements are based on uppercase 'H'. Maintain clear space around text equal to letter height (x)."
      };
    }

    case "audit_copy": {
      const text = args.text || "";
      const lower = text.toLowerCase();
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const longSentences = sentences.filter(s => s.trim().split(/\s+/).length > 12);

      const flaggedBanned = brandData.voice.bannedWords.filter(word => lower.includes(word.toLowerCase()));
      const isPassive = /\b(is|are|was|were|been|being)\s+([a-z]+ed)\b/i.test(text);
      const addressesCrowd = /\b(our customers|valued customer|dear customer)\b/i.test(text);

      const pass = flaggedBanned.length === 0 && !isPassive && longSentences.length === 0 && !addressesCrowd;

      return {
        passedAudit: pass,
        score: pass ? 96 : Math.max(40, 96 - flaggedBanned.length * 20 - longSentences.length * 15 - (isPassive ? 15 : 0)),
        wordCount: text.split(/\s+/).filter(Boolean).length,
        longSentences: longSentences.map(s => `"${s.trim()}" exceeds 12 words (${s.trim().split(/\s+/).length} words)`),
        flaggedBannedWords: flaggedBanned,
        passiveVoiceDetected: isPassive,
        verdict: pass ? "Approved for Indian Garage digital/social media." : "Revisions needed to match Indian Garage tone."
      };
    }

    case "export_design_tokens": {
      const fmt = args.format || "css";
      if (fmt === "json") {
        return brandData;
      } else if (fmt === "tailwind") {
        return {
          theme: {
            extend: {
              colors: {
                garage: {
                  red: "#D20000",
                  navy: "#1E2637",
                  grey: "#DCDCDC",
                  offwhite: "#FAFAFA"
                }
              },
              fontFamily: {
                display: ["Bebas Neue", "sans-serif"],
                subheading: ["Montserrat", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"]
              }
            }
          }
        };
      } else {
        return {
          css: `:root {\n  --color-garage-red: #D20000;\n  --color-garage-navy: #1E2637;\n  --color-technical-grey: #DCDCDC;\n  --color-offwhite: #FAFAFA;\n  --font-display: 'Bebas Neue', sans-serif;\n  --font-body: 'Montserrat', sans-serif;\n  --font-mono: 'JetBrains Mono', monospace;\n}`
        };
      }
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// JSON-RPC 2.0 Stdio loop
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  if (!line.trim()) return;
  try {
    const msg = JSON.parse(line);
    const id = msg.id;

    if (msg.method === 'initialize') {
      const response = {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          serverInfo: {
            name: "indian-garage-brand-mcp",
            version: "2.0.0"
          },
          capabilities: { tools: {} }
        }
      };
      process.stdout.write(JSON.stringify(response) + '\n');
    } else if (msg.method === 'tools/list') {
      const response = {
        jsonrpc: "2.0",
        id,
        result: { tools: TOOLS }
      };
      process.stdout.write(JSON.stringify(response) + '\n');
    } else if (msg.method === 'tools/call') {
      const params = msg.params || {};
      try {
        const result = handleToolCall(params.name, params.arguments || {});
        const response = {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
          }
        };
        process.stdout.write(JSON.stringify(response) + '\n');
      } catch (err) {
        process.stdout.write(JSON.stringify({
          jsonrpc: "2.0",
          id,
          error: { code: -32000, message: err.message }
        }) + '\n');
      }
    } else if (msg.method === 'notifications/initialized') {
      // client ACK
    } else {
      process.stdout.write(JSON.stringify({
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: "Method not found" }
      }) + '\n');
    }
  } catch (e) {
    // Malformed JSON
  }
});
