"use client";

import * as React from "react";
import { X } from "lucide-react";
import { useQuoteModal } from "@/context/quote-modal-context";
import { QuoteForm } from "@/components/sections/quote-form";
import { Modal } from "@/components/motion/modal";

export function QuoteModal() {
  const { isOpen, closeQuoteModal } = useQuoteModal();

  return (
    <Modal
      open={isOpen}
      onClose={closeQuoteModal}
      labelledBy="quote-modal-title"
      className="w-full max-w-[560px] my-auto"
    >
      {/* Floating Close Button */}
      <button
        type="button"
        onClick={closeQuoteModal}
        className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-navy-900 shadow-md flex items-center justify-center motion-safe:transition-transform motion-safe:duration-150 motion-safe:hover:scale-105 motion-safe:active:scale-95 focus-visible:outline-2 focus-visible:outline-ocean-600 cursor-pointer"
        aria-label="Close quote form modal"
      >
        <X className="w-5 h-5" strokeWidth={2.2} aria-hidden="true" />
      </button>

      {/* Embedded Interactive QuoteForm */}
      <QuoteForm className="shadow-2xl border-2 border-slate-200/90" />
    </Modal>
  );
}
