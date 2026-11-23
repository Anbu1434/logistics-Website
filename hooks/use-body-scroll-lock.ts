"use client";

import * as React from "react";

/**
 * Locks body scroll while an overlay is open and compensates for the
 * scrollbar so the page behind the overlay does not shift.
 */
export function useBodyScrollLock(locked: boolean) {
  React.useEffect(() => {
    if (!locked) return;

    const body = document.body;
    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}
