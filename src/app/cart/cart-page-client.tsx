"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Heart,
  ArrowRight,
  Truck,
  Tag,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useStore } from "@/context/store-context";
import { formatCurrency } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { ImageSlot } from "@/components/ui/image-slot";
import { ProductCard } from "@/components/ui/product-card";

interface UpsellProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  variantId?: string;
  size?: string;
}

interface CartPageClientProps {
  upsells: UpsellProduct[];
}

export function CartPageClient({ upsells }: CartPageClientProps) {
  const {
    cart,
    cartCount,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    hasFreeShipping,
    removeFromCart,
    updateQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    toggleWishlist,
  } = useStore();

  const [couponInput, setCouponInput] = React.useState("");
  const [couponError, setCouponError] = React.useState<string | null>(null);
  const [isApplying, setIsApplying] = React.useState(false);

  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;

    setIsApplying(true);
    const result = await applyCoupon(couponInput);
    setIsApplying(false);

    if (result.success) {
      setCouponInput("");
    } else {
      setCouponError(result.message);
    }
  };

  const handleMoveToWishlist = (item: (typeof cart)[0]) => {
    toggleWishlist(item.productId);
    removeFromCart(item.variantId);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shopping Bag", current: true },
          ]}
        />

        <div className="p-8 sm:p-16 text-center rounded-hero bg-cream-100/60 border border-cream-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-cream-50 flex items-center justify-center mx-auto text-ink-500 shadow-subtle">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900">
              Your bag is currently empty
            </h1>
            <p className="text-xs sm:text-sm text-ink-500 max-w-md mx-auto">
              Your skin deserves gentle, clinically verified botanical care. Explore our best-selling
              cleansers, active serums, and barrier repair cremes.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/collections/all">
              <Button className="rounded-pill" withArrow>
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>

        {/* Recommendations */}
        <div className="pt-8 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-ink-900">
            Recommended Best Sellers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upsells.map((p) => (
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
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shopping Bag", current: true },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-cream-200 gap-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900">
          Your Shopping Bag
        </h1>
        <span className="text-xs text-ink-500 font-medium">
          {cartCount} {cartCount === 1 ? "formulation" : "formulations"} selected
        </span>
      </div>

      {/* Free Shipping Progress Strip */}
      <div className="bg-sage-100/70 p-4 rounded-xl border border-cream-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-forest-900">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-forest-800 shrink-0" />
            {hasFreeShipping ? (
              <span>🎉 Congratulations! You have qualified for <strong>Free Complimentary Shipping</strong>.</span>
            ) : (
              <span>
                Add <strong>{formatCurrency(amountNeededForFreeShipping)}</strong> more to unlock <strong>Free Shipping</strong>.
              </span>
            )}
          </div>
          <span className="text-[11px] font-mono">{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full bg-cream-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-forest-800 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Items List (Left) + Order Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Line Items */}
        <div className="lg:col-span-8 bg-cream-100/40 rounded-card border border-cream-200 divide-y divide-cream-200 overflow-hidden">
          {cart.map((item) => (
            <div key={item.variantId} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-100 border border-cream-200 shrink-0">
                  <ImageSlot src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="space-y-1">
                  <Link
                    href={`/products/${item.productId}`}
                    className="font-serif text-base font-bold text-ink-900 hover:text-forest-800 transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.subtitle && (
                    <p className="text-xs text-ink-500">{item.subtitle}</p>
                  )}
                  <p className="text-xs font-medium text-forest-800">Size: {item.size}</p>
                  <div className="flex items-center gap-4 pt-1 text-xs text-ink-500">
                    <button
                      type="button"
                      onClick={() => handleMoveToWishlist(item)}
                      className="hover:text-forest-800 inline-flex items-center gap-1"
                    >
                      <Heart className="w-3.5 h-3.5" /> Move to Wishlist
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.variantId)}
                      className="hover:text-danger inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-cream-200/60">
                <span className="font-semibold text-base text-ink-900">
                  {formatCurrency(item.price * item.quantity)}
                </span>
                <QuantityStepper
                  value={item.quantity}
                  onChange={(qty) => updateQuantity(item.variantId, qty)}
                  max={item.maxStock}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="lg:col-span-4 bg-cream-100/70 p-6 rounded-card border border-cream-200 space-y-6">
          <h2 className="font-serif text-xl font-bold text-ink-900">Order Summary</h2>

          {/* Promo code */}
          <div>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 bg-sage-100 border border-sage-300 rounded-xl text-xs text-forest-900">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-forest-800" />
                  <div>
                    <span className="font-bold">{appliedCoupon.code}</span>
                    <span className="block text-[10px] text-ink-500">{appliedCoupon.description}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-xs text-ink-500 hover:text-danger underline font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (VERDEA10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 h-10 px-3 text-xs rounded-pill bg-cream-50 border border-cream-200 text-ink-900 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="sm"
                  disabled={isApplying || !couponInput.trim()}
                  className="rounded-pill px-4"
                >
                  {isApplying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Apply"}
                </Button>
              </form>
            )}
            {couponError && (
              <p className="text-[11px] text-danger mt-1.5 pl-2">{couponError}</p>
            )}
          </div>

          {/* Breakdown */}
          <div className="space-y-2.5 text-xs text-ink-500 border-t border-cream-200 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-ink-900">{formatCurrency(cartSubtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-forest-800">
                <span>Discount ({appliedCoupon?.code})</span>
                <span className="font-semibold">-{formatCurrency(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-ink-900">
                {shippingFee === 0 ? "FREE" : formatCurrency(shippingFee)}
              </span>
            </div>

            <div className="flex justify-between text-base font-bold text-ink-900 pt-3 border-t border-cream-200">
              <span>Estimated Total</span>
              <span className="font-serif text-lg">{formatCurrency(cartTotal)}</span>
            </div>
            <p className="text-[10px] text-ink-500 text-right">Applicable taxes calculated at checkout.</p>
          </div>

          {/* Checkout CTA */}
          <div className="space-y-2">
            <Link
              href="/checkout"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-pill bg-forest-800 text-cream-50 text-xs font-semibold tracking-wider uppercase hover:bg-forest-600 transition-colors shadow-subtle group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-ink-500 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-forest-800" />
              <span>PCI-DSS Level 1 Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Sell Upsell Row */}
      <div className="pt-10 border-t border-cream-200 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-ink-900">
          Pairs Well With Your Bag
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {upsells.map((p) => (
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
      </div>
    </div>
  );
}

