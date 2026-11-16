"use client";

import * as React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Phone,
  Mail,
  Package,
  MapPin,
  ShoppingBag,
  FileText,
  ChevronDown,
  Check,
} from "lucide-react";
import { quoteRequestSchema, type QuoteRequestInput } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SHIPMENT_OPTIONS = [
  { value: "ocean", label: "Ocean Freight (FCL / LCL Container)" },
  { value: "air", label: "Air Freight (Priority / Express)" },
  { value: "road", label: "Road Freight (FTL / LTL Truckload)" },
  { value: "warehousing", label: "Warehousing & Distribution" },
] as const;

export function QuoteForm({ className }: { className?: string }) {
  const [submissionState, setSubmissionState] = React.useState<{
    status: "idle" | "loading" | "success" | "error";
    referenceId?: string;
    errorMessage?: string;
  }>({ status: "idle" });

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuoteRequestInput>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      shipmentType: undefined,
      pickupLocation: "",
      deliveryLocation: "",
      weightVolume: "",
      notes: "",
    },
    mode: "onTouched",
  });

  const selectedShipmentType = watch("shipmentType");
  const selectedOptionObj = SHIPMENT_OPTIONS.find((opt) => opt.value === selectedShipmentType);

  // Close custom dropdown on outside click or touch
  React.useEffect(() => {
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  const onSubmit = async (data: QuoteRequestInput) => {
    setSubmissionState({ status: "loading" });

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to process quote request.");
      }

      setSubmissionState({
        status: "success",
        referenceId: json.referenceId,
      });
      reset();
    } catch (err: any) {
      setSubmissionState({
        status: "error",
        errorMessage: err.message || "Network error. Please try again or call dispatch.",
      });
    }
  };

  if (submissionState.status === "success") {
    return (
      <div
        className={cn(
          "w-full bg-white rounded-[26px] sm:rounded-[28px] border border-slate-200/80 shadow-[0_20px_60px_-15px_rgba(11,31,58,0.28)] p-7 sm:p-8 flex flex-col items-center text-center gap-4 animate-in fade-in duration-300",
          className
        )}
      >
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-emerald-600" strokeWidth={1.75} />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-display font-bold text-[22px] text-navy-900">
            Quote Request Received
          </h3>
          <p className="font-sans text-[13.5px] text-slate-600 leading-relaxed max-w-[320px]">
            Thank you! Our dispatch team will review your manifest and reply within 2 business hours.
          </p>
        </div>

        {submissionState.referenceId && (
          <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-3 flex flex-col gap-0.5">
            <span className="text-[11px] font-sans uppercase font-semibold text-slate-500 tracking-wider">
              Reference Tracking Number
            </span>
            <span className="font-mono text-[16px] font-bold text-navy-900 tracking-wider">
              {submissionState.referenceId}
            </span>
          </div>
        )}

        <Button
          type="button"
          variant="secondary"
          size="default"
          className="w-full mt-2 h-[48px] rounded-btn"
          onClick={() => setSubmissionState({ status: "idle" })}
          showArrow={false}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-white rounded-[22px] sm:rounded-[24px] border border-[#E2E8F0] shadow-[0_16px_44px_-12px_rgba(11,31,58,0.18)] p-4 sm:p-5 md:p-5.5 flex flex-col text-left select-none",
        className
      )}
    >
      {/* 1. Header Container Ship Graphic (Clean, natural photograph with soft left fade) */}
      <div
        className="absolute top-0 left-0 right-0 h-[150px] sm:h-[160px] pointer-events-none overflow-hidden select-none z-0"
        aria-hidden="true"
      >
        <Image
          src="/images/Container-Ship-at-Sunrise.png"
          alt="Container ship at sunrise"
          fill
          priority
          className="object-cover object-[100%_center]"
          sizes="(max-width: 1024px) 420px, 460px"
        />

        {/* Minimal soft left edge fade strictly to maintain headline readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/45 via-18% to-transparent" />

        {/* Gentle bottom blend into card surface */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
      </div>

      {/* 2. Header Content Area (Without Front Line Dash) */}
      <div className="relative z-10 flex flex-col items-start mb-2.5 sm:mb-3">
        {/* Eyebrow without front line dash */}
        <div className="flex items-center mb-1">
          <span className="font-sans font-bold text-[10.5px] sm:text-[11px] tracking-[0.14em] uppercase text-orange-500">
            GET A FREE QUOTE
          </span>
        </div>

        {/* Main Headline */}
        <h3 className="font-display font-bold text-[21px] sm:text-[23px] lg:text-[24px] leading-[1.14] tracking-tight text-navy-900 [text-wrap:balance]">
          <span>Get a Custom</span><br/>
          <span className="text-orange-500 block sm:inline">Shipping Quote</span>
        </h3>
      </div>

      {/* Submission Error Banner */}
      {submissionState.status === "error" && (
        <div
          role="alert"
          className="relative z-10 p-2.5 mb-2.5 bg-red-50 border border-red-200 rounded-[10px] flex items-start gap-2 text-[12px] text-red-600 animate-in fade-in"
        >
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{submissionState.errorMessage}</span>
        </div>
      )}

      {/* 3. Form Fields: Two-Column Responsive Layout (Compact & Symmetrical) */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 flex flex-col gap-2.5 sm:gap-2.5"
        noValidate
      >
        {/* Row 1: Full Name (Full Width) */}
        <div className="flex flex-col">
          <label
            htmlFor="quote-fullName"
            className="flex items-center gap-1.5 text-[12px] font-bold text-navy-900 mb-1"
          >
            <User className="w-3.5 h-3.5 text-navy-900 shrink-0" strokeWidth={1.75} />
            <span>Full Name</span>
            <span className="text-orange-500 font-bold">*</span>
          </label>
          <input
            id="quote-fullName"
            type="text"
            placeholder="Enter your full name"
            {...register("fullName")}
            className={cn(
              "w-full h-[38px] sm:h-[40px] px-3.5 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] text-navy-900 text-[13px] placeholder:text-slate-400 transition-all",
              "focus:bg-white focus:border-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-600/20",
              errors.fullName && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            )}
          />
          {errors.fullName && (
            <span className="text-[10.5px] text-red-600 mt-0.5 leading-tight flex items-center gap-1">
              {errors.fullName.message}
            </span>
          )}
        </div>

        {/* Row 2: Phone Number & Corporate Email (2 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-2.5">
          {/* Phone */}
          <div className="flex flex-col">
            <label
              htmlFor="quote-phone"
              className="flex items-center gap-1.5 text-[12px] font-bold text-navy-900 mb-1"
            >
              <Phone className="w-3.5 h-3.5 text-navy-900 shrink-0" strokeWidth={1.75} />
              <span>Phone Number</span>
              <span className="text-orange-500 font-bold">*</span>
            </label>
            <input
              id="quote-phone"
              type="tel"
              placeholder="Enter your phone number"
              {...register("phone")}
              className={cn(
                "w-full h-[38px] sm:h-[40px] px-3.5 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] text-navy-900 text-[13px] placeholder:text-slate-400 transition-all",
                "focus:bg-white focus:border-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-600/20",
                errors.phone && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              )}
            />
            {errors.phone && (
              <span className="text-[10.5px] text-red-600 mt-0.5 leading-tight flex items-center gap-1">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="quote-email"
              className="flex items-center gap-1.5 text-[12px] font-bold text-navy-900 mb-1"
            >
              <Mail className="w-3.5 h-3.5 text-navy-900 shrink-0" strokeWidth={1.75} />
              <span>Corporate Email</span>
              <span className="text-orange-500 font-bold">*</span>
            </label>
            <input
              id="quote-email"
              type="email"
              placeholder="Enter your company email"
              {...register("email")}
              className={cn(
                "w-full h-[38px] sm:h-[40px] px-3.5 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] text-navy-900 text-[13px] placeholder:text-slate-400 transition-all",
                "focus:bg-white focus:border-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-600/20",
                errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              )}
            />
            {errors.email && (
              <span className="text-[10.5px] text-red-600 mt-0.5 leading-tight flex items-center gap-1">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        {/* Row 3: Custom Shipment Type Dropdown UI */}
        <div className="relative z-30 flex flex-col" ref={dropdownRef}>
          <label
            id="quote-shipmentType-label"
            className="flex items-center gap-1.5 text-[12px] font-bold text-navy-900 mb-1"
          >
            <Package className="w-3.5 h-3.5 text-navy-900 shrink-0" strokeWidth={1.75} />
            <span>Shipment Type</span>
            <span className="text-orange-500 font-bold">*</span>
          </label>
          <div className="relative">
            {/* Hidden registered input for React Hook Form integration */}
            <input type="hidden" {...register("shipmentType")} />

            {/* Custom interactive trigger button */}
            <button
              id="quote-shipmentType-trigger"
              type="button"
              role="combobox"
              aria-labelledby="quote-shipmentType-label"
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
              aria-controls="quote-shipmentType-listbox"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className={cn(
                "w-full h-[38px] sm:h-[40px] px-3.5 pr-9 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] text-left text-[13px] transition-all flex items-center justify-between cursor-pointer",
                "hover:border-slate-300 focus:bg-white focus:border-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-600/20",
                isDropdownOpen && "bg-white border-ocean-600 ring-2 ring-ocean-600/20",
                errors.shipmentType && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              )}
            >
              <span className={cn(selectedOptionObj ? "text-navy-900 font-semibold" : "text-slate-400 font-normal")}>
                {selectedOptionObj ? selectedOptionObj.label : "Select shipment type"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                <ChevronDown
                  className={cn("w-4 h-4 transition-transform duration-200", isDropdownOpen && "rotate-180 text-ocean-600")}
                  strokeWidth={2.2}
                />
              </span>
            </button>

            {/* Custom Modern Floating Options Menu */}
            {isDropdownOpen && (
              <div
                id="quote-shipmentType-listbox"
                role="listbox"
                className="absolute z-50 top-[calc(100%+4px)] left-0 w-full bg-white rounded-[12px] border border-[#E2E8F0] shadow-[0_12px_36px_rgba(11,31,58,0.18)] py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
              >
                {SHIPMENT_OPTIONS.map((opt) => {
                  const isSelected = selectedShipmentType === opt.value;
                  return (
                    <div
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setValue("shipmentType", opt.value, { shouldValidate: true });
                        setIsDropdownOpen(false);
                      }}
                      className={cn(
                        "px-3.5 py-2.5 mx-1 rounded-[8px] text-[13px] flex items-center justify-between transition-colors cursor-pointer select-none",
                        isSelected
                          ? "bg-orange-50 text-orange-600 font-semibold"
                          : "text-navy-900 hover:bg-[#F2F6FB] hover:text-orange-500 font-normal"
                      )}
                    >
                      <span>{opt.label}</span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-orange-500 shrink-0" strokeWidth={2.5} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {errors.shipmentType && (
            <span className="text-[10.5px] text-red-600 mt-0.5 leading-tight flex items-center gap-1">
              {errors.shipmentType.message}
            </span>
          )}
        </div>

        {/* Row 4: Pickup & Delivery Locations (2 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-2.5">
          {/* Pickup Location */}
          <div className="flex flex-col">
            <label
              htmlFor="quote-pickup"
              className="flex items-center gap-1.5 text-[12px] font-bold text-navy-900 mb-1"
            >
              <MapPin className="w-3.5 h-3.5 text-navy-900 shrink-0" strokeWidth={1.75} />
              <span>Pickup Location</span>
              <span className="text-orange-500 font-bold">*</span>
            </label>
            <input
              id="quote-pickup"
              type="text"
              placeholder="City, Port, or Zip"
              {...register("pickupLocation")}
              className={cn(
                "w-full h-[38px] sm:h-[40px] px-3.5 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] text-navy-900 text-[13px] placeholder:text-slate-400 transition-all",
                "focus:bg-white focus:border-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-600/20",
                errors.pickupLocation && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              )}
            />
            {errors.pickupLocation && (
              <span className="text-[10.5px] text-red-600 mt-0.5 leading-tight flex items-center gap-1">
                {errors.pickupLocation.message}
              </span>
            )}
          </div>

          {/* Delivery Location */}
          <div className="flex flex-col">
            <label
              htmlFor="quote-delivery"
              className="flex items-center gap-1.5 text-[12px] font-bold text-navy-900 mb-1"
            >
              <MapPin className="w-3.5 h-3.5 text-navy-900 shrink-0" strokeWidth={1.75} />
              <span>Delivery Location</span>
              <span className="text-orange-500 font-bold">*</span>
            </label>
            <input
              id="quote-delivery"
              type="text"
              placeholder="Destination Port/City"
              {...register("deliveryLocation")}
              className={cn(
                "w-full h-[38px] sm:h-[40px] px-3.5 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] text-navy-900 text-[13px] placeholder:text-slate-400 transition-all",
                "focus:bg-white focus:border-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-600/20",
                errors.deliveryLocation && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              )}
            />
            {errors.deliveryLocation && (
              <span className="text-[10.5px] text-red-600 mt-0.5 leading-tight flex items-center gap-1">
                {errors.deliveryLocation.message}
              </span>
            )}
          </div>
        </div>

        {/* Row 5: Weight or Volume & Additional Notes (2 Columns Single-Line) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-2.5">
          {/* Weight or Volume */}
          <div className="flex flex-col">
            <label
              htmlFor="quote-weightVolume"
              className="flex items-center gap-1.5 text-[12px] font-bold text-navy-900 mb-1"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-navy-900 shrink-0" strokeWidth={1.75} />
              <span>Weight or Volume</span>
            </label>
            <input
              id="quote-weightVolume"
              type="text"
              placeholder="e.g. 14,000 kg"
              {...register("weightVolume")}
              className="w-full h-[38px] sm:h-[40px] px-3.5 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] text-navy-900 text-[13px] placeholder:text-slate-400 transition-all focus:bg-white focus:border-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-600/20"
            />
          </div>

          {/* Additional Notes */}
          <div className="flex flex-col">
            <label
              htmlFor="quote-notes"
              className="flex items-center gap-1.5 text-[12px] font-bold text-navy-900 mb-1"
            >
              <FileText className="w-3.5 h-3.5 text-navy-900 shrink-0" strokeWidth={1.75} />
              <span>Additional Notes</span>
            </label>
            <input
              id="quote-notes"
              type="text"
              placeholder="Special handling or hazmat"
              {...register("notes")}
              className="w-full h-[38px] sm:h-[40px] px-3.5 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] text-navy-900 text-[13px] placeholder:text-slate-400 transition-all focus:bg-white focus:border-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-600/20"
            />
          </div>
        </div>

        {/* 4. Primary Submit Button: Canonical Brand Button matching Site CTAs */}
        <Button
          type="submit"
          variant="primary"
          disabled={submissionState.status === "loading"}
          showArrow={submissionState.status !== "loading"}
          className="w-full h-[46px] sm:h-[48px] rounded-btn text-[15px] font-semibold shadow-sm mt-1.5"
        >
          {submissionState.status === "loading" ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Calculating Estimate...</span>
            </span>
          ) : (
            <span>Get Instant Quote</span>
          )}
        </Button>
      </form>
    </div>
  );
}
