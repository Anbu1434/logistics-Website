"use client";

import * as React from "react";
import brandConfig from "@/config/brand";

export interface CartItem {
  id: string; // unique item key, usually variantId
  productId: string;
  variantId: string;
  name: string;
  subtitle?: string;
  size: string;
  price: number; // in whole currency units (e.g. 899)
  compareAtPrice?: number;
  image: string;
  quantity: number;
  maxStock: number;
}

export interface AppliedCoupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number; // whole currency
  description: string;
}

interface StoreContextType {
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  discountAmount: number;
  shippingFee: number;
  cartTotal: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  hasFreeShipping: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, "id">, openDrawer?: boolean) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  // Wishlist
  wishlist: string[];
  wishlistCount: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const StoreContext = React.createContext<StoreContextType | undefined>(undefined);

const VALID_COUPONS: Record<string, AppliedCoupon> = {
  VERDEA10: {
    code: "VERDEA10",
    discountPercent: 10,
    description: "10% off your entire order",
  },
  WELCOME15: {
    code: "WELCOME15",
    discountPercent: 15,
    description: "15% off first botanical routine",
  },
  GLOW20: {
    code: "GLOW20",
    discountPercent: 20,
    description: "20% off summer radiance collection",
  },
};

const CART_STORAGE_KEY = "verdea_cart_v1";
const WISHLIST_STORAGE_KEY = "verdea_wishlist_v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [appliedCoupon, setAppliedCoupon] = React.useState<AppliedCoupon | null>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Load from local storage
  React.useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.error("Failed to load store data from localStorage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to local storage
  React.useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart, isInitialized]);

  // Save wishlist to local storage
  React.useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlist, isInitialized]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (newItem: Omit<CartItem, "id">, openDrawer = true) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.variantId === newItem.variantId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        const newQty = Math.min(existing.quantity + newItem.quantity, newItem.maxStock || 10);
        updated[existingIndex] = { ...existing, quantity: newQty };
        return updated;
      } else {
        return [...prev, { ...newItem, id: newItem.variantId }];
      }
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (variantId: string) => {
    setCart((prev) => prev.filter((item) => item.variantId !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.variantId === variantId) {
          const clamped = Math.min(quantity, item.maxStock || 10);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = async (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, message: "Please enter a valid coupon code." };
    }
    const found = VALID_COUPONS[cleanCode];
    if (found) {
      setAppliedCoupon(found);
      return { success: true, message: `Coupon ${found.code} applied successfully!` };
    }
    return { success: false, message: "Invalid coupon code. Try VERDEA10 or WELCOME15." };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Computed values
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const discountAmount = appliedCoupon?.discountPercent
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : appliedCoupon?.discountAmount || 0;

  const freeShippingThreshold = brandConfig.shipping.freeShippingThreshold;
  const hasFreeShipping = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shippingFee = cart.length === 0 || hasFreeShipping ? 0 : brandConfig.shipping.standardRate;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  return (
    <StoreContext.Provider
      value={{
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
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}

