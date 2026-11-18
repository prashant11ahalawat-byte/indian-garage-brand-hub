/**
 * The Indian Garage Co. (TIGC) — Brand & Investor Configuration System
 * Official Data Dossier: Aditya Birla Group (TMRW) Series B Backed
 * Production: 6.5M+ units/year | ₹300+ Cr GMV scaling to ₹1,500 Cr
 */

window.BRAND_PRESETS = {
  indian_garage: {
    id: "indian_garage",
    name: "The Indian Garage Co.",
    legalEntity: "The Indian Garage Company Pvt. Ltd.",
    founded: "2012 (Indore, Madhya Pradesh)",
    founder: "Anant Tanted",
    tagline: "For Everyday Heroes",
    institutionalBacking: "Aditya Birla Group / TMRW (₹155 Crore Series B, Oct 2023)",
    annualVolume: "6,500,000+ Apparel Units / Year (~550,000 units/month)",
    currentRunRate: "₹300+ Crore GMV (Targeting ₹1,500 Crore by 2027)",
    brandAmbassador: "Suryakumar Yadav (SKY) — Indian T20 Captain",
    version: "v2.5 Institutional Edition",
    updated: "November 2026",
    
    colors: {
      primary: "#21335A",        // Official TIGC Deep Navy (Illustrator STACK-01/02)
      accent: "#DB2128",         // Official TIGC Garage Crimson (Illustrator STACK-01/03)
      accentSecondary: "#DB2128",
      background: "#FAFAFA",     // Clean Architectural Off-White
      surface: "#FFFFFF",
      surfaceDark: "#0B0F19",    // Dark Blueprint Navy
      textPrimary: "#182033",
      textMuted: "#64748B",
      border: "#E2E8F0",
      borderDark: "#1E293B",
      technicalGrey: "#CBD5E1",
      emeraldGain: "#10B981"
    },
    
    typography: {
      display: "'Bebas Neue', sans-serif",
      mono: "'JetBrains Mono', monospace",
      body: "'Montserrat', sans-serif"
    },

    objectStudio: {
      defaultModel: "logo",
      defaultHighlight: "#DB2128",
      defaultBackground: "#0B0F19",
      defaultCellSize: 5,
      defaultMargin: 0.15,
      defaultBanding: 1
    },

    financials: {
      seriesBInvestment: "₹155 Crore ($18.6 Million)",
      leadInvestor: "TMRW (House of Brands entity of Aditya Birla Fashion & Retail Ltd.)",
      gmv2023: "₹300+ Crore",
      gmv2027Target: "₹1,500 Crore",
      monthlyUnitsProduced: "500,000 – 600,000 units",
      denimUnitsSold: "2,800,000+ pairs",
      averageSellThrough: "88% in 45 days",
      ebosLive: "20+ Flagships",
      ebosRoadmap: "100+ Exclusive Brand Outlets across Tier 1, 2 & 3",
      supplyChainVelocity: "14 Days Concept-to-Shelf"
    },

    houseOfBrands: [
      {
        id: "tigc_men",
        name: "The Indian Garage Co.",
        category: "Fast-Fashion Menswear & Signature Denim",
        share: "68% of Total Volume",
        description: "Rugged, trend-first casual wear engineered for Indian men. Key categories: 13.5oz Stretch Denim, Cuban & Checked Shirts, Heavyweight 300 GSM Polos, Utility Cargos.",
        tagline: "For Everyday Heroes",
        targetAudience: "Men aged 18–35 across Metros, Tier 1 and Tier 2 cities",
        priceBand: "₹899 – ₹2,499"
      },
      {
        id: "freehand_women",
        name: "FreeHand",
        category: "Contemporary Fast-Fashion Womenswear",
        share: "20% of Total Volume",
        description: "Effortless everyday styles, modern fusion co-ords, flowy casual dresses, and chic urban workwear designed for the aspirational Indian woman.",
        tagline: "Breathe Free, Dress Bold",
        targetAudience: "Women aged 19–32 seeking runway trends without luxury markups",
        priceBand: "₹799 – ₹2,199"
      },
      {
        id: "hardsoda_plus",
        name: "HardSoda",
        category: "Plus-Size & Inclusive Streetwear (2XL to 7XL)",
        share: "12% of Total Volume",
        description: "Disrupting India's underserved plus-size category with drop-shoulder oversized tees, boxy jackets, and relaxed parachute pants. Zero compromising on cool.",
        tagline: "Big Energy. Zero Apologies.",
        targetAudience: "Gen-Z & Millennials demanding high-street streetwear in inclusive sizing",
        priceBand: "₹999 – ₹2,799"
      }
    ],

    strategy: {
      story: "In 2012, a young entrepreneur from Indore named Anant Tanted noticed something simple: Most Indian men had two choices—pay a steep premium for international labels or settle for outdated domestic styles. With a ₹10 lakh bootstrap loan and a team of four, he built The Indian Garage Co. from the ground up into one of India's largest fast-fashion powerhouses. In October 2023, Aditya Birla Group's digital venture TMRW backed TIGC with a landmark ₹155 Crore investment to fuel massive omnichannel and international expansion.",
      purpose: "To democratize high-street global trends for 10 Crore young Indians through agile, tech-led manufacturing and honest pricing.",
      mission: "To deliver runway-grade, ergonomically tailored fashion to every corner of India within 14 days of conception.",
      vision: "To build India's definitive ₹1,500 Crore fashion conglomerate with 100+ flagship retail stores and pan-Asian dominance.",
      promise: "Trend-first fashion engineered for the Indian lifestyle at unbeatable value.",
      positioning: "For the ambitious Indian man building his future, The Indian Garage Co. delivers world-class fit, durable craft, and weekly trend drops at honest price points.",
      
      pillars: [
        {
          num: "01",
          title: "Agile 14-Day Velocity",
          description: "Micro-batch manufacturing dropping 150+ new designs every month with algorithmic replenishment and 88% full-price sell-through."
        },
        {
          num: "02",
          title: "Tailored for the Indian Body",
          description: "Proprietary South Asian morphological pattern blocks: ergonomic rise, anti-gaping waistbands, and superior comfort stretch."
        },
        {
          num: "03",
          title: "Institutional Backing (Aditya Birla / TMRW)",
          description: "Backed by ₹155 Crore Series B capital, enterprise supply chain synergies, and nationwide retail real estate leverage."
        },
        {
          num: "04",
          title: "Omnichannel EBO Engine",
          description: "High-return franchise models (FOFO & FOCO) delivering 18–22% store EBITDA and 16–22 month capital payback."
        }
      ],

      voice: {
        attributes: [
          { name: "Everyday Hero / High-Agency", score: 94, left: "Passive / Corporate", right: "Punchy / Brotherly / Bold" },
          { name: "Fast & Direct (Under 12 Words)", score: 96, left: "Elaborate / Stacking", right: "Short / Action-First" },
          { name: "Honest & Fabric-Focused", score: 90, left: "Fluffy Marketing", right: "Specs & Real Fit" }
        ],
        dos: [
          "Use short sentences — under 12 words. One idea per line.",
          "Use active voice ('We made it.'). Talk to one person — use 'you'.",
          "Lead with facts, fabric specs, and fit ('300 GSM, 100% ring-spun cotton').",
          "Lead with fashion; phrase value as 'Worth It' (never 'cheap' or 'discount').",
          "Tone words: rugged, sorted, sharp, solid, fits right, engineered, unstoppable."
        ],
        donts: [
          "NEVER use competitor registered slogans ('Just Do It', 'Impossible is Nothing', 'Forever Faster').",
          "Never write long, complex sentences with stacked passive clauses.",
          "Never use empty corporate buzzwords ('synergistic', 'disruptive', 'paradigm shift').",
          "Never use supermarket discount phrasing ('loot', 'bumper offer', 'budget-friendly').",
          "Avoid feminine-coded descriptors for TIGC menswear: delicate, dainty, chic, graceful."
        ]
      }
    },

    franchiseModel: {
      formats: [
        {
          name: "High-Street Flagship",
          carpetArea: "2,000 – 3,500 sq.ft",
          idealLocations: "Brigade Road Bengaluru, Linking Road Mumbai, Hazratganj Lucknow",
          avgMonthlyTurnover: "₹35 – 55 Lakhs",
          ebitda: "20 – 22%",
          capex: "₹55 – 80 Lakhs (including initial inventory)",
          payback: "16 – 20 Months"
        },
        {
          name: "Mall Premium Outlet",
          carpetArea: "1,200 – 2,000 sq.ft",
          idealLocations: "Phoenix Palassio Lucknow, Lulu Mall Kochi, Nexus Koramangala",
          avgMonthlyTurnover: "₹25 – 42 Lakhs",
          ebitda: "18 – 21%",
          capex: "₹40 – 58 Lakhs (including initial inventory)",
          payback: "18 – 22 Months"
        }
      ]
    }
  }
};

window.CURRENT_BRAND = JSON.parse(JSON.stringify(window.BRAND_PRESETS.indian_garage));
