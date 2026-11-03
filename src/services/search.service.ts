import db from "@/lib/db";

// Synonym dictionary for skincare terminology
const SYNONYMS: Record<string, string[]> = {
  moisturizer: ["moisturiser", "cream", "lotion", "hydra", "soufflé", "emulsion"],
  moisturiser: ["moisturizer", "cream", "lotion", "hydra", "soufflé", "emulsion"],
  sunscreen: ["sunblock", "spf", "sun fluid", "shield", "mineral shield"],
  spf: ["sunscreen", "sunblock", "shield", "mineral"],
  serum: ["drops", "elixir", "concentrate", "active"],
  cleanser: ["wash", "gel", "milk", "purifying", "soap"],
  aging: ["wrinkles", "fine lines", "firmness", "bakuchiol", "elasticity"],
  acne: ["blemish", "breakouts", "blackheads", "pores", "salicylic", "bha"],
  brightening: ["glow", "radiance", "vitamin c", "hyperpigmentation", "dark spots"],
  barrier: ["ceramide", "centella", "soothing", "calming", "repair"],
};

export interface SearchResultItem {
  id: string;
  name: string;
  slug: string;
  subtitle: string | null;
  price: number;
  badge: string | null;
  categoryName: string | null;
}

export async function searchCatalog(query: string, limit = 8): Promise<{
  results: SearchResultItem[];
  suggestions: string[];
}> {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) {
    return { results: [], suggestions: [] };
  }

  // Find synonym expansions
  const searchTerms = [cleanQuery];
  for (const [key, list] of Object.entries(SYNONYMS)) {
    if (cleanQuery.includes(key)) {
      searchTerms.push(...list);
    } else {
      for (const syn of list) {
        if (cleanQuery.includes(syn)) {
          searchTerms.push(key);
          break;
        }
      }
    }
  }

  const uniqueTerms = Array.from(new Set(searchTerms));

  // Perform search across products and ingredients
  const products = await db.product.findMany({
    where: {
      isArchived: false,
      OR: uniqueTerms.flatMap((term) => [
        { name: { contains: term } },
        { subtitle: { contains: term } },
        { description: { contains: term } },
        {
          category: {
            name: { contains: term },
          },
        },
      ]),
    },
    take: limit,
    include: {
      category: true,
      variants: {
        take: 1,
        orderBy: { price: "asc" },
      },
    },
  });

  const results: SearchResultItem[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    subtitle: p.subtitle,
    price: p.variants[0]?.price ? p.variants[0].price / 100 : 0,
    badge: p.badge,
    categoryName: p.category?.name || null,
  }));

  // Build live search suggestions
  const suggestions = Array.from(
    new Set(
      products.map((p) => p.name).concat(
        products.map((p) => p.category?.name || "").filter(Boolean)
      )
    )
  ).slice(0, 5);

  return { results, suggestions };
}

