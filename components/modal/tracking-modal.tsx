"use client";

import * as React from "react";
import {
  X,
  PackageSearch,
  MapPin,
  Radio,
  CheckCircle2,
} from "lucide-react";
import { useTrackingModal } from "@/context/tracking-modal-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TrackingEvent {
  label: string;
  location: string;
  timestamp: string;
  status: "completed" | "current" | "pending";
}

interface ShipmentData {
  trackingId: string;
  origin: string;
  destination: string;
  serviceType: string;
  vesselName: string;
  status: "booked" | "in_transit" | "delivered" | "delayed";
  statusLabel: string;
  eta: string;
  departedDate: string;
  weight: string;
  events: TrackingEvent[];
}

const DEFAULT_SHIPMENT: ShipmentData = {
  trackingId: "LG-2026-004981",
  origin: "Port of Shanghai (Yangshan Terminal), CN",
  destination: "Port of Long Beach (Pier T), CA, US",
  serviceType: "Ocean Freight FCL - 40ft High Cube",
  vesselName: "Cosco Shipping Taurus (Voyage 024W)",
  status: "in_transit",
  statusLabel: "In Transit — Maritime Lane",
  eta: "Nov 08, 2026 • 14:00 PST",
  departedDate: "Nov 02, 2026 • 08:30 CST",
  weight: "22,400 kg (1 x 40HC Container)",
  events: [
    {
      label: "Cargo Received & Export Customs Cleared",
      location: "Shanghai Terminal CFS, CN",
      timestamp: "Nov 01, 2026 • 14:20 CST",
      status: "completed",
    },
    {
      label: "Container Loaded onto Vessel",
      location: "Yangshan Deepwater Port, CN",
      timestamp: "Nov 02, 2026 • 08:30 CST",
      status: "completed",
    },
    {
      label: "Vessel Underway — Trans-Pacific Maritime Corridor",
      location: "North Pacific Route (34.2° N, 168.4° E) • Speed: 19.2 knots",
      timestamp: "Nov 07, 2026 • 06:00 UTC",
      status: "current",
    },
    {
      label: "Estimated Berth & Import Customs Release",
      location: "Port of Long Beach, CA, US",
      timestamp: "Nov 08, 2026 • 14:00 PST (Forecasted)",
      status: "pending",
    },
    {
      label: "Inland Drayage & Final Delivery to Consignee",
      location: "Ontario Distribution Center, CA, US",
      timestamp: "Nov 09, 2026 • 10:00 PST (Scheduled)",
      status: "pending",
    },
  ],
};

export function TrackingModal() {
  const { isOpen, trackingId, closeTrackingModal } = useTrackingModal();
  const [inputVal, setInputVal] = React.useState(trackingId);
  const [activeShipment, setActiveShipment] = React.useState<ShipmentData | null>(DEFAULT_SHIPMENT);
  const [isSearching, setIsSearching] = React.useState(false);

  const handleLookup = (id: string) => {
    setIsSearching(true);
    setTimeout(() => {
      const cleanId = id.toUpperCase().trim();
      if (cleanId === "LG-2026-008412") {
        setActiveShipment({
          ...DEFAULT_SHIPMENT,
          trackingId: "LG-2026-008412",
          serviceType: "Priority Air Freight - Medical Supplies",
          origin: "Frankfurt Airport (FRA), Germany",
          destination: "Chicago O'Hare (ORD), IL, US",
          vesselName: "Lufthansa Cargo Flight LH8220",
          status: "in_transit",
          statusLabel: "In Flight — Mid-Atlantic",
          eta: "Nov 08, 2026 • 18:45 CST",
          departedDate: "Nov 07, 2026 • 11:15 CET",
          weight: "1,450 kg (4 Skids)",
          events: [
            {
              label: "Shipment Tendered & Security Screening Complete",
              location: "Frankfurt CargoCenter (FRA)",
              timestamp: "Nov 07, 2026 • 07:30 CET",
              status: "completed",
            },
            {
              label: "Aircraft Departed",
              location: "Frankfurt Airport (FRA)",
              timestamp: "Nov 07, 2026 • 11:15 CET",
              status: "completed",
            },
            {
              label: "Mid-Atlantic En Route (Cruising at FL360)",
              location: "Atlantic Air Corridor",
              timestamp: "Nov 08, 2026 • 06:00 UTC",
              status: "current",
            },
            {
              label: "Touchdown & Customs Recovery",
              location: "Chicago O'Hare International (ORD)",
              timestamp: "Nov 08, 2026 • 18:45 CST (Forecasted)",
              status: "pending",
            },
          ],
        });
      } else {
        setActiveShipment({
          ...DEFAULT_SHIPMENT,
          trackingId: cleanId,
        });
      }
      setIsSearching(false);
    }, 250);
  };

  // Sync tracking ID when opened
  React.useEffect(() => {
    if (trackingId) {
      setInputVal(trackingId.toUpperCase());
      handleLookup(trackingId.toUpperCase());
    }
  }, [trackingId]);

  // Lock body scroll and handle Escape key while modal is open
  React.useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeTrackingModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeTrackingModal]);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleLookup(inputVal.trim());
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tracking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto bg-navy-900/80 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeTrackingModal();
        }
      }}
    >
      <div
        className={cn(
          "relative w-full max-w-[820px] my-auto bg-white rounded-[24px] sm:rounded-[28px] border-2 border-slate-200/90 shadow-2xl overflow-hidden",
          "animate-in zoom-in-95 duration-200 ease-out flex flex-col max-h-[92vh]"
        )}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={closeTrackingModal}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-navy-900 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          aria-label="Close tracking modal"
        >
          <X className="w-5 h-5" strokeWidth={2.2} />
        </button>

        {/* Top Header & Search Bar Bar */}
        <div className="bg-[#F8FAFD] p-5 sm:p-6 border-b border-line flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <h2 id="tracking-modal-title" className="font-display font-bold text-[18px] sm:text-[20px] text-navy-900">
              Live Shipment Telemetry
            </h2>
          </div>

          <form onSubmit={onFormSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <PackageSearch className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="e.g. LG-2026-004981"
                className="w-full h-[46px] pl-11 pr-4 bg-white text-ink placeholder:text-slate-400 font-mono text-[15px] font-semibold rounded-lg border border-line focus:outline-none focus:ring-2 focus:ring-orange-500 uppercase transition-all"
                required
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={isSearching}
              className="h-[46px] px-6 text-[14px] font-semibold shrink-0"
            >
              {isSearching ? "Searching..." : "Track Status"}
            </Button>
          </form>

          {/* Quick-fill Pills */}
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-slate-500">
            <span>Quick test IDs:</span>
            <button
              type="button"
              onClick={() => {
                setInputVal("LG-2026-004981");
                handleLookup("LG-2026-004981");
              }}
              className="font-mono bg-white text-ocean-600 hover:text-orange-500 px-2 py-0.5 rounded border border-line transition-colors cursor-pointer"
            >
              LG-2026-004981 (Ocean FCL)
            </button>
            <button
              type="button"
              onClick={() => {
                setInputVal("LG-2026-008412");
                handleLookup("LG-2026-008412");
              }}
              className="font-mono bg-white text-ocean-600 hover:text-orange-500 px-2 py-0.5 rounded border border-line transition-colors cursor-pointer"
            >
              LG-2026-008412 (Air Freight)
            </button>
          </div>
        </div>

        {/* Scrollable Status Content */}
        <div className="overflow-y-auto flex-1">
          {activeShipment && (
            <div>
              {/* Header Bar */}
              <div className="bg-navy-900 text-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="font-mono font-bold text-[18px] sm:text-[20px] text-white">
                      {activeShipment.trackingId}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-ocean-600/40 text-sky-200 border border-ocean-600/60">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {activeShipment.statusLabel}
                    </span>
                  </div>
                  <span className="text-[13px] text-slate-300 font-sans block">
                    {activeShipment.serviceType} • Vessel: {activeShipment.vesselName}
                  </span>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-[11px] text-slate-400 uppercase font-mono block">Estimated Arrival</span>
                  <span className="font-display font-bold text-[16px] sm:text-[17px] text-orange-400 block">
                    {activeShipment.eta}
                  </span>
                </div>
              </div>

              {/* Route Overview */}
              <div className="p-5 sm:p-6 border-b border-line bg-[#F8FAFD] grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-line flex items-center justify-center text-slate-600 shrink-0 mt-0.5 shadow-sm">
                    <MapPin className="w-4 h-4 text-ocean-600" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-mono block">Origin Port</span>
                    <span className="font-display font-bold text-[14px] text-navy-900 block leading-snug">
                      {activeShipment.origin}
                    </span>
                    <span className="text-[11.5px] text-slate-500 font-mono mt-0.5 block">
                      Departed: {activeShipment.departedDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-line flex items-center justify-center text-orange-500 shrink-0 mt-0.5 shadow-sm">
                    <Radio className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-mono block">Telemetry</span>
                    <span className="font-display font-bold text-[14px] text-orange-600 block leading-snug">
                      Satellite Beacon Active
                    </span>
                    <span className="text-[11.5px] text-slate-500 font-mono mt-0.5 block">
                      5-min telemetry ping
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-line flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-mono block">Final Destination</span>
                    <span className="font-display font-bold text-[14px] text-navy-900 block leading-snug">
                      {activeShipment.destination}
                    </span>
                    <span className="text-[11.5px] text-emerald-600 font-mono font-semibold mt-0.5 block">
                      On Schedule
                    </span>
                  </div>
                </div>
              </div>

              {/* Milestone Checkpoint Timeline */}
              <div className="p-5 sm:p-6 lg:p-7">
                <h3 className="font-display font-bold text-[16px] text-navy-900 mb-5">
                  Milestone & Checkpoint Log
                </h3>

                <div className="relative pl-6 sm:pl-7 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-line">
                  {activeShipment.events.map((evt, idx) => (
                    <div key={idx} className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
                      {/* Node Circle */}
                      <span
                        className={`absolute -left-6 sm:-left-7 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[11px] font-bold ${
                          evt.status === "completed"
                            ? "bg-navy-900 border-navy-900 text-white"
                            : evt.status === "current"
                            ? "bg-orange-500 border-orange-500 text-white ring-4 ring-orange-500/20"
                            : "bg-white border-line text-slate-400"
                        }`}
                      >
                        {evt.status === "completed" ? "✓" : idx + 1}
                      </span>

                      <div className="flex-1">
                        <h4
                          className={`font-display font-bold text-[14px] ${
                            evt.status === "current"
                              ? "text-orange-600"
                              : evt.status === "completed"
                              ? "text-navy-900"
                              : "text-slate-500"
                          }`}
                        >
                          {evt.label}
                        </h4>
                        <span className="text-[12px] text-slate-500 font-sans block mt-0.5">
                          {evt.location}
                        </span>
                      </div>

                      <span className="font-mono text-[11px] text-slate-500 shrink-0 bg-[#F2F6FB] px-2 py-0.5 rounded border border-line self-start">
                        {evt.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

