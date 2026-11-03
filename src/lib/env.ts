import { z } from "zod";

/**
 * Validated Environment Variables Schema
 * Handles both server and client variables safely with sensible defaults for local development.
 */
const envSchema = z.object({
  // App
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),

  // Brand public overrides
  NEXT_PUBLIC_BRAND_NAME: z.string().default("Verdéa"),
  NEXT_PUBLIC_BRAND_TAGLINE: z.string().default("Botanical Science. Radiant Skin."),
  NEXT_PUBLIC_BRAND_DESCRIPTION: z.string().default(
    "Clean, dermatologically proven skincare formulated with potent botanical actives."
  ),
  NEXT_PUBLIC_DOMAIN: z.string().default("verdeaskincare.com"),
  NEXT_PUBLIC_SUPPORT_EMAIL: z.string().email().default("support@verdeaskincare.com"),

  // Database
  DATABASE_URL: z
    .string()
    .default("postgresql://postgres:postgres@localhost:5432/verdea_db?schema=public"),

  // Authentication
  NEXTAUTH_SECRET: z.string().default("local-development-secret-change-in-production-min-32-chars"),
  NEXTAUTH_URL: z.string().url().default("http://localhost:3000"),

  // Payments (Stripe)
  STRIPE_SECRET_KEY: z.string().default("sk_test_placeholder_key"),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().default("pk_test_placeholder_key"),
  STRIPE_WEBHOOK_SECRET: z.string().default("whsec_placeholder"),

  // Payments (Razorpay - India)
  RAZORPAY_KEY_ID: z.string().default("rzp_test_placeholder"),
  RAZORPAY_KEY_SECRET: z.string().default("rzp_secret_placeholder"),
  RAZORPAY_WEBHOOK_SECRET: z.string().default("rzp_webhook_secret_placeholder"),

  // Email (Resend)
  RESEND_API_KEY: z.string().default("re_placeholder"),
  EMAIL_FROM: z.string().default("Verdéa <orders@verdeaskincare.com>"),

  // Cache & Rate Limits (Redis)
  REDIS_URL: z.string().default("redis://localhost:6379"),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", JSON.stringify(parsed.error.format(), null, 2));
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment variables. Check system logs for details.");
    }
  }

  return parsed.success ? parsed.data : (envSchema.parse({}) as Env);
}

export const env = parseEnv();
export default env;

