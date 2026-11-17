/**
 * Brand Configuration System
 * Populated with the official Indian Garage Brand Book (Revised)
 */

window.BRAND_PRESETS = {
  indian_garage: {
    id: "indian_garage",
    name: "The Indian Garage Co.",
    tagline: "For Everyday Heroes",
    version: "v2.0 Revised",
    updated: "November 2026",
    creator: "The Indian Garage Design Team",
    parentGroup: "Aditya Birla Group",
    colors: {
      primary: "#1E2637",        // Garage Navy (Page 17/18)
      accent: "#D20000",         // Garage Red (Primary / Impact / Action)
      accentSecondary: "#D20000",
      background: "#FAFAFA",     // Indian Garage Off-White (Pantone 663 C)
      surface: "#FFFFFF",
      surfaceDark: "#0D1118",    // Navy 700
      textPrimary: "#1E2637",
      textMuted: "#676A70",      // Neutral 700
      border: "#E6E7E9",         // Neutral 200
      borderDark: "#171C28",
      technicalGrey: "#DCDCDC"   // Technical Grey (Utility / Grid / Support)
    },
    typography: {
      display: "'Bebas Neue', sans-serif",
      mono: "'JetBrains Mono', monospace",
      body: "'Montserrat', sans-serif"
    },
    strategy: {
      story: "In 2012, a young entrepreneur from Indore named Anant Tanted noticed something simple: Most Indian men had two choices—pay a premium for international brands or settle for outdated styles. With a ₹10 lakh government loan and a team of four, he built Indian Garage from the ground up into India's largest homegrown menswear brand.",
      purpose: "To build a thriving ecosystem where Indian entrepreneurs, manufacturers, and talent grow together while helping Indian men look their best and feel confident.",
      mission: "To make trend-first fashion accessible to 10 crore Indian men.",
      vision: "To become the #1 go-to fashion brand for men & be the most loved fashion brand for men.",
      promise: "High-quality, trendy fashion at incredible value.",
      positioning: "For the modern Indian man making his own way, Indian Garage is the homegrown menswear brand that makes high-quality tailored for Indian body and delivers the latest trends every week.",
      pillars: [
        {
          num: "01",
          title: "Customer First",
          description: "Every decision we make starts with one question: Is this customer-friendly? Tailored specifically for the Indian body and daily lifestyle."
        },
        {
          num: "02",
          title: "Incredible Value",
          description: "We bring the best possible quality for the price. Every single rupee counts — ours and our customers'. Phrased always as 'Worth It'."
        },
        {
          num: "03",
          title: "Collective Growth",
          description: "We grow with the people around us: our customers, local manufacturers, garment factories, and teams across India. Not at their expense — with them."
        },
        {
          num: "04",
          title: "Respect & Dignity",
          description: "We treat everyone with dignity. The customer, the vendor, the factory artisan, the intern. No one in the Indian Garage ecosystem is beneath respect."
        }
      ],
      voice: {
        attributes: [
          { name: "Everyday Hero / Relatable Bro", score: 92, left: "Corporate / Preachy", right: "Brotherly / Equal Footing" },
          { name: "Direct & Fast (Under 12 Words)", score: 95, left: "Elaborate / Stacking", right: "Short / Active / Punchy" },
          { name: "Confident & Witty", score: 88, left: "Formal / Stiff", right: "Witty / Conversational" }
        ],
        dos: [
          "Use short sentences — under 12 words. One idea per line.",
          "Use active voice ('We made it.'). Talk to one person — use 'you'.",
          "Lead with facts, fabric, fit, and function ('300 GSM, 100% cotton').",
          "Lead with fashion; phrase price as 'Worth It'.",
          "Use mainstream relatable slang: 'vibe', 'lowkey', 'sorted'.",
          "Masculine-coded copy: sharp, clean, sorted, solid, fits right."
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
      }
    },
    logo: {
      name: "G-Unit Monogram & Linear Wordmark",
      concept: "Constructed on a modular grid with fixed stroke thickness a, 1x vertical split, 2x horizontal negative space, and 45° diagonal curve alignment.",
      clearspaceRule: "Equal to the height of the monogram on all sides (X).",
      minSizeDigital: "24px height",
      minSizePrint: "8mm height"
    },
    objectStudio: {
      defaultHighlight: "#D20000",
      defaultBackground: "#FAFAFA",
      defaultModel: "logo",
      defaultCellSize: 5,
      defaultMargin: 0.15,
      defaultBanding: 1
    }
  },

  bloom: {
    id: "bloom",
    name: "Bloom Ventures",
    tagline: "Frontier Intelligence Venture Capital",
    version: "v2.4",
    updated: "November 2026",
    colors: {
      primary: "#0B0F14",
      background: "#FAFAF9",
      surface: "#FFFFFF",
      surfaceDark: "#11161E",
      accent: "#E2FB46",
      accentSecondary: "#FF4D26",
      textPrimary: "#0B0F14",
      textMuted: "#667085",
      border: "#E4E7EC",
      borderDark: "#232A36"
    },
    typography: {
      display: "'Space Grotesk', sans-serif",
      mono: "'JetBrains Mono', monospace",
      body: "'Inter', sans-serif"
    },
    strategy: {
      purpose: "Catalyzing exponential breakthroughs at the intersection of compute, design, and human curiosity.",
      mission: "To fund, build, and accelerate the iconic software architecture of the 2030s.",
      vision: "A world where computational leverage empowers hyper-creative teams.",
      pillars: [
        { num: "01", title: "Radical Computational Leverage", description: "Expand human capability by 100x." },
        { num: "02", title: "Brutalist Precision & Craft", description: "Every pixel engineered with obsessive craft." }
      ],
      voice: {
        attributes: [
          { name: "Direct & Unvarnished", score: 85, left: "Corporate", right: "Blunt" },
          { name: "Technically Lucid", score: 90, left: "Simplified", right: "Rigorous" }
        ],
        dos: ["Write short declarative sentences.", "Quote exact latency figures."],
        donts: ["Never use empty buzzwords.", "Never write corporate boilerplate."]
      }
    },
    objectStudio: {
      defaultHighlight: "#FF4D26",
      defaultBackground: "#FEFCEC",
      defaultModel: "bridge",
      defaultCellSize: 4,
      defaultMargin: 0.15,
      defaultBanding: 1
    }
  },

  whop: {
    id: "whop",
    name: "Whop",
    tagline: "The internet's marketplace for creators & software.",
    version: "v3.1",
    updated: "October 2026",
    colors: {
      primary: "#FF4500",
      background: "#FAFAFA",
      surface: "#FFFFFF",
      surfaceDark: "#18181B",
      accent: "#FF4500",
      accentSecondary: "#E2FB46",
      textPrimary: "#18181B",
      textMuted: "#71717A",
      border: "#E4E4E7",
      borderDark: "#27272A"
    },
    typography: {
      display: "'Space Grotesk', sans-serif",
      mono: "'JetBrains Mono', monospace",
      body: "'Inter', sans-serif"
    },
    strategy: {
      purpose: "Empowering millions of digital creators to monetize software and communities.",
      mission: "To build the economic backbone of internet commerce.",
      vision: "Anyone can scale an eight-figure digital business from their phone.",
      pillars: [
        { num: "01", title: "Internet-Native", description: "Built for software and memberships." }
      ],
      voice: {
        attributes: [
          { name: "Energetic & Punchy", score: 95, left: "Restrained", right: "Hyped" }
        ],
        dos: ["Bold claims backed by earnings.", "Punchy CTAs."],
        donts: ["Don't sound like a bank.", "No muted drab design."]
      }
    },
    objectStudio: {
      defaultHighlight: "#FF4500",
      defaultBackground: "#F5F5F0",
      defaultModel: "cube",
      defaultCellSize: 5,
      defaultMargin: 0.12,
      defaultBanding: 1
    }
  }
};

// Default active brand is Indian Garage Co.
window.CURRENT_BRAND = JSON.parse(JSON.stringify(window.BRAND_PRESETS.indian_garage));
