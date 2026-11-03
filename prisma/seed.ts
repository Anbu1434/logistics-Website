import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding for Verdéa Skincare...");

  // 1. Clear existing records to ensure clean idempotent seed
  await prisma.auditLog.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.address.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.review.deleteMany();
  await prisma.question.deleteMany();
  await prisma.productIngredient.deleteMany();
  await prisma.productConcern.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.skinConcern.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.emailSubscriber.deleteMany();

  console.log("🧹 Cleared existing records.");

  // 2. Categories
  const categoriesData = [
    { name: "Cleansers & Toners", slug: "cleansers", description: "pH-balancing gentle cleansers, purifying micellar waters & toners." },
    { name: "Antioxidant Serums", slug: "serums", description: "Clinically concentrated bio-actives for targeted skin repair." },
    { name: "Barrier Moisturizers", slug: "moisturizers", description: "Lipid-rich barrier repair creams and breathable cloud gels." },
    { name: "Mineral Sunscreens", slug: "sunscreens", description: "Broad spectrum SPF 50+ invisible non-nano mineral sunscreens." },
    { name: "Clean Makeup", slug: "makeup", description: "Botanical pigment tints, breathable foundations & lip oils." },
    { name: "Haircare & Scalp", slug: "haircare", description: "Follicle-nourishing peptide oils and botanical hair masks." },
    { name: "Botanical Fragrance", slug: "fragrance", description: "Clean artisanal botanical eau de parfums crafted with natural absolutes." },
    { name: "Routine Combos & Sets", slug: "combos", description: "Curated multi-step rituals for maximum efficacy and savings." },
  ];

  const categories: Record<string, string> = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    categories[cat.slug] = created.id;
  }
  console.log(`✅ Created ${Object.keys(categories).length} categories.`);

  // 3. Collections
  const collectionsData = [
    { name: "Best Sellers", slug: "best-sellers", badge: "Customer Favorites", description: "Our most coveted, award-winning skincare essentials." },
    { name: "New Arrivals", slug: "new-arrivals", badge: "Latest Formulations", description: "Recently developed botanical science formulas." },
    { name: "Barrier Defense", slug: "barrier-defense", badge: "Clinical Repair", description: "Intensive ceramide and peptide barrier protection." },
    { name: "Radiance & Glow", slug: "radiance-glow", badge: "Luminosity", description: "Brightening botanical complexes for effortless glass skin." },
  ];

  const collections: Record<string, string> = {};
  for (const col of collectionsData) {
    const created = await prisma.collection.create({ data: col });
    collections[col.slug] = created.id;
  }
  console.log(`✅ Created ${Object.keys(collections).length} collections.`);

  // 4. Skin Concerns
  const concernsData = [
    { name: "Dullness & Dark Spots", slug: "dullness", icon: "✨", description: "Uneven tone, sun spots and post-inflammatory pigmentation." },
    { name: "Dryness & Dehydration", slug: "dryness", icon: "💧", description: "Flaky texture, tightness and depleted transepidermal water loss." },
    { name: "Blemish & Acne Prone", slug: "acne", icon: "🌿", description: "Congested pores, excess sebum and inflamed breakouts." },
    { name: "Compromised Barrier", slug: "barrier", icon: "🛡️", description: "Redness, stinging sensation and sensitized skin barriers." },
    { name: "Fine Lines & Elasticity", slug: "aging", icon: "🌸", description: "Loss of firmness, collagen depletion and expression lines." },
  ];

  const concerns: Record<string, string> = {};
  for (const con of concernsData) {
    const created = await prisma.skinConcern.create({ data: con });
    concerns[con.slug] = created.id;
  }
  console.log(`✅ Created ${Object.keys(concerns).length} skin concerns.`);

  // 5. Key Ingredients (INCI)
  const ingredientsData = [
    { name: "Ethyl Ascorbic Acid (Vitamin C)", inciName: "3-O-Ethyl Ascorbic Acid", description: "Ultra-stable bio-available vitamin C that neutralizes free radicals.", benefits: "Brightening, Collagen synthesis, Hyperpigmentation fading", allergens: "None" },
    { name: "Ceramide NP", inciName: "Ceramide NP", description: "Skin-identical lipid that repairs cellular intercellular cement.", benefits: "Barrier restoration, Deep hydration, Reduces irritation", allergens: "None" },
    { name: "Bakuchiol", inciName: "Bakuchiol", description: "Gentle plant-derived alternative to retinol from Babchi seeds.", benefits: "Cellular renewal, Wrinkle smoothing, Non-irritating", allergens: "None" },
    { name: "Centella Asiatica", inciName: "Centella Asiatica Extract", description: "Ancient restorative herb rich in madecassoside and asiatic acid.", benefits: "Calming redness, Wound healing, Anti-inflammatory", allergens: "None" },
    { name: "Multi-Molecular Hyaluronic Acid", inciName: "Sodium Hyaluronate", description: "Triple weight humectant that penetrates multi-depth epidermis.", benefits: "Deep plumping, 1000x water retention, Smooth texture", allergens: "None" },
    { name: "Niacinamide (Vitamin B3)", inciName: "Niacinamide", description: "Multi-functional active that regulates sebum and minimizes pores.", benefits: "Pore refining, Sebum balance, Skin tone evening", allergens: "None" },
    { name: "Plant-Derived Squalane", inciName: "Squalane", description: "Weightless non-comedogenic lipid fermented from sugar cane.", benefits: "Moisture seal, Silky softening, Elasticity", allergens: "None" },
    { name: "Zinc Oxide (Non-Nano)", inciName: "Zinc Oxide", description: "Ecocert mineral physical shield protecting against UVA/UVB.", benefits: "SPF 50+ defense, Soothing redness, Reef-safe", allergens: "None" },
  ];

  const ingredients: Record<string, string> = {};
  for (const ing of ingredientsData) {
    const created = await prisma.ingredient.create({ data: ing });
    ingredients[ing.inciName] = created.id;
  }
  console.log(`✅ Created ${Object.keys(ingredients).length} ingredients.`);

  // 6. Products & Variants (32 comprehensive products across all 8 categories)
  const productsToSeed = [
    // --- 1. Cleansers (4 products) ---
    {
      name: "Calm Balance Clarifying Toner",
      slug: "calm-balance-clarifying-toner",
      subtitle: "Pore Refining Complex",
      description: "A gentle daily balancing toner infused with green tea ferments and white willow bark to refine pores and hydrate.",
      howToUse: "Saturate a reusable cotton pad or splash directly into clean palms. Pat gently over face and neck morning and night.",
      badge: "Clinical Favorite",
      isFeatured: true,
      categorySlug: "cleansers",
      collectionSlug: "barrier-defense",
      concernSlugs: ["acne", "barrier"],
      keyInci: ["Centella Asiatica Extract", "Niacinamide"],
      variants: [
        { sku: "VER-TON-150", name: "150ml Standard", size: "150ml", price: 69900, compareAtPrice: 84900, stock: 120 },
        { sku: "VER-TON-300", name: "300ml Jumbo", size: "300ml", price: 119900, compareAtPrice: 149900, stock: 45 },
      ],
    },
    {
      name: "Gentle Ceramide Milk Cleanser",
      slug: "gentle-ceramide-milk-cleanser",
      subtitle: "pH 5.5 Barrier Wash",
      description: "Non-foaming silky cream cleanser that dissolves waterproof makeup and SPF while keeping skin barrier intact.",
      howToUse: "Massage 2 pumps onto dry or damp skin in circular motions. Rinse thoroughly with lukewarm water.",
      badge: "Sensitive Skin",
      isFeatured: false,
      categorySlug: "cleansers",
      collectionSlug: "barrier-defense",
      concernSlugs: ["barrier", "dryness"],
      keyInci: ["Ceramide NP", "Squalane"],
      variants: [
        { sku: "VER-CLN-200", name: "200ml Bottle", size: "200ml", price: 64900, compareAtPrice: 79900, stock: 90 },
      ],
    },
    {
      name: "Salicylic Botanical Purifying Gel",
      slug: "salicylic-botanical-purifying-gel",
      subtitle: "1.5% BHA Cleanser",
      description: "Micro-foaming cleanser targeting blackheads and congestion with natural salicylic acid and tea tree hydrosol.",
      howToUse: "Lather a small amount with warm water. Massage onto oily or congested areas for 60 seconds, then rinse.",
      badge: "Blemish Shield",
      isFeatured: false,
      categorySlug: "cleansers",
      collectionSlug: "barrier-defense",
      concernSlugs: ["acne"],
      keyInci: ["Centella Asiatica Extract"],
      variants: [
        { sku: "VER-BHA-150", name: "150ml Pump", size: "150ml", price: 59900, compareAtPrice: 74900, stock: 80 },
      ],
    },
    {
      name: "Botanical Micellar Cleansing Water",
      slug: "botanical-micellar-cleansing-water",
      subtitle: "Triple Rose Hydrosol",
      description: "Rinse-free botanical water that instantly sweeps away pollution and makeup while delivering cucumber hydration.",
      howToUse: "Soak a cotton pad and gently sweep over eyes, lips and face. No rinsing required.",
      badge: null,
      isFeatured: false,
      categorySlug: "cleansers",
      collectionSlug: null,
      concernSlugs: ["dullness"],
      keyInci: ["Sodium Hyaluronate"],
      variants: [
        { sku: "VER-MIC-250", name: "250ml", size: "250ml", price: 54900, compareAtPrice: 69900, stock: 65 },
      ],
    },

    // --- 2. Serums (5 products) ---
    {
      name: "Glow Boost Vitamin C Serum",
      slug: "glow-boost-vitamin-c-serum",
      subtitle: "15% Bio-Active Complex",
      description: "Our signature brightening elixir formulated with Ethyl Ascorbic Acid, Ferulic Acid, and Kakadu Plum for luminous skin.",
      howToUse: "Apply 3-4 drops in the morning onto clean, slightly damp skin. Follow with moisturizer and SPF.",
      badge: "Best Seller",
      isFeatured: true,
      categorySlug: "serums",
      collectionSlug: "best-sellers",
      concernSlugs: ["dullness", "aging"],
      keyInci: ["3-O-Ethyl Ascorbic Acid", "Sodium Hyaluronate"],
      variants: [
        { sku: "VER-SER-30", name: "30ml Standard", size: "30ml", price: 89900, compareAtPrice: 119900, stock: 150 },
        { sku: "VER-SER-50", name: "50ml Value", size: "50ml", price: 129900, compareAtPrice: 169900, stock: 75 },
      ],
    },
    {
      name: "Phyto-Retinol Bakuchiol Elixir",
      slug: "phyto-retinol-bakuchiol-elixir",
      subtitle: "2% Natural Cell Renewal",
      description: "A gentle overnight restorative oil that smooths fine lines and enhances cellular turnover without flaking or photosensitivity.",
      howToUse: "Warm 3-4 drops between fingertips and press into face and neck as the final step of your nighttime ritual.",
      badge: "Award Winner",
      isFeatured: true,
      categorySlug: "serums",
      collectionSlug: "new-arrivals",
      concernSlugs: ["aging", "barrier"],
      keyInci: ["Bakuchiol", "Squalane"],
      variants: [
        { sku: "VER-BAK-30", name: "30ml Dropper", size: "30ml", price: 99900, compareAtPrice: 129900, stock: 85 },
      ],
    },
    {
      name: "Triple Hyaluronic Plumping Serum",
      slug: "triple-hyaluronic-plumping-serum",
      subtitle: "Multi-Depth Moisture",
      description: "Pure multi-molecular weight hyaluronic acid infused with snow mushroom polysaccharide for bouncy, glass skin.",
      howToUse: "Apply to damp skin immediately after cleansing or misting. Seal with moisturizer.",
      badge: "Hydration Hero",
      isFeatured: false,
      categorySlug: "serums",
      collectionSlug: "radiance-glow",
      concernSlugs: ["dryness"],
      keyInci: ["Sodium Hyaluronate"],
      variants: [
        { sku: "VER-HYA-30", name: "30ml", size: "30ml", price: 79900, compareAtPrice: 99900, stock: 110 },
      ],
    },
    {
      name: "10% Niacinamide + Zinc Serum",
      slug: "10-percent-niacinamide-zinc-serum",
      subtitle: "Blemish & Tone Perfector",
      description: "High-strength vitamin and mineral blemish formula that calms breakouts and visibly shrinks enlarged pores.",
      howToUse: "Apply a pea-sized amount morning and evening before heavier creams.",
      badge: "Pore Minimizer",
      isFeatured: false,
      categorySlug: "serums",
      collectionSlug: null,
      concernSlugs: ["acne", "dullness"],
      keyInci: ["Niacinamide"],
      variants: [
        { sku: "VER-NIA-30", name: "30ml", size: "30ml", price: 69900, compareAtPrice: 84900, stock: 95 },
      ],
    },
    {
      name: "Centella Soothing Recovery Drops",
      slug: "centella-soothing-recovery-drops",
      subtitle: "Redness Relief Concentrate",
      description: "Concentrated botanical rescue drops formulated to extinguish flare-ups, windburn, and irritation in minutes.",
      howToUse: "Smooth 2-3 drops over sensitized patches or mix into your daily moisturizer.",
      badge: "Barrier Rescue",
      isFeatured: false,
      categorySlug: "serums",
      collectionSlug: "barrier-defense",
      concernSlugs: ["barrier"],
      keyInci: ["Centella Asiatica Extract", "Ceramide NP"],
      variants: [
        { sku: "VER-CEN-30", name: "30ml", size: "30ml", price: 74900, compareAtPrice: 89900, stock: 60 },
      ],
    },

    // --- 3. Moisturizers (4 products) ---
    {
      name: "Hydra Repair Barrier Gel Cream",
      slug: "hydra-repair-gel-cream",
      subtitle: "Deep Moisture Infusion",
      description: "Weightless oil-free emulsion delivering 72 hours of clinically validated hydration with 5 essential ceramides.",
      howToUse: "Smooth a nickel-sized amount onto face, neck and décolletage both morning and night.",
      badge: "Award Winner",
      isFeatured: true,
      categorySlug: "moisturizers",
      collectionSlug: "best-sellers",
      concernSlugs: ["dryness", "barrier"],
      keyInci: ["Ceramide NP", "Sodium Hyaluronate"],
      variants: [
        { sku: "VER-GEL-50", name: "50ml Jar", size: "50ml", price: 74900, compareAtPrice: 99900, stock: 140 },
        { sku: "VER-GEL-100", name: "100ml Value", size: "100ml", price: 119900, compareAtPrice: 149900, stock: 50 },
      ],
    },
    {
      name: "Squalane Cloud Moisture Soufflé",
      slug: "squalane-cloud-moisture-souffle",
      subtitle: "Rich Barrier Lipid Cream",
      description: "Whipped botanical butter cream that creates a breathable protective seal against harsh climatic dryness.",
      howToUse: "Warm between fingertips and gently press into skin until fully absorbed.",
      badge: "Deep Nourishment",
      isFeatured: false,
      categorySlug: "moisturizers",
      collectionSlug: "barrier-defense",
      concernSlugs: ["dryness"],
      keyInci: ["Squalane", "Ceramide NP"],
      variants: [
        { sku: "VER-CLD-50", name: "50ml Jar", size: "50ml", price: 84900, compareAtPrice: 104900, stock: 70 },
      ],
    },
    {
      name: "Oat Peptide Calming Lotion",
      slug: "oat-peptide-calming-lotion",
      subtitle: "Anti-Itch Daily Fluid",
      description: "Colloidal oatmeal emulsion clinically shown to decrease transepidermal water loss and soothe eczema-prone skin.",
      howToUse: "Apply generously all over face and dry patches whenever comfort is required.",
      badge: null,
      isFeatured: false,
      categorySlug: "moisturizers",
      collectionSlug: "barrier-defense",
      concernSlugs: ["barrier"],
      keyInci: ["Ceramide NP"],
      variants: [
        { sku: "VER-OAT-100", name: "100ml Pump", size: "100ml", price: 69900, compareAtPrice: 84900, stock: 80 },
      ],
    },
    {
      name: "Overnight Botanical Sleeping Mask",
      slug: "overnight-botanical-sleeping-mask",
      subtitle: "Cellular Renewal Butter",
      description: "A rich melt-in nocturnal treatment that works in harmony with circadian repair rhythms for lit-from-within glow.",
      howToUse: "Apply an even layer as the final step at bedtime. Awaken to supple, plump skin and rinse if desired.",
      badge: "Night Repair",
      isFeatured: false,
      categorySlug: "moisturizers",
      collectionSlug: "radiance-glow",
      concernSlugs: ["dullness", "dryness"],
      keyInci: ["Bakuchiol", "Squalane"],
      variants: [
        { sku: "VER-SLP-60", name: "60ml Pot", size: "60ml", price: 89900, compareAtPrice: 114900, stock: 65 },
      ],
    },

    // --- 4. Sunscreens (3 products) ---
    {
      name: "Invisible Sheer Mineral Sunscreen SPF 50+",
      slug: "invisible-sheer-mineral-sunscreen-spf-50",
      subtitle: "Zero White Cast PA++++",
      description: "100% Non-nano zinc oxide sunscreen providing broad spectrum protection with an invisible, velvety matte finish.",
      howToUse: "Apply two finger lengths evenly across face and neck 15 minutes before sun exposure. Reapply every 2 hours.",
      badge: "Reef Safe",
      isFeatured: true,
      categorySlug: "sunscreens",
      collectionSlug: "best-sellers",
      concernSlugs: ["aging", "dullness"],
      keyInci: ["Zinc Oxide", "Centella Asiatica Extract"],
      variants: [
        { sku: "VER-SPF-50", name: "50ml Tube", size: "50ml", price: 79900, compareAtPrice: 99900, stock: 160 },
      ],
    },
    {
      name: "Dewy Glow Sun Fluid SPF 50",
      slug: "dewy-glow-sun-fluid-spf-50",
      subtitle: "Hydrating Primer Shield",
      description: "Lightweight sun fluid infused with hyaluronic acid that doubles as a radiant makeup-gripping primer.",
      howToUse: "Smooth over skin after moisturizer. Can be worn alone for a sunlit glow or under foundation.",
      badge: "Glow Primer",
      isFeatured: false,
      categorySlug: "sunscreens",
      collectionSlug: "radiance-glow",
      concernSlugs: ["dullness", "dryness"],
      keyInci: ["Zinc Oxide", "Sodium Hyaluronate"],
      variants: [
        { sku: "VER-DWY-50", name: "50ml Bottle", size: "50ml", price: 84900, compareAtPrice: 104900, stock: 90 },
      ],
    },
    {
      name: "Matte Tinted Mineral Shield SPF 40",
      slug: "matte-tinted-mineral-shield-spf-40",
      subtitle: "Adapting Tint & Blur",
      description: "Mineral UV defense infused with iron oxides that adapt to skin tone, blurring redness and neutralizing blue light.",
      howToUse: "Blend with fingertips or sponge for effortless no-makeup makeup coverage and complete photoprotection.",
      badge: "Blue Light Defense",
      isFeatured: false,
      categorySlug: "sunscreens",
      collectionSlug: null,
      concernSlugs: ["barrier"],
      keyInci: ["Zinc Oxide", "Niacinamide"],
      variants: [
        { sku: "VER-TNT-50", name: "50ml Tube", size: "50ml", price: 89900, compareAtPrice: 109900, stock: 75 },
      ],
    },

    // --- 5. Clean Makeup (4 products) ---
    {
      name: "Velvet Botanical Lip & Cheek Tint",
      slug: "velvet-botanical-lip-cheek-tint",
      subtitle: "Phyto-Pigment Flush",
      description: "Multi-use whipped pigment infused with cold-pressed rosehip and hibiscus for an effortless watercolor stain.",
      howToUse: "Dot onto apples of cheeks and tap into lips using fingertips or a dense cream brush.",
      badge: "Clean Makeup",
      isFeatured: true,
      categorySlug: "makeup",
      collectionSlug: "new-arrivals",
      concernSlugs: ["dullness"],
      keyInci: ["Squalane"],
      variants: [
        { sku: "VER-LIP-NUDE", name: "Velvet Nude", shadeHex: "#C98F72", price: 59900, compareAtPrice: 79900, stock: 120 },
        { sku: "VER-LIP-BERRY", name: "Botanical Berry", shadeHex: "#8B3E45", price: 59900, compareAtPrice: 79900, stock: 95 },
        { sku: "VER-LIP-TERRA", name: "Warm Terracotta", shadeHex: "#B65E42", price: 59900, compareAtPrice: 79900, stock: 80 },
      ],
    },
    {
      name: "Luminous Bare Skin Foundation Serum",
      slug: "luminous-bare-skin-foundation-serum",
      subtitle: "Light-to-Medium Breathable Tint",
      description: "Hydrating serum base loaded with squalane and peptides that provides breathable, undetectable coverage.",
      howToUse: "Shake well before dispensing 2-3 drops. Blend outward from the center of the face.",
      badge: "Breathable Wear",
      isFeatured: false,
      categorySlug: "makeup",
      collectionSlug: null,
      concernSlugs: ["dryness"],
      keyInci: ["Squalane", "Sodium Hyaluronate"],
      variants: [
        { sku: "VER-FND-01", name: "01 Fair Neutral", shadeHex: "#EED7C5", price: 99900, compareAtPrice: 124900, stock: 50 },
        { sku: "VER-FND-02", name: "02 Light Warm", shadeHex: "#E5C2A5", price: 99900, compareAtPrice: 124900, stock: 60 },
        { sku: "VER-FND-03", name: "03 Medium Golden", shadeHex: "#CCA079", price: 99900, compareAtPrice: 124900, stock: 70 },
        { sku: "VER-FND-04", name: "04 Deep Amber", shadeHex: "#99633D", price: 99900, compareAtPrice: 124900, stock: 45 },
      ],
    },
    {
      name: "Nourishing Botanical Glaze Lip Oil",
      slug: "nourishing-botanical-glaze-lip-oil",
      subtitle: "High Shine Non-Sticky",
      description: "Cushioning botanical oil delivering glass-like shine and 24-hour lip barrier nourishment with pure jojoba ester.",
      howToUse: "Glide plush applicator over bare lips or layer over lip pencil.",
      badge: "High Shine",
      isFeatured: false,
      categorySlug: "makeup",
      collectionSlug: null,
      concernSlugs: ["dryness"],
      keyInci: ["Squalane"],
      variants: [
        { sku: "VER-OIL-ROSE", name: "Clear Rose Glaze", size: "7ml", price: 49900, compareAtPrice: 64900, stock: 110 },
      ],
    },
    {
      name: "Botanical Feather Lash Defining Mascara",
      slug: "botanical-feather-lash-defining-mascara",
      subtitle: "Smudge-Proof Tubing Formula",
      description: "Clean micro-tubing mascara formulated with plant waxes that lengthens and lifts without flaking. Removes with warm water.",
      howToUse: "Wiggle brush from lash roots to tips in an upward sweep.",
      badge: null,
      isFeatured: false,
      categorySlug: "makeup",
      collectionSlug: null,
      concernSlugs: [],
      keyInci: [],
      variants: [
        { sku: "VER-MSC-BLK", name: "Rich Carbon Black", size: "9ml", price: 54900, compareAtPrice: 69900, stock: 85 },
      ],
    },

    // --- 6. Haircare & Scalp (4 products) ---
    {
      name: "Rosemary & Biotin Scalp Density Elixir",
      slug: "rosemary-biotin-scalp-density-elixir",
      subtitle: "Follicle Reactivation Serum",
      description: "Potent water-light scalp treatment with distilled rosemary oil and caffeine that visibly thickens thinning hair.",
      howToUse: "Part hair into sections and drop directly onto clean scalp. Massage with fingertips for 2 minutes. Do not rinse.",
      badge: "Scalp Health",
      isFeatured: true,
      categorySlug: "haircare",
      collectionSlug: "new-arrivals",
      concernSlugs: [],
      keyInci: [],
      variants: [
        { sku: "VER-SCP-60", name: "60ml Pipette", size: "60ml", price: 79900, compareAtPrice: 99900, stock: 95 },
      ],
    },
    {
      name: "Botanical Peptide Repair Hair Mask",
      slug: "botanical-peptide-repair-hair-mask",
      subtitle: "Bond Repair Treatment",
      description: "Intensive 5-minute deep conditioning treatment that repairs split ends and chemical damage with pea peptides.",
      howToUse: "After shampooing, apply from mid-lengths to ends. Leave for 5-10 minutes, then rinse cleanly.",
      badge: "Deep Repair",
      isFeatured: false,
      categorySlug: "haircare",
      collectionSlug: null,
      concernSlugs: ["dryness"],
      keyInci: ["Squalane"],
      variants: [
        { sku: "VER-MSK-200", name: "200ml Tub", size: "200ml", price: 84900, compareAtPrice: 104900, stock: 75 },
      ],
    },
    {
      name: "Apple Cider Vinegar Clarifying Hair Wash",
      slug: "apple-cider-vinegar-clarifying-hair-wash",
      subtitle: "Sulfate-Free Scalp Detox",
      description: "Gently removes stubborn product build-up and hard water minerals while balancing natural scalp microbiome.",
      howToUse: "Lather into wet roots, work through lengths, and rinse thoroughly. Use once weekly.",
      badge: null,
      isFeatured: false,
      categorySlug: "haircare",
      collectionSlug: null,
      concernSlugs: [],
      keyInci: [],
      variants: [
        { sku: "VER-ACV-250", name: "250ml", size: "250ml", price: 64900, compareAtPrice: 79900, stock: 65 },
      ],
    },
    {
      name: "Golden Argan Gloss Finishing Serum",
      slug: "golden-argan-gloss-finishing-serum",
      subtitle: "Weightless Heat Protectant",
      description: "Cold-pressed Moroccan argan oil shield that protects hair up to 230°C and eliminates frizz with zero greasiness.",
      howToUse: "Dispense 1 pump into palms and distribute evenly over damp or dry hair before styling.",
      badge: "Heat Defense",
      isFeatured: false,
      categorySlug: "haircare",
      collectionSlug: null,
      concernSlugs: ["dryness"],
      keyInci: ["Squalane"],
      variants: [
        { sku: "VER-GLS-50", name: "50ml", size: "50ml", price: 69900, compareAtPrice: 84900, stock: 70 },
      ],
    },

    // --- 7. Fragrance (4 products) ---
    {
      name: "Verdéa Eau de Parfum - Vert Garden",
      slug: "verdea-eau-de-parfum-vert-garden",
      subtitle: "Crushed Herbs, Fig & Vetiver",
      description: "An uplifting sensory walk through dew-soaked botanical gardens. Notes of fresh crushed fig leaf, Italian bergamot, and earthy vetiver.",
      howToUse: "Mist onto pulse points—wrists, inner elbows, and collarbones.",
      badge: "Artisanal",
      isFeatured: true,
      categorySlug: "fragrance",
      collectionSlug: "best-sellers",
      concernSlugs: [],
      keyInci: [],
      variants: [
        { sku: "VER-EDP-50", name: "50ml Glass Flacon", size: "50ml", price: 189900, compareAtPrice: 229900, stock: 45 },
        { sku: "VER-EDP-10", name: "10ml Travel Spray", size: "10ml", price: 59900, compareAtPrice: 74900, stock: 90 },
      ],
    },
    {
      name: "Verdéa Eau de Parfum - Solar Amber",
      slug: "verdea-eau-de-parfum-solar-amber",
      subtitle: "Warm Neroli, Vanilla & Sandalwood",
      description: "Golden hour bottled. Sun-drenched orange blossom, warm benzoin resin, and rich Mysore sandalwood.",
      howToUse: "Spray on pulse points or in hair for a lingering warm trail.",
      badge: "Sensual Glow",
      isFeatured: false,
      categorySlug: "fragrance",
      collectionSlug: null,
      concernSlugs: [],
      keyInci: [],
      variants: [
        { sku: "VER-SOL-50", name: "50ml Glass Flacon", size: "50ml", price: 189900, compareAtPrice: 229900, stock: 40 },
      ],
    },
    {
      name: "Botanical Hair & Body Mist - Rose Santal",
      slug: "botanical-hair-body-mist-rose-santal",
      subtitle: "Alcohol-Free Water Fragrance",
      description: "Hydrating fine fragrance mist formulated with damask rose water and creamy Australian sandalwood.",
      howToUse: "Spritz lavishly over hair, skin, and linens throughout the day.",
      badge: "Alcohol Free",
      isFeatured: false,
      categorySlug: "fragrance",
      collectionSlug: null,
      concernSlugs: [],
      keyInci: [],
      variants: [
        { sku: "VER-MST-100", name: "100ml Mist", size: "100ml", price: 79900, compareAtPrice: 99900, stock: 65 },
      ],
    },
    {
      name: "Night Bloom Jasmine Body Oil",
      slug: "night-bloom-jasmine-body-oil",
      subtitle: "Sensual Aromatic Dry Oil",
      description: "Nocturnally harvested Indian Sambac jasmine infused in golden jojoba oil for luminous, silk-touch skin.",
      howToUse: "Smooth over warm, damp skin straight out of the bath or shower.",
      badge: "Pure Indulgence",
      isFeatured: false,
      categorySlug: "fragrance",
      collectionSlug: null,
      concernSlugs: ["dryness"],
      keyInci: ["Squalane"],
      variants: [
        { sku: "VER-JAS-100", name: "100ml Pump", size: "100ml", price: 129900, compareAtPrice: 159900, stock: 50 },
      ],
    },

    // --- 8. Combos & Sets (4 products) ---
    {
      name: "The Radiant Morning Trio",
      slug: "the-radiant-morning-trio",
      subtitle: "Complete 3-Step Daily Routine",
      description: "Everything your skin needs to glow: Calm Balance Clarifying Toner (150ml), Glow Boost Vitamin C Serum (30ml), and Invisible Mineral Sunscreen SPF 50+ (50ml). Save 25% with this full routine.",
      howToUse: "Step 1: Balance skin with Toner. Step 2: Brighten with Vitamin C Serum. Step 3: Shield with Mineral Sunscreen.",
      badge: "Save 25%",
      isFeatured: true,
      categorySlug: "combos",
      collectionSlug: "best-sellers",
      concernSlugs: ["dullness", "aging"],
      keyInci: ["3-O-Ethyl Ascorbic Acid", "Zinc Oxide", "Niacinamide"],
      variants: [
        { sku: "VER-SET-TRIO", name: "Full Size 3-Piece Set", size: "3 Items", price: 179900, compareAtPrice: 239700, stock: 80 },
      ],
    },
    {
      name: "The Barrier Recovery Kit",
      slug: "the-barrier-recovery-kit",
      subtitle: "Intensive Ceramide Healing Ritual",
      description: "Designed for irritated, sensitized skin: Gentle Ceramide Milk Cleanser (200ml), Centella Soothing Recovery Drops (30ml), and Hydra Repair Barrier Gel Cream (50ml).",
      howToUse: "Cleanse with Ceramide Milk, soothe redness with Centella Drops, and lock in moisture with Barrier Gel Cream.",
      badge: "Dermatologist Approved",
      isFeatured: true,
      categorySlug: "combos",
      collectionSlug: "barrier-defense",
      concernSlugs: ["barrier", "dryness"],
      keyInci: ["Ceramide NP", "Centella Asiatica Extract"],
      variants: [
        { sku: "VER-SET-BARRIER", name: "3-Piece Recovery System", size: "3 Items", price: 159900, compareAtPrice: 214700, stock: 65 },
      ],
    },
    {
      name: "The Complete Evening Reset Ritual",
      slug: "the-complete-evening-reset-ritual",
      subtitle: "Cleanse, Smooth & Regenerate",
      description: "Our luxury nighttime renewal set: Gentle Ceramide Milk Cleanser (200ml), Phyto-Retinol Bakuchiol Elixir (30ml), and Overnight Botanical Sleeping Mask (60ml).",
      howToUse: "Rinse away the day, warm Bakuchiol oil into skin, and cocoon with the Sleeping Mask overnight.",
      badge: "Night Renewal",
      isFeatured: false,
      categorySlug: "combos",
      collectionSlug: "new-arrivals",
      concernSlugs: ["aging", "dryness"],
      keyInci: ["Bakuchiol", "Ceramide NP"],
      variants: [
        { sku: "VER-SET-NIGHT", name: "3-Piece Night Ritual", size: "3 Items", price: 189900, compareAtPrice: 254700, stock: 55 },
      ],
    },
    {
      name: "The Clean Glow Makeup & Lip Duo",
      slug: "the-clean-glow-makeup-lip-duo",
      subtitle: "Effortless Natural Radiance",
      description: "Pair our bestselling Velvet Botanical Lip & Cheek Tint in Velvet Nude with the Nourishing Botanical Glaze Lip Oil for lush, glass-skin lips.",
      howToUse: "Pat tint onto cheeks and lips, top with Glaze Lip Oil for mirror shine.",
      badge: "Clean Beauty",
      isFeatured: false,
      categorySlug: "combos",
      collectionSlug: null,
      concernSlugs: [],
      keyInci: ["Squalane"],
      variants: [
        { sku: "VER-SET-GLOW", name: "Duo Set", size: "2 Items", price: 89900, compareAtPrice: 109800, stock: 70 },
      ],
    },
  ];

  for (const item of productsToSeed) {
    const createdProduct = await prisma.product.create({
      data: {
        name: item.name,
        slug: item.slug,
        subtitle: item.subtitle,
        description: item.description,
        howToUse: item.howToUse,
        badge: item.badge,
        isFeatured: item.isFeatured,
        categoryId: categories[item.categorySlug] || null,
        collectionId: item.collectionSlug ? collections[item.collectionSlug] : null,
        variants: {
          create: item.variants.map((v: any) => ({
            sku: v.sku,
            name: v.name,
            size: v.size || null,
            shadeHex: v.shadeHex || null,
            price: v.price,
            compareAtPrice: v.compareAtPrice,
            costPrice: Math.round(v.price * 0.35),
            stock: v.stock,
          })),
        },
        images: {
          create: [
            {
              url: `/images/products/${item.slug}-1.jpg`,
              altText: `${item.name} botanical bottle display`,
              isPrimary: true,
              displayOrder: 0,
            },
            {
              url: `/images/products/${item.slug}-2.jpg`,
              altText: `${item.name} luxury texture swatch`,
              isPrimary: false,
              displayOrder: 1,
            },
          ],
        },
      },
    });

    // Link skin concerns
    for (const conSlug of item.concernSlugs) {
      if (concerns[conSlug]) {
        await prisma.productConcern.create({
          data: {
            productId: createdProduct.id,
            concernId: concerns[conSlug],
          },
        });
      }
    }

    // Link key ingredients
    for (const inci of item.keyInci) {
      if (ingredients[inci]) {
        await prisma.productIngredient.create({
          data: {
            productId: createdProduct.id,
            ingredientId: ingredients[inci],
            isKeyActive: true,
          },
        });
      }
    }

    // Add 2-3 realistic customer reviews for key items
    await prisma.review.create({
      data: {
        productId: createdProduct.id,
        rating: 5,
        title: "Remarkable difference in my skin barrier!",
        content: `I've been using this for 3 weeks and the hydration level is unmatched. My redness has completely faded and my skin has an all-day dewiness without any greasy film.`,
        authorName: "Ananya S.",
        skinType: "Combination / Sensitive",
        verifiedPurchase: true,
        helpfulCount: 14,
      },
    });

    await prisma.review.create({
      data: {
        productId: createdProduct.id,
        rating: 4,
        title: "Clean ingredients that actually perform",
        content: "Love the quiet luxury aesthetic, amber packaging, and calming aroma. Absorbs immediately. Highly recommended!",
        authorName: "Rohan M.",
        skinType: "Dry / Mature",
        verifiedPurchase: true,
        helpfulCount: 8,
      },
    });
  }

  console.log(`✅ Created ${productsToSeed.length} products with variants, images, ingredient links and reviews.`);

  // 7. Active Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: "BOTANICAL15",
        description: "15% off first order for new customers",
        discountType: "PERCENTAGE",
        discountValue: 15,
        minSpend: 49900,
        usageLimit: 1000,
        isActive: true,
      },
      {
        code: "GLOW25",
        description: "25% off bundle routines and sets",
        discountType: "PERCENTAGE",
        discountValue: 25,
        minSpend: 149900,
        usageLimit: 500,
        isActive: true,
      },
      {
        code: "FREESHIP",
        description: "Complimentary express shipping",
        discountType: "FREE_SHIPPING",
        discountValue: 0,
        minSpend: 0,
        isActive: true,
      },
    ],
  });
  console.log("✅ Seeded promotional coupons.");

  // 8. Admin User
  await prisma.adminUser.create({
    data: {
      email: "admin@verdeaskincare.com",
      name: "Verdéa Operations Lead",
      passwordHash: "argon2_demo_admin_secure_hash",
      role: "OWNER",
    },
  });
  console.log("✅ Created default administrator account (admin@verdeaskincare.com).");

  // 9. Sample Customer with addresses and wishlist
  const sampleCustomer = await prisma.customer.create({
    data: {
      email: "maya.sharma@example.com",
      name: "Maya Sharma",
      phone: "+91 98765 43210",
      skinType: "Combination",
      loyaltyPoints: 350,
      addresses: {
        create: {
          fullName: "Maya Sharma",
          street: "42 Indiranagar 100ft Road",
          apartment: "Apartment 4B, Lotus Enclave",
          city: "Bengaluru",
          state: "Karnataka",
          postalCode: "560038",
          country: "India",
          phone: "+91 98765 43210",
          isDefault: true,
        },
      },
    },
  });

  // 10. Sample Delivered Order for Customer History
  const firstVariant = await prisma.productVariant.findFirst({
    where: { sku: "VER-SET-TRIO" },
  });

  if (firstVariant) {
    await prisma.order.create({
      data: {
        orderNumber: "VER-89241",
        customerEmail: sampleCustomer.email,
        customerName: sampleCustomer.name || "Maya Sharma",
        customerPhone: sampleCustomer.phone,
        subtotal: 179900,
        discountAmount: 26985, // 15% discount
        shippingAmount: 0,
        taxAmount: 27525,
        totalAmount: 180440,
        status: "DELIVERED",
        paymentStatus: "PAID",
        paymentMethod: "STRIPE",
        paymentRefId: "ch_test_3Oq90Z2eZvKYlo2C",
        shippingAddress: JSON.stringify({
          fullName: "Maya Sharma",
          street: "42 Indiranagar 100ft Road, Apt 4B",
          city: "Bengaluru",
          state: "Karnataka",
          postalCode: "560038",
          country: "India",
        }),
        items: {
          create: {
            variantId: firstVariant.id,
            productName: "The Radiant Morning Trio",
            variantName: firstVariant.name,
            sku: firstVariant.sku,
            unitPrice: firstVariant.price,
            quantity: 1,
            totalPrice: firstVariant.price,
          },
        },
        shipments: {
          create: {
            trackingNumber: "DLH-992014901",
            carrier: "Delhivery Express",
            status: "DELIVERED",
            shippedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            deliveredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          },
        },
      },
    });
    console.log("✅ Seeded sample completed order with tracking.");
  }

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
