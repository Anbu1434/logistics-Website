import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helperText?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, helperText, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-ink-900"
          >
            {label}
            {props.required && <span className="text-brand-danger ml-0.5">*</span>}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            "w-full h-11 px-4 rounded-input bg-cream-50 border text-sm text-ink-900 transition-colors placeholder:text-ink-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-800 focus-visible:ring-offset-1 disabled:opacity-50 disabled:bg-cream-100",
            error
              ? "border-brand-danger focus-visible:ring-brand-danger"
              : "border-cream-200 hover:border-forest-600/50",
            className
          )}
          {...props}
        />

        {error ? (
          <p id={errorId} className="text-xs text-brand-danger font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-ink-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  helperText?: string;
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, helperText, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const helperId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold uppercase tracking-wider text-ink-900"
          >
            {label}
            {props.required && <span className="text-brand-danger ml-0.5">*</span>}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            "w-full min-h-[100px] p-3.5 rounded-input bg-cream-50 border text-sm text-ink-900 transition-colors placeholder:text-ink-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-800 focus-visible:ring-offset-1 disabled:opacity-50 disabled:bg-cream-100 resize-y",
            error
              ? "border-brand-danger focus-visible:ring-brand-danger"
              : "border-cream-200 hover:border-forest-600/50",
            className
          )}
          {...props}
        />

        {error ? (
          <p id={errorId} className="text-xs text-brand-danger font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-ink-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
