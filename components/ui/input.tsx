"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isMono?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      id,
      label,
      error,
      helperText,
      isMono = false,
      disabled,
      required,
      ...props
    },
    forwardedRef
  ) => {
    // Generate an id if not provided for accessibility
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Sync forwarded ref
    React.useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement, []);

    // Initialize hasValue from defaultValue or value prop
    React.useEffect(() => {
      const initialValue = props.defaultValue ?? props.value;
      if (initialValue != null && String(initialValue).length > 0) {
        setHasValue(true);
      }
    }, [props.defaultValue, props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        <div className="relative">
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "absolute left-3.5 top-1/2 -translate-y-1/2 text-[15px] text-slate-600 pointer-events-none transition-all duration-200 origin-left",
                "peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[15px]",
                "peer-focus:scale-[0.85] peer-focus:-translate-y-[1.85rem] peer-focus:text-[12px] peer-focus:text-ocean-600",
                "peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:-translate-y-[1.85rem] peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:text-ocean-600",
                "motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out",
                required && "after:content-['*'] after:text-orange-500 after:ml-1",
                disabled && "text-slate-400"
              )}
            >
              {label}
            </label>
          )}

          <input
            id={inputId}
            ref={inputRef}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            placeholder={label ? " " : undefined}
            className={cn(
              "peer w-full h-[48px] px-3.5 rounded-input border bg-white text-ink text-[15px] placeholder:text-transparent transition-all duration-200",
              "border-line focus:border-ocean-600 focus:outline-none focus:ring-4 focus:ring-ocean-600/20",
              "hover:border-slate-400 motion-safe:hover:shadow-[0_0_0_1px_rgba(31,95,158,0.15)]",
              "disabled:bg-sky-50 disabled:opacity-60 disabled:cursor-not-allowed",
              error && "border-red-600 focus:border-red-600 focus:ring-red-600/20",
              isMono && "font-mono tracking-wider",
              isFocused && "shadow-[0_0_0_3px_rgba(31,95,158,0.15)]",
              className
            )}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            {...props}
          />

          {/* Focus glow ring */}
          <div
            className={cn(
              "absolute inset-0 rounded-input pointer-events-none transition-opacity duration-200",
              "bg-gradient-to-r from-ocean-600/20 via-transparent to-orange-500/20 opacity-0",
              "peer-focus:opacity-100 motion-safe:peer-focus:animate-pulse-subtle"
            )}
            aria-hidden="true"
          />
        </div>

        {error ? (
          <p
            id={errorId}
            className="motion-rise text-[13px] text-red-600 leading-tight"
            style={
              {
                "--rise-distance": "4px",
                "--rise-duration": "150ms",
                "--motion-delay": "0ms",
              } as React.CSSProperties
            }
          >
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-[13px] text-slate-600 leading-tight">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

