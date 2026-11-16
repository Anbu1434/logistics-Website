"use client";

import * as React from "react";
import { X } from "lucide-react";
import { useQuoteModal } from "@/context/quote-modal-context";
import { QuoteForm } from "@/components/sections/quote-form";
import { cn } from "@/lib/utils";

export function QuoteModal() {
  const { isOpen, closeQuoteModal } = useQuoteModal();

  // Lock body scroll and handle Escape key while modal is open
  React.useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeQuoteModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeQuoteModal]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto bg-navy-900/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        // Close if clicking outside the modal dialog
        if (e.target === e.currentTarget) {
          closeQuoteModal();
        }
      }}
    >
      <div
        className={cn(
          "relative w-full max-w-[560px] my-auto",
          "animate-in zoom-in-95 duration-200 ease-out"
        )}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={closeQuoteModal}
          className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-navy-900 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          aria-label="Close quote form modal"
        >
          <X className="w-5 h-5" strokeWidth={2.2} />
        </button>

        {/* Embedded Interactive QuoteForm */}
        <QuoteForm className="shadow-2xl border-2 border-slate-200/90" />
      </div>
    </div>
  );
}

