const fs = require('fs');

const optimizations = {
  "seo-15-mistakes-building-home-pune-2026.ts": {
    desc_old: "Planning to build a house in Pune? Avoid these 15 costly construction mistakes covering soil testing, PMC/PCMC rules, budgets, and turnkey execution.",
    desc_new: "Planning to build a house in Pune? Avoid these 15 costly construction mistakes covering soil testing, PMC/PCMC rules, budgets, and turnkey executions."
  },
  "seo-3-interior-styles-never-heard-of.ts": {
    title_old: "3 Interior Styles You\\",
    title_new: "3 Interior Styles You Have Never Heard Of Before (2026)",
    desc_old: "Looking beyond modern and traditional? Architect Manohar reveals 3 unique interior design styles for your Pune home: Bauhaus, Mid-Century Modern, and Dopamine Decor.",
    desc_new: "Looking beyond modern and traditional? Architect Manohar reveals 3 unique interior design styles for your Pune home: Bauhaus, Mid-Century, and Dopamine."
  },
  "seo-3-things-to-make-villa-premium.ts": {
    desc_old: "Planning a luxury villa in Pune? Architect Manohar reveals 3 architectural secrets to make it look truly premium: floating walls, frameless doors, and corner windows.",
    desc_new: "Planning a luxury villa in Pune? Architect Manohar reveals 3 architectural secrets to make it look truly premium: floating walls and frameless doors."
  },
  "seo-4-bhk-house-construction-cost-pune-2026.ts": {
    desc_old: "Planning to build a 4 BHK duplex or villa in Pune? Discover the exact house construction cost per sq ft for 2026. Get room sizes, budget splits, and expert tips.",
    desc_new: "Planning to build a 4 BHK duplex or villa in Pune? Discover the exact house construction cost per sq ft for 2026. Get room sizes, and budget splits."
  },
  "seo-aac-blocks-vs-red-bricks-pune.ts": {
    title_old: "AAC Blocks vs Red Bricks for House Construction in Pune (2026)",
    title_new: "AAC Blocks vs Red Bricks for House Construction in Pune"
  },
  "seo-architect-fees-in-pune-2026.ts": {
    title_old: "Architect Fees in Pune (2026)",
    title_new: "A Complete Guide to Architect Fees in Pune for 2026"
  },
  "seo-architect-fees-in-pune.ts": {
    title_old: "Architect Fees in Pune (2026)",
    title_new: "A Complete Guide to Architect Fees in Pune for 2026"
  },
  "seo-architects-in-aundh-pune.ts": {
    desc_old: "Looking for the best architects in Aundh, Pune? MIVIZ Architects specializes in custom luxury villas, turnkey construction, and premium interior design for Aundh homeowners.",
    desc_new: "Looking for the best architects in Aundh, Pune? MIVIZ Architects specializes in custom luxury villas, turnkey construction, and premium interior design."
  },
  "seo-architects-in-baner-pune.ts": {
    title_old: "Best Architects in Baner, Pune | Luxury Villa & Home Designers",
    title_new: "Best Architects in Baner, Pune | Luxury Villa Designers"
  },
  "seo-architects-in-kalyani-nagar-pune.ts": {
    title_old: "Top Architects in Kalyani Nagar, Pune | Luxury Villa Designers",
    title_new: "Top Architects in Kalyani Nagar | Luxury Villa Designers",
    desc_old: "Looking for the best architects in Kalyani Nagar, Pune? MIVIZ Architects specializes in ultra-luxury villas, premium bungalow renovations, and turnkey construction.",
    desc_new: "Looking for the best architects in Kalyani Nagar, Pune? MIVIZ Architects specializes in ultra-luxury villas, premium bungalow renovations, and turnkey."
  },
  "seo-architects-in-koregaon-park-pune.ts": {
    title_old: "Top Architects in Koregaon Park, Pune | Luxury Villa Designers",
    title_new: "Top Architects in Koregaon Park | Luxury Villa Designers",
    desc_old: "Looking for the best architects in Koregaon Park, Pune? MIVIZ Architects specializes in ultra-luxury villas, premium bungalow renovations, and bespoke interior design.",
    desc_new: "Looking for the best architects in Koregaon Park, Pune? MIVIZ Architects specializes in ultra-luxury villas, premium bungalow renovations, and interiors."
  },
  "seo-architects-in-pune.ts": {
    title_old: "Architects in Pune",
    title_new: "Top Architects in Pune | Luxury Villa & Home Designers",
    desc_old: "Looking for the best architects in Pune? MIVIZ is a premium architecture firm in Pune specializing in luxury villas, residential, and commercial designs. Contact us today.",
    desc_new: "Looking for the best architects in Pune? MIVIZ is a premium architecture firm specializing in luxury villas, residential, and commercial design spaces.",
    h1_old: "Architects in Pune",
    h1_new: "Top Architects in Pune"
  },
  "seo-architecture-firm-in-pune.ts": {
    desc_old: "Looking for the best architecture firm in Pune? Discover the difference between firms and solo architects, compare 2026 fees, and learn how to hire the right team.",
    desc_new: "Looking for the best architecture firm in Pune? Discover the difference between firms and solo architects, compare fees, and learn how to hire the best."
  },
  "seo-architecture-vs-interior-design-pune-2026.ts": {
    title_old: "Architecture vs Interior Design in Pune (2026)",
    title_new: "Architecture vs Interior Design in Pune: 2026 Guide",
    desc_old: "Building in Pune? Discover the exact differences between an Architect and an Interior Designer, fee comparisons, PMC rules, and why integrated design saves lakhs.",
    desc_new: "Building in Pune? Discover the exact differences between an Architect and an Interior Designer, fee comparisons, PMC rules, and why integrated designs."
  },
  "seo-best-architect-near-me.ts": {
    title_old: "Best Architect Near Me (Pune 2026): Your Ultimate Hiring Guide",
    title_new: "Best Architect Near Me in Pune: Ultimate 2026 Guide"
  },
  "seo-best-house-designs-pune-climate.ts": {
    title_old: "Best House Designs for Pune\\",
    title_new: "The Best House Designs for the Pune Climate in 2026",
    desc_old: "Learn the best architectural house designs for Pune\\",
    desc_new: "Learn the best architectural house designs for Pune's unique climate. We explore ventilation, shading, and materials for sustainable and cool modern homes."
  },
  "seo-best-interior-decorators-in-pune.ts": {
    title_old: "Best Interior Decorators in Pune (2026): Read This Before Hiring",
    title_new: "Best Interior Decorators in Pune: Read Before Hiring"
  },
  "seo-best-interior-designer-in-pune.ts": {
    desc_old: "Searching for the best interior designer in Pune? Discover why luxury homeowners choose architectural turnkey firms over standard decorators for premium execution.",
    desc_new: "Searching for the best interior designer in Pune? Discover why luxury homeowners choose architectural turnkey firms over standard decorators for premium."
  },
  "seo-best-interiors-in-pune.ts": {
    title_old: "Best Interiors in Pune (2026): Trends, Costs, & Luxury Execution",
    title_new: "Best Interiors in Pune (2026): Trends & Luxury Execs"
  },
  "seo-commercial-architects-pune.ts": {
    title_old: "Commercial Architects in Pune",
    title_new: "Top Commercial Architects in Pune | Office Designers"
  },
  "seo-complete-house-design-process-pune.ts": {
    desc_old: "Learn the complete 6-step process of designing and building a house in Pune. An architect explains floor planning, PMC approvals, structural engineering, and construction.",
    desc_new: "Learn the complete 6-step process of designing and building a house in Pune. An architect explains floor planning, PMC approvals, and structural designs."
  },
  "seo-elderly-parents-bedroom-design.ts": {
    title_old: "Designing a Bedroom for Elderly Parents in Pune | Architect Guide",
    title_new: "How to Design a Bedroom for Elderly Parents in Pune",
    desc_old: "Planning a bedroom for your elderly parents? Architect Manohar reveals 3 crucial design tips for safety and comfort: higher beds, rounded corners, and emergency buttons.",
    desc_new: "Planning a bedroom for your elderly parents? Architect Manohar reveals 3 crucial design tips for safety and comfort: higher beds, and rounded corners."
  },
  "seo-elevation-design-mistakes-to-avoid.ts": {
    title_old: "Avoid These 3 Home Elevation Design Mistakes (Pune Architect)",
    title_new: "Avoid These 3 Home Elevation Design Mistakes in Pune",
    desc_old: "Planning a villa in Pune? Architect Manohar explains the 3 biggest front elevation design mistakes: drainage failures, ignoring night views, & high-maintenance materials.",
    desc_new: "Planning a villa in Pune? Architect Manohar explains the 3 biggest front elevation design mistakes: drainage failures, and high-maintenance materials."
  },
  "seo-home-construction-timeline-pune-2026.ts": {
    title_old: "Complete Home Construction Timeline (2026)",
    title_new: "The Complete Home Construction Timeline in Pune (2026)",
    desc_old: "Building a home in Pune? Discover the month-by-month construction timeline from plot survey, PMC/PCMC approvals, and RCC slab casting to final interior handover.",
    desc_new: "Building a home in Pune? Discover the month-by-month construction timeline from plot survey, PMC/PCMC approvals, and RCC slab casting to the handover."
  },
  "seo-home-interior-designer-pune.ts": {
    desc_old: "Looking for a home interior designer in Pune? Discover the ultimate guide to hiring luxury interior designers, comparing costs, and understanding turnkey interiors.",
    desc_new: "Looking for a home interior designer in Pune? Discover the ultimate guide to hiring luxury interior designers, comparing costs, and understanding turnkey."
  },
  "seo-house-construction-cost-pune.ts": {
    title_old: "House Construction Cost in Pune (2026)",
    title_new: "House Construction Cost in Pune: A Complete 2026 Guide"
  },
  "seo-house-plans-small-plots-pune-2026.ts": {
    title_old: "Best House Plans for Small Plots in Pune (2026)",
    title_new: "The Best House Plans for Small Plots in Pune (2026)"
  },
  "seo-interior-designers-pune.ts": {
    title_old: "Interior Designers in Pune",
    title_new: "Top Interior Designers in Pune | Premium Luxury Homes",
    desc_old: "Looking for the best interior designers in Pune? MIVIZ specializes in luxury residential and commercial interior design with turnkey execution and 3D design walkthroughs.",
    desc_new: "Looking for the best interior designers in Pune? MIVIZ specializes in luxury residential and commercial interior design with premier turnkey executions."
  },
  "seo-luxury-villa-design-pune.ts": {
    title_old: "Luxury Villa Design in Pune",
    title_new: "Modern Luxury Villa Design in Pune | Top Architects"
  },
  "seo-modern-luxury-villa-design-pune-2026.ts": {
    desc_old: "Discover 2026\\",
    desc_new: "Discover the 2026 trends for modern luxury villa design in Pune. We explore open floor plans, premium materials, sustainable features, and smart home automation."
  },
  "seo-modern-vastu-tips-homes-pune-2026.ts": {
    title_old: "Modern Vastu Tips for Homes (2026)",
    title_new: "Essential Modern Vastu Tips for Homes in Pune (2026)",
    desc_old: "Building a home in Pune? Discover how modern architects balance Vastu Shastra with luxury design, open floor plans, and contemporary aesthetics.",
    desc_new: "Building a home in Pune? Discover how modern architects balance Vastu Shastra with luxury design, open floor plans, and contemporary home aesthetics."
  },
  "seo-reduce-house-construction-costs-pune.ts": {
    desc_old: "Want to save money building a house in Pune? An architect explains how to reduce construction costs by optimizing steel, using AAC blocks, and choosing smart materials.",
    desc_new: "Want to save money building a house in Pune? An architect explains how to reduce construction costs by optimizing steel, using AAC blocks, and materials."
  },
  "seo-residential-architects-pune.ts": {
    title_old: "Residential Architects Pune",
    title_new: "Top Residential Architects in Pune | Villa Designers"
  },
  "seo-restaurant-interior-design-pune.ts": {
    title_old: "Restaurant Interior Design in Pune",
    title_new: "Restaurant Interior Design in Pune | Top Designers",
    desc_old: "Create unforgettable dining experiences with MIVIZ, experts in restaurant interior design in Pune. We design cafes, bars, and fine dining spaces that attract customers.",
    desc_new: "Create unforgettable dining experiences with MIVIZ, experts in restaurant interior design in Pune. We design cafes, bars, and premium fine dining spaces."
  },
  "seo-top-10-architects-in-pune.ts": {
    desc_old: "Discover the top 10 architects in Pune for 2026. Compare the best residential firms, explore their fees, and learn how to hire the right architect for your luxury home.",
    desc_new: "Discover the top 10 architects in Pune for 2026. Compare the best residential firms, explore their fees, and learn how to hire the right architect team."
  },
  "seo-top-10-interior-designers-in-pune.ts": {
    desc_old: "Discover the top 10 interior designers in Pune for luxury homes and apartments. Compare execution capabilities, turnkey costs, and find the best firm for your project.",
    desc_new: "Discover the top 10 interior designers in Pune for luxury homes and apartments. Compare execution capabilities, turnkey costs, and find the best firms."
  },
  "seo-top-ten-architects-in-pune.ts": {
    desc_old: "Looking for the top 10 architects in Pune? Discover the best residential and commercial architecture firms, compare 2026 fees, and learn how to hire the right expert.",
    desc_new: "Looking for the top 10 architects in Pune? Discover the best residential and commercial architecture firms, compare 2026 fees, and learn how to hire."
  },
  "seo-turnkey-architecture-pune.ts": {
    title_old: "Turnkey Architecture in Pune",
    title_new: "Premium Turnkey Architecture in Pune | Top Designers",
    desc_old: "Experience stress-free construction with MIVIZ, the premier firm for turnkey architecture in Pune. We handle everything from conceptual design to final handover.",
    desc_new: "Experience stress-free construction with MIVIZ, the premier firm for turnkey architecture in Pune. We handle everything from concept to final handover."
  },
  "seo-turnkey-construction-pune-2026.ts": {
    desc_old: "The ultimate 2026 guide to turnkey construction in Pune. Compare costs (per sq ft), understand the architect-led process, and learn how to avoid contractor scams.",
    desc_new: "The ultimate 2026 guide to turnkey construction in Pune. Compare costs (per sq ft), understand the architect-led process, and learn how to avoid scams."
  },
  "seo-turnkey-vs-traditional-construction-pune-2026.ts": {
    desc_old: "Building a home in Pune? Compare Turnkey vs Traditional construction costs, timelines, PMC/PCMC approvals, and pros & cons in this 2026 expert guide.",
    desc_new: "Building a home in Pune? Compare Turnkey vs Traditional construction costs, timelines, PMC/PCMC approvals, and pros & cons in this new 2026 expert guide."
  }
};

for (const [filename, opt] of Object.entries(optimizations)) {
  const filePath = 'src/data/' + filename;
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace titles (in head and in schema)
    if (opt.title_old && opt.title_new) {
      // In TS object
      content = content.replace(`title: '${opt.title_old}'`, `title: '${opt.title_new}'`);
    }
    
    // Replace descriptions (in head and in schema)
    if (opt.desc_old && opt.desc_new) {
      // In TS object
      content = content.replace(`description: '${opt.desc_old}'`, `description: '${opt.desc_new}'`);
      
      // Update schema if possible (often matches exactly)
      // Escaping quotes just in case, though they are usually double quotes in schema
      content = content.replace(`"description": "${opt.desc_old}"`, `"description": "${opt.desc_new}"`);
    }
    
    // Replace H1
    if (opt.h1_old && opt.h1_new) {
      content = content.replace(`hero: {\n    title: '${opt.h1_old}'`, `hero: {\n    title: '${opt.h1_new}'`);
      // Fallback if formatting differs
      content = content.replace(`title: '${opt.h1_old}'`, `title: '${opt.h1_new}'`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
  }
}

console.log('Optimizations applied successfully!');
