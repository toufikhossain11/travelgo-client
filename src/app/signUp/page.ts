"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/auth/FormField";
import { isStrongPassword, isValidEmail } from "@/lib/validation";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = "Full name is required";
    if (!email.trim()) nextErrors.email = "Email is required";
    else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address";
    if (!password) nextErrors.password = "Password is required";
    else if (!isStrongPassword(password))
      nextErrors.password = "At least 8 characters, with a letter and a number";
    if (!confirmPassword) nextErrors.confirmPassword = "Confirm your password";
    else if (confirmPassword !== password) nextErrors.confirmPassword = "Passwords don't match";
    if (!agreed) nextErrors.terms = "You must accept the terms to continue";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setFormError(null);
    // TODO: replace with your real signup call, e.g. POST /api/auth/register
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoading(false);
    router.push("/login");
  }

  return (
    <AuthLayout heading="Create your account" subheading="Save trips, track bookings and get personalized deals.">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          id="name"
          label="Full name"
          type="text"
          icon={<FiUser className="h-4 w-4" />}
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          autoComplete="name"
        />

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
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="new-password"
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

        <FormField
          id="confirmPassword"
          label="Confirm password"
          type={showPassword ? "text" : "password"}
          icon={<FiLock className="h-4 w-4" />}
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <div>
          <label className="flex items-start gap-2.5 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-emerald focus:ring-brand-emerald"
            />
            <span>
              I agree to TravelGo&apos;s{" "}
              <Link href="/privacy" className="font-medium text-brand-emerald-dark hover:underline">
                Terms &amp; Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.terms}</p>}
        </div>

        {formError && (
          <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-600">{formError}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-emerald py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
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
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-emerald-dark hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}