"use client";

import * as React from "react";
import Link from "next/link";
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Truck,
  Tag,
  Loader2,
} from "lucide-react";
import { useStore } from "@/context/store-context";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ImageSlot } from "@/components/ui/image-slot";

export function CartDrawer() {
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
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponInput, setCouponInput] = React.useState("");
  const [couponError, setCouponError] = React.useState<string | null>(null);
  const [isApplying, setIsApplying] = React.useState(false);

  // Close on ESC
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when drawer is open
  React.useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

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

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 shadow-2xl flex flex-col h-full border-l border-cream-200 animate-slideInRight">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-cream-200 bg-cream-100/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-forest-800" />
              <h2 className="font-serif text-xl font-bold text-ink-900">Your Botanical Bag</h2>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-pill bg-sage-300 text-forest-900">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close bag drawer"
              className="p-2 text-ink-500 hover:text-ink-900 rounded-full hover:bg-cream-200/50 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Strip */}
          <div className="bg-sage-100/70 px-4 sm:px-6 py-3 border-b border-cream-200">
            <div className="flex items-center gap-2 text-xs font-medium text-forest-900 mb-1.5">
              <Truck className="w-4 h-4 text-forest-800 shrink-0" />
              {hasFreeShipping ? (
                <span>
                  🎉 You’ve unlocked <strong>Free Complimentary Shipping</strong>!
                </span>
              ) : (
                <span>
                  Add <strong>{formatCurrency(amountNeededForFreeShipping)}</strong> more for{" "}
                  <strong>Free Shipping</strong>
                </span>
              )}
            </div>
            <div className="w-full bg-cream-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-forest-800 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-cream-200">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center text-ink-500">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-ink-900">
                    Your bag is currently empty
                  </h3>
                  <p className="text-xs text-ink-500 max-w-xs">
                    Discover our clinically proven botanical cleansers, active serums, and barrier
                    repair essentials.
                  </p>
                </div>
                <Link href="/collections/all" onClick={closeCart}>
                  <Button className="rounded-pill">
                    Explore Collection
                  </Button>
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.variantId} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-100 border border-cream-200 shrink-0">
                    <ImageSlot
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.productId}`}
                          onClick={closeCart}
                          className="font-serif text-sm font-bold text-ink-900 hover:text-forest-800 truncate transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.variantId)}
                          aria-label={`Remove ${item.name} from bag`}
                          className="text-ink-500 hover:text-danger p-1 transition-colors rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {item.subtitle && (
                        <p className="text-[11px] text-ink-500 truncate">{item.subtitle}</p>
                      )}
                      <p className="text-[11px] font-medium text-forest-800 mt-0.5">
                        Size: {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-cream-200 rounded-pill bg-cream-100 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-ink-900 hover:bg-cream-200/60 transition-colors text-xs"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-ink-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-ink-900 hover:bg-cream-200/60 transition-colors text-xs"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="font-semibold text-sm text-ink-900">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-cream-200 bg-cream-100/60 space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-sage-100/60 border border-sage-300 rounded-xl text-xs">
                    <div className="flex items-center gap-2 text-forest-800">
                      <Tag className="w-4 h-4" />
                      <div>
                        <span className="font-bold">{appliedCoupon.code}</span>
                        <span className="text-ink-500 ml-1">({appliedCoupon.description})</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-ink-500 hover:text-danger text-xs underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. VERDEA10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 h-9 px-3 text-xs rounded-pill bg-cream-50 border border-cream-200 text-ink-900 placeholder:text-ink-500/70 focus:outline-none focus:ring-2 focus:ring-forest-800"
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

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-ink-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-ink-900">
                    {formatCurrency(cartSubtotal)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-forest-800">
                    <span>Discount</span>
                    <span className="font-medium">-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-ink-900">
                    {shippingFee === 0 ? "FREE" : formatCurrency(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-ink-900 pt-2 border-t border-cream-200">
                  <span>Total</span>
                  <span className="font-serif text-base">{formatCurrency(cartTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-pill bg-forest-800 text-cream-50 text-xs font-semibold tracking-wider uppercase hover:bg-forest-600 transition-colors shadow-subtle group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <div className="text-center">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="text-[11px] text-ink-500 hover:text-forest-800 underline font-medium"
                  >
                    View detailed bag & tax estimate
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
