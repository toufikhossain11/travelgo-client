"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa6";
import AuthLayout from "@/src/components/auth/AuthLayout";
import AuthField from "@/src/components/auth/AuthField";
import { isValidEmail } from "@/src/lib/validation";
import { auth } from "@/src/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import toast from "react-hot-toast";

// TODO: create this account once in Firebase Console (Authentication → Users → Add user)
// so the demo button always logs in successfully
const DEMO_CREDENTIALS = { email: "demo@travelgo.com", password: "Demo@1234" };

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!email.trim()) nextErrors.email = "Email is required";
    else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address";
    if (!password) nextErrors.password = "Password is required";
    else if (password.length < 8) nextErrors.password = "Password must be at least 8 characters";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function performLogin(emailValue: string, passwordValue: string) {
    setFormError(null);
    try {
      await signInWithEmailAndPassword(auth, emailValue, passwordValue);
      toast.success("Logged in successfully!");
      router.push("/");
    } catch (error: unknown) {
      toast.error((error as { message: string }).message);
      setFormError((error as { message: string }).message);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await performLogin(email, password);
    setLoading(false);
  }

  async function handleDemoLogin() {
    setDemoLoading(true);
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setErrors({});
    await performLogin(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
    setDemoLoading(false);
  }

  async function handleGoogleAuth() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Logged in successfully!");
      router.push("/");
    } catch (error: unknown) {
      toast.error((error as { message: string }).message);
    }
  }

  return (
    <AuthLayout heading="Welcome back" subheading="Log in to manage your bookings and saved trips.">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <AuthField
          id="email"
          name="email"
          label="Email address"
          type="email"
          icon={<FiMail className="h-4 w-4" />}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />

        <AuthField
          id="password"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          icon={<FiLock className="h-4 w-4" />}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="current-password"
          suffix={
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onPress={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
            </Button>
          }
        />

        {formError && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{formError}</p>
        )}

        <Button type="submit" variant="primary" size="sm" fullWidth isDisabled={loading || demoLoading} className="h-10">
          {loading ? "Logging in…" : "Log in"}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          fullWidth
          isDisabled={loading || demoLoading}
          onPress={handleDemoLogin}
          className="h-10 border-dashed border-brand-sky/60 !text-brand-sky-dark"
        >
          {demoLoading ? "Logging in with demo account…" : "Use demo login"}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] font-medium text-slate-400">Or continue with</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <Button type="button" variant="outline" size="sm" fullWidth className="h-10" onPress={handleGoogleAuth}>
        <FaGoogle className="h-3.5 w-3.5" /> Continue with Google
      </Button>

      <p className="mt-6 text-center text-xs text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-brand-emerald-dark hover:underline">
          Sign up free
        </Link>
      </p>
    </AuthLayout>
  );
}