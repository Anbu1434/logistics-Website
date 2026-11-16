"use client";

import * as React from "react";

interface QuoteModalContextValue {
  isOpen: boolean;
  openQuoteModal: () => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = React.createContext<QuoteModalContextValue | undefined>(
  undefined
);

export function useQuoteModal() {
  const context = React.useContext(QuoteModalContext);
  if (!context) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return context;
}

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const openQuoteModal = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeQuoteModal = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  // Listen for custom 'open-quote-modal' window events or query params/hash
  React.useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-quote-modal", handleOpenEvent);

    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("quote") === "open" || window.location.hash === "#quote") {
      setIsOpen(true);
    }

    return () => {
      window.removeEventListener("open-quote-modal", handleOpenEvent);
    };
  }, []);

  return (
    <QuoteModalContext.Provider
      value={{
        isOpen,
        openQuoteModal,
        closeQuoteModal,
      }}
    >
      {children}
    </QuoteModalContext.Provider>
  );
}

