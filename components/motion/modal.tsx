"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE, MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  initialFocusRef?: React.RefObject<HTMLElement>;
}

/**
 * Shared dialog shell: fade backdrop, scale/rise dialog, focus trap,
 * body scroll lock, Escape to close, and focus restoration on exit.
 */
export function Modal({
  open,
  onClose,
  labelledBy,
  children,
  className,
  overlayClassName,
  initialFocusRef,
}: ModalProps) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const backdropDown = React.useRef(false);
  const reducedMotion = useReducedMotion();

  useBodyScrollLock(open);
  useFocusTrap(open, dialogRef, onClose, initialFocusRef);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: MOTION.page / 1000 } },
    exit: { opacity: 0, transition: { duration: MOTION.instant / 1000 } },
  };

  const dialogVariants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: MOTION.fast / 1000 },
        },
        exit: { opacity: 0, transition: { duration: MOTION.fast / 1000 } },
      }
    : {
        hidden: { opacity: 0, scale: MOTION.modalScale, y: MOTION.modalY },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            duration: MOTION.base / 1000,
            ease: EASE.out,
          },
        },
        exit: {
          opacity: 0,
          scale: 0.98,
          transition: { duration: 0.16, ease: "easeIn" as const },
        },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn(
            "fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-navy-900/80 p-3 sm:p-5 md:p-6",
            overlayClassName
          )}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onPointerDown={(event) => {
            backdropDown.current = event.target === event.currentTarget;
          }}
          onPointerUp={(event) => {
            if (backdropDown.current && event.target === event.currentTarget) {
              onClose();
            }
            backdropDown.current = false;
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            className={cn("relative w-full outline-none", className)}
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
