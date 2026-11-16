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
    ref
  ) => {
    // Generate an id if not provided for accessibility
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[14px] font-medium text-ink select-none flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-orange-500 ml-1">*</span>}
            </span>
          </label>
        )}

        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              "w-full h-[48px] px-3.5 rounded-input border bg-white text-ink text-[15px] placeholder:text-slate-600/50 transition-colors duration-150",
              "border-line focus:border-ocean-600 focus:outline-none focus:ring-4 focus:ring-ocean-600/20",
              "disabled:bg-sky-50 disabled:opacity-60 disabled:cursor-not-allowed",
              error && "border-red-600 focus:border-red-600 focus:ring-red-600/20",
              isMono && "font-mono tracking-wider",
              className
            )}
            {...props}
          />
        </div>

        {error ? (
          <p id={errorId} className="text-[13px] text-red-600 leading-tight">
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

