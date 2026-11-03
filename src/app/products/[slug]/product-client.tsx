"use client";

import * as React from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Leaf,
  Recycle,
  CheckCircle2,
  Truck,
  RotateCcw,
  Star,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceBlock } from "@/components/ui/price-block";
import { RatingStars } from "@/components/ui/rating-stars";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { ImageSlot } from "@/components/ui/image-slot";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { ProductCard } from "@/components/ui/product-card";
import { useStore } from "@/context/store-context";
import { formatCurrency, cn } from "@/lib/utils";

interface Variant {
  id: string;
  name: string;
  sku: string;
  size: string;
  price: number;
  compareAtPrice?: number;
  inventoryQuantity: number;
}

interface ImageItem {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

interface IngredientItem {
  id: string;
  name: string;
  inciName?: string | null;
  description?: string | null;
  isKey: boolean;
}

interface ConcernItem {
  id: string;
  name: string;
  slug: string;
}

interface ReviewItem {
  id: string;
  authorName: string;
  rating: number;
  title?: string | null;
  content: string;
  isVerified: boolean;
  createdAt: string;
}

interface QuestionItem {
  id: string;
  question: string;
  answer?: string | null;
  askedBy?: string | null;
}

interface ProductDetails {
  id: string;
  slug: string;
  name: string;
  subtitle?: string | null;
  description: string;
  badge?: string | null;
  category?: { name: string; slug: string } | null;
  variants: Variant[];
  images: ImageItem[];
  ingredients: IngredientItem[];
  concerns: ConcernItem[];
  reviews: ReviewItem[];
  questions: QuestionItem[];
}

interface CrossSellProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  variantId?: string;
  size?: string;
}

interface ProductClientProps {
  product: ProductDetails;
  crossSellProducts: CrossSellProduct[];
}

export function ProductClient({ product, crossSellProducts }: ProductClientProps) {
  const store = useStore();
  const [selectedVariant, setSelectedVariant] = React.useState<Variant>(
    product.variants[0] || {
      id: `var-${product.id}`,
      name: "Standard",
      sku: "SKU-001",
      size: "50ml",
      price: 899,
      inventoryQuantity: 25,
    }
  );

  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [purchaseType, setPurchaseType] = React.useState<"onetime" | "subscribe">("onetime");
  const [isAdding, setIsAdding] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"reviews" | "qa">("reviews");

  const images =
    product.images.length > 0
      ? product.images
      : [
          {
            id: "img-1",
            url: "/images/placeholder.jpg",
            alt: product.name,
            isPrimary: true,
          },
        ];

  const currentImage = images[selectedImageIndex] || images[0];

  // Pricing calculation
  const basePrice = selectedVariant.price;
  const currentPrice =
    purchaseType === "subscribe" ? Math.round(basePrice * 0.9) : basePrice;
  const compareAtPrice =
    purchaseType === "subscribe" ? basePrice : selectedVariant.compareAtPrice;

  // Stock status
  const stock = selectedVariant.inventoryQuantity;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;

  // Rating metrics
  const reviewCount = product.reviews.length;
  const avgRating =
    reviewCount > 0
      ? Number(
          (
            product.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount
          ).toFixed(1)
        )
      : 4.9;

  const isWishlisted = store.isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      store.addToCart({
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        subtitle: product.subtitle || undefined,
        size: selectedVariant.size,
        price: currentPrice,
        compareAtPrice,
        image: currentImage.url,
        quantity,
        maxStock: stock,
      });
      setIsAdding(false);
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          {
            label: product.category?.name || "Shop",
            href: `/collections/${product.category?.slug || "all"}`,
          },
          { label: product.name, current: true },
        ]}
      />

      {/* Main PDP Grid: Gallery (Left) + Buy Box (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* LEFT COLUMN: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Hero Image */}
          <div className="relative aspect-square rounded-[24px] overflow-hidden bg-cream-100 border border-cream-200 shadow-soft group">
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="forest" size="default">
                  {product.badge}
                </Badge>
              </div>
            )}

            <button
              type="button"
              onClick={() => store.toggleWishlist(product.id)}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-cream-50/90 backdrop-blur-sm border border-cream-200/80 flex items-center justify-center text-ink-900 transition-transform duration-200 hover:scale-110 shadow-subtle"
            >
              <Heart
                className={cn(
                  "w-5 h-5",
                  isWishlisted ? "fill-clay-400 text-clay-400" : "text-ink-500 hover:text-ink-900"
                )}
              />
            </button>

            <ImageSlot
              src={currentImage.url}
              alt={currentImage.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={cn(
                    "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-cream-100",
                    selectedImageIndex === idx
                      ? "border-forest-800 ring-2 ring-forest-800/20"
                      : "border-cream-200 hover:border-cream-300 opacity-80 hover:opacity-100"
                  )}
                >
                  <ImageSlot src={img.url} alt={img.alt} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Key Benefits Icons Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-cream-200 text-xs text-ink-900">
            <div className="flex items-center gap-2 p-3 rounded-card bg-cream-100/60 border border-cream-200/80">
              <ShieldCheck className="w-4 h-4 text-forest-600 shrink-0" />
              <span className="font-medium">Dermatologist Verified</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-card bg-cream-100/60 border border-cream-200/80">
              <Leaf className="w-4 h-4 text-forest-600 shrink-0" />
              <span className="font-medium">100% Vegan & Cruelty-Free</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-card bg-cream-100/60 border border-cream-200/80">
              <Sparkles className="w-4 h-4 text-forest-600 shrink-0" />
              <span className="font-medium">Clinical Bio-Actives</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-card bg-cream-100/60 border border-cream-200/80">
              <Recycle className="w-4 h-4 text-forest-600 shrink-0" />
              <span className="font-medium">Infinitely Recyclable Glass</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Buy Box */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="space-y-2">
            {product.subtitle && (
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-600">
                {product.subtitle}
              </p>
            )}
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating Summary Link */}
            <div className="flex items-center gap-3 pt-1">
              <RatingStars rating={avgRating} reviewCount={reviewCount} size="sm" />
              <span className="text-xs text-ink-500">•</span>
              <a
                href="#reviews"
                className="text-xs font-semibold text-forest-800 hover:underline"
              >
                Read {reviewCount} Reviews
              </a>
            </div>
          </div>

          {/* Pricing & Stock indicator */}
          <div className="flex items-center justify-between py-3 border-y border-cream-200">
            <PriceBlock
              price={currentPrice}
              compareAtPrice={compareAtPrice}
              size="lg"
            />
            <div>
              {isOutOfStock ? (
                <Badge variant="clay">Out of Stock</Badge>
              ) : isLowStock ? (
                <span className="text-xs font-semibold text-danger flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-danger animate-ping" />
                  Only {stock} left in stock
                </span>
              ) : (
                <span className="text-xs font-medium text-forest-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  In Stock & Ready to Ship
                </span>
              )}
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-ink-500 leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Variant / Size Selection */}
          {product.variants.length > 1 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-forest-800">
                Select Size: <span className="font-normal text-ink-900">{selectedVariant.size}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={cn(
                      "px-4 py-2 rounded-pill text-xs font-semibold border transition-all",
                      selectedVariant.id === v.id
                        ? "bg-forest-800 text-cream-50 border-forest-800 shadow-subtle"
                        : "bg-cream-50 text-ink-900 border-cream-200 hover:border-forest-600"
                    )}
                  >
                    <span>{v.size}</span>
                    <span className="ml-2 opacity-80">({formatCurrency(v.price)})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Purchase Option (One-Time vs Subscribe & Save 10%) */}
          <div className="space-y-2 bg-cream-100/70 p-3.5 rounded-card border border-cream-200">
            <div
              onClick={() => setPurchaseType("onetime")}
              className={cn(
                "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors border",
                purchaseType === "onetime"
                  ? "bg-cream-50 border-forest-800 shadow-subtle"
                  : "border-transparent hover:bg-cream-200/50"
              )}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="purchaseType"
                  checked={purchaseType === "onetime"}
                  onChange={() => setPurchaseType("onetime")}
                  className="accent-forest-800"
                />
                <span className="text-xs font-semibold text-ink-900">One-time purchase</span>
              </div>
              <span className="text-xs font-bold text-ink-900">{formatCurrency(basePrice)}</span>
            </div>

            <div
              onClick={() => setPurchaseType("subscribe")}
              className={cn(
                "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors border",
                purchaseType === "subscribe"
                  ? "bg-cream-50 border-forest-800 shadow-subtle"
                  : "border-transparent hover:bg-cream-200/50"
              )}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="purchaseType"
                  checked={purchaseType === "subscribe"}
                  onChange={() => setPurchaseType("subscribe")}
                  className="accent-forest-800"
                />
                <div>
                  <span className="text-xs font-semibold text-ink-900">
                    Subscribe & Save 10%
                  </span>
                  <p className="text-[10px] text-ink-500">Delivered every 60 days. Cancel anytime.</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-forest-800">
                  {formatCurrency(Math.round(basePrice * 0.9))}
                </span>
                <span className="block text-[10px] text-ink-500 line-through">
                  {formatCurrency(basePrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Quantity & Add to Bag Row */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                max={stock}
                size="default"
              />
              <Button
                type="button"
                variant="primary"
                size="lg"
                loading={isAdding}
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className="flex-1 rounded-pill"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                {isOutOfStock ? "Out of Stock" : `Add to Bag • ${formatCurrency(currentPrice * quantity)}`}
              </Button>
            </div>

            {/* Free Shipping & Returns prompt */}
            <div className="flex items-center justify-between text-[11px] text-ink-500 px-1 pt-1">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-forest-800" />
                Free shipping on orders over $50
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-forest-800" />
                30-day gentle guarantee
              </span>
            </div>
          </div>

          {/* Accordion Details: Ingredients, How to Use, Shipping */}
          <div className="pt-4 border-t border-cream-200">
            <Accordion type="single" collapsible defaultValue="ingredients">
              <AccordionItem value="ingredients" title="Full Ingredients (INCI) & Key Bio-Actives">
                <div className="space-y-3 text-xs text-ink-500 leading-relaxed pt-1">
                  {product.ingredients.length > 0 ? (
                    <div className="space-y-2">
                      <p className="font-semibold text-ink-900">Key Bio-Actives:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        {product.ingredients.map((ing) => (
                          <li key={ing.id}>
                            <strong className="text-ink-900">{ing.name}</strong>
                            {ing.inciName && (
                              <span className="text-[11px] italic text-ink-500 ml-1">
                                ({ing.inciName})
                              </span>
                            )}
                            {ing.description && <span>: {ing.description}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>
                      Cold-Pressed Botanical Squalane, Centella Asiatica Extract, Biomimetic
                      Ceramides NP/AP/EOP, Hyaluronic Acid, Camellia Sinensis Leaf Extract, Purified
                      Aqua.
                    </p>
                  )}
                  <p className="text-[11px] pt-1">
                    Free from: synthetic fragrances, parabens, sulfates (SLS/SLES), phthalates, and
                    drying denatured alcohol.
                  </p>
                </div>
              </AccordionItem>

              <AccordionItem value="how-to-use" title="How to Use in Your Routine">
                <div className="space-y-2 text-xs text-ink-500 leading-relaxed pt-1">
                  <p>
                    <strong>Step 1:</strong> Dispense 3 to 4 drops onto cleansed fingertips.
                  </p>
                  <p>
                    <strong>Step 2:</strong> Gently press into damp skin across the face, neck, and
                    décolleté using upward rolling motions.
                  </p>
                  <p>
                    <strong>Step 3:</strong> Allow 60 seconds for lipid absorption before sealing
                    with your barrier cream and SPF.
                  </p>
                  <p className="italic text-[11px] text-forest-800 pt-1">
                    Suitable for morning (AM) and evening (PM) routines.
                  </p>
                </div>
              </AccordionItem>

              <AccordionItem value="shipping" title="Complimentary Shipping & Returns">
                <div className="space-y-2 text-xs text-ink-500 leading-relaxed pt-1">
                  <p>
                    <strong>Standard Delivery:</strong> 2 to 4 business days. Free for all orders
                    over $50.
                  </p>
                  <p>
                    <strong>30-Day Happiness Guarantee:</strong> If a formula does not align with
                    your skin equilibrium, return the unused portion within 30 days for a full refund.
                  </p>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* COMPLETE THE ROUTINE CROSS-SELL */}
      {crossSellProducts.length > 0 && (
        <section className="pt-10 border-t border-cream-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-600 mb-1">
                Synergistic Pairing
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink-900">
                Complete the Botanical Routine
              </h2>
            </div>
            <Link
              href="/collections/all"
              className="text-xs font-semibold text-forest-800 hover:underline hidden sm:block"
            >
              Explore Full Range →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {crossSellProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                slug={p.slug}
                name={p.name}
                subtitle={p.subtitle}
                price={p.price}
                compareAtPrice={p.compareAtPrice}
                rating={p.rating}
                reviewCount={p.reviewCount}
                image={p.image}
                variantId={p.variantId}
                size={p.size}
              />
            ))}
          </div>
        </section>
      )}

      {/* CUSTOMER REVIEWS & Q&A TABS */}
      <section id="reviews" className="pt-10 border-t border-cream-200 space-y-8">
        <div className="flex items-center gap-4 border-b border-cream-200 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={cn(
              "font-serif text-xl sm:text-2xl font-bold pb-2 transition-colors relative",
              activeTab === "reviews"
                ? "text-ink-900 border-b-2 border-forest-800"
                : "text-ink-500 hover:text-ink-900"
            )}
          >
            Customer Reviews ({reviewCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("qa")}
            className={cn(
              "font-serif text-xl sm:text-2xl font-bold pb-2 transition-colors relative",
              activeTab === "qa"
                ? "text-ink-900 border-b-2 border-forest-800"
                : "text-ink-500 hover:text-ink-900"
            )}
          >
            Questions & Answers ({product.questions.length})
          </button>
        </div>

        {activeTab === "reviews" ? (
          <div className="space-y-6">
            {/* Review Score Summary Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-card bg-cream-100/60 border border-cream-200 items-center">
              <div className="text-center sm:text-left space-y-1 sm:border-r sm:border-cream-200 sm:pr-6">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-ink-900">
                  {avgRating}
                </span>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-ink-500">Based on {reviewCount} verified reviews</p>
              </div>

              <div className="sm:col-span-2 space-y-1.5 text-xs text-ink-500">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = product.reviews.filter((r) => r.rating === stars).length;
                  const pct = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
                  return (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="w-12">{stars} Stars</span>
                      <div className="flex-1 bg-cream-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-forest-800 h-full rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-8 text-right font-medium">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review Cards List */}
            {product.reviews.length === 0 ? (
              <p className="text-xs text-ink-500 text-center py-6">
                Be the first to review this formulation.
              </p>
            ) : (
              <div className="divide-y divide-cream-200 space-y-4">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex text-gold-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="font-bold text-xs text-ink-900">{rev.authorName}</span>
                        {rev.isVerified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-forest-800 bg-sage-100 px-2 py-0.5 rounded-pill">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-ink-500">
                        {new Date(rev.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {rev.title && (
                      <h4 className="font-serif text-sm font-bold text-ink-900">{rev.title}</h4>
                    )}
                    <p className="text-xs text-ink-500 leading-relaxed">{rev.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Q&A Section */
          <div className="space-y-4">
            {product.questions.length === 0 ? (
              <p className="text-xs text-ink-500 py-6 text-center">
                No questions yet. Our skincare educators are standing by to help.
              </p>
            ) : (
              <div className="divide-y divide-cream-200 space-y-4">
                {product.questions.map((q) => (
                  <div key={q.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-forest-800 text-cream-50 text-[10px] font-bold flex items-center justify-center shrink-0">
                        Q
                      </span>
                      <h4 className="text-xs font-bold text-ink-900">{q.question}</h4>
                    </div>
                    {q.answer && (
                      <div className="flex items-start gap-2 pl-7 text-xs text-ink-500">
                        <span className="w-5 h-5 rounded-full bg-sage-300 text-forest-900 text-[10px] font-bold flex items-center justify-center shrink-0">
                          A
                        </span>
                        <p>{q.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* STICKY MOBILE BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream-50/95 backdrop-blur-md border-t border-cream-200 p-3 shadow-floating flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-serif text-xs font-bold text-ink-900 truncate">{product.name}</p>
          <p className="text-xs font-semibold text-forest-800">{formatCurrency(currentPrice)}</p>
        </div>
        <Button
          type="button"
          variant="primary"
          size="sm"
          loading={isAdding}
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className="rounded-pill px-5 shrink-0"
        >
          <ShoppingBag className="w-3.5 h-3.5 mr-1" />
          Add to Bag
        </Button>
      </div>
    </div>
  );
}
