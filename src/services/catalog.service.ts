import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export interface ProductFilters {
  categorySlug?: string;
  collectionSlug?: string;
  concernSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sort?: "featured" | "price-asc" | "price-desc" | "newest" | "rating";
  search?: string;
  page?: number;
  limit?: number;
}

export async function getCategories() {
  return db.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });
}

export async function getCategoryBySlug(slug: string) {
  return db.category.findUnique({
    where: { slug },
    include: {
      children: true,
      _count: {
        select: { products: true },
      },
    },
  });
}

export async function getCollections() {
  return db.collection.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });
}

export async function getSkinConcerns() {
  return db.skinConcern.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });
}

export async function getIngredients() {
  return db.ingredient.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getProductBySlug(slug: string) {
  return db.product.findUnique({
    where: { slug },
    include: {
      category: true,
      collection: true,
      variants: {
        orderBy: { price: "asc" },
      },
      images: {
        orderBy: { displayOrder: "asc" },
      },
      ingredients: {
        include: {
          ingredient: true,
        },
      },
      concerns: {
        include: {
          concern: true,
        },
      },
      reviews: {
        where: { status: "APPROVED" },
        orderBy: { createdAt: "desc" },
      },
      questions: {
        where: { answer: { not: null } },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getBestSellers(limit = 8) {
  return db.product.findMany({
    where: {
      isArchived: false,
      OR: [
        { badge: "Best Seller" },
        { collection: { slug: "best-sellers" } },
      ],
    },
    take: limit,
    include: {
      category: true,
      variants: {
        take: 1,
        orderBy: { price: "asc" },
      },
      images: {
        where: { isPrimary: true },
        take: 1,
      },
      reviews: {
        select: { rating: true },
      },
    },
  });
}

export async function getFeaturedProducts(limit = 4) {
  return db.product.findMany({
    where: {
      isFeatured: true,
      isArchived: false,
    },
    take: limit,
    include: {
      category: true,
      variants: {
        take: 1,
        orderBy: { price: "asc" },
      },
      images: {
        where: { isPrimary: true },
        take: 1,
      },
      reviews: {
        select: { rating: true },
      },
    },
  });
}

export async function getProducts(filters: ProductFilters = {}) {
  const {
    categorySlug,
    collectionSlug,
    concernSlug,
    minPrice,
    maxPrice,
    sort = "featured",
    search,
    page = 1,
    limit = 12,
  } = filters;

  const where: Prisma.ProductWhereInput = {
    isArchived: false,
  };

  if (categorySlug && categorySlug !== "all") {
    if (categorySlug === "sale") {
      where.variants = {
        some: {
          compareAtPrice: { not: null },
        },
      };
    } else if (categorySlug === "best-sellers") {
      where.OR = [
        { badge: "Best Seller" },
        { collection: { slug: "best-sellers" } },
      ];
    } else if (categorySlug === "new") {
      // handled via sort
    } else {
      where.OR = [
        { category: { slug: categorySlug } },
        { collection: { slug: categorySlug } },
      ];
    }
  }

  if (collectionSlug && !where.OR) {
    where.collection = { slug: collectionSlug };
  }

  if (concernSlug) {
    where.concerns = {
      some: {
        concern: { slug: concernSlug },
      },
    };
  }

  if (search && search.trim()) {
    const term = search.trim();
    where.OR = [
      { name: { contains: term } },
      { subtitle: { contains: term } },
      { description: { contains: term } },
    ];
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.variants = {
      some: {
        price: {
          ...(minPrice !== undefined ? { gte: minPrice * 100 } : {}),
          ...(maxPrice !== undefined ? { lte: maxPrice * 100 } : {}),
        },
      },
    };
  }

  // Sorting
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  if (sort === "newest" || categorySlug === "new") {
    orderBy = { createdAt: "desc" };
  } else if (sort === "featured") {
    orderBy = { isFeatured: "desc" };
  }

  const skip = (page - 1) * limit;

  const [totalCount, rawProducts] = await Promise.all([
    db.product.count({ where }),
    db.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
        collection: true,
        variants: {
          orderBy: { price: "asc" },
        },
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        reviews: {
          select: { rating: true },
        },
      },
    }),
  ]);

  let products = rawProducts;

  // In-memory sort for relation fields if needed (e.g. price-asc, price-desc, rating)
  if (sort === "price-asc") {
    products = products.sort((a, b) => {
      const pA = a.variants[0]?.price || 0;
      const pB = b.variants[0]?.price || 0;
      return pA - pB;
    });
  } else if (sort === "price-desc") {
    products = products.sort((a, b) => {
      const pA = a.variants[0]?.price || 0;
      const pB = b.variants[0]?.price || 0;
      return pB - pA;
    });
  } else if (sort === "rating") {
    products = products.sort((a, b) => {
      const rA =
        a.reviews.length > 0
          ? a.reviews.reduce((acc, r) => acc + r.rating, 0) / a.reviews.length
          : 0;
      const rB =
        b.reviews.length > 0
          ? b.reviews.reduce((acc, r) => acc + r.rating, 0) / b.reviews.length
          : 0;
      return rB - rA;
    });
  }

  const paginatedProducts = products.slice(skip, skip + limit);

  return {
    products: paginatedProducts,
    pagination: {
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      limit,
    },
  };
}
