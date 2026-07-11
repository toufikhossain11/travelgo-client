"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/auth/FormField";
import { isValidEmail } from "@/lib/validation";

const DEMO_CREDENTIALS = { email: "user@travelgo.com", password: "User@1234" };

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function performLogin(emailValue: string, passwordValue: string) {
    setLoading(true);
    setFormError(null);

    // TODO: replace with your real login call, e.g. POST /api/auth/login
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);

    if (emailValue === DEMO_CREDENTIALS.email && passwordValue === DEMO_CREDENTIALS.password) {
      router.push("/");
      return;
    }
    setFormError("Invalid email or password. Try the demo login below.");
  }

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!email.trim()) nextErrors.email = "Email is required";
    else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address";
    if (!password) nextErrors.password = "Password is required";
    else if (password.length < 8) nextErrors.password = "Password must be at least 8 characters";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    performLogin(email, password);
  }

  function handleDemoLogin() {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setErrors({});
    performLogin(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
  }

  return (
    <AuthLayout heading="Welcome back" subheading="Log in to manage your bookings and saved trips.">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          id="email"
          label="Email address"
          type="email"
          icon={<FiMail className="h-4 w-4" />}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />

        <FormField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          icon={<FiLock className="h-4 w-4" />}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="current-password"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
            </button>
          }
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-brand-emerald focus:ring-brand-emerald"
            />
            Remember me
          </label>
          <Link href="/forgot-password" className="font-medium text-brand-emerald-dark hover:underline">
            Forgot password?
          </Link>
        </div>

        {formError && (
          <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-600">{formError}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-emerald py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Log in"}
        </button>

        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={loading}
          className="font-mono-travel w-full rounded-xl border border-dashed border-brand-sky/60 bg-brand-sky/5 py-3 text-sm font-medium text-brand-sky-dark transition hover:bg-brand-sky/10 disabled:opacity-60"
        >
          Use demo login
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium text-slate-400">Or continue with</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
          <FaGoogle className="h-4 w-4" /> Google
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
          <FaFacebookF className="h-4 w-4" /> Facebook
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-brand-emerald-dark hover:underline">
          Sign up free
        </Link>
      </p>
    </AuthLayout>
  );
}