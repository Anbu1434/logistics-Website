"use client";

import * as React from "react";

interface TrackingModalContextValue {
  isOpen: boolean;
  trackingId: string;
  openTrackingModal: (id?: string) => void;
  closeTrackingModal: () => void;
}

const TrackingModalContext = React.createContext<
  TrackingModalContextValue | undefined
>(undefined);

export function useTrackingModal() {
  const context = React.useContext(TrackingModalContext);
  if (!context) {
    throw new Error(
      "useTrackingModal must be used within a TrackingModalProvider"
    );
  }
  return context;
}

export function TrackingModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [trackingId, setTrackingId] = React.useState("");

  const openTrackingModal = React.useCallback((id?: string) => {
    if (id && id.trim()) {
      setTrackingId(id.trim().toUpperCase());
    }
    setIsOpen(true);
  }, []);

  const closeTrackingModal = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  // Listen for query params or custom window events
  React.useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ id?: string }>;
      if (customEvent.detail?.id) {
        setTrackingId(customEvent.detail.id.toUpperCase());
      }
      setIsOpen(true);
    };

    window.addEventListener("open-tracking-modal", handleOpenEvent);

    const searchParams = new URLSearchParams(window.location.search);
    const queryId = searchParams.get("id");
    if (searchParams.get("track") === "open" || queryId || window.location.hash === "#track") {
      if (queryId) {
        setTrackingId(queryId.toUpperCase());
      }
      setIsOpen(true);
    }

    return () => {
      window.removeEventListener("open-tracking-modal", handleOpenEvent);
    };
  }, []);

  return (
    <TrackingModalContext.Provider
      value={{
        isOpen,
        trackingId,
        openTrackingModal,
        closeTrackingModal,
      }}
    >
      {children}
    </TrackingModalContext.Provider>
  );
}

