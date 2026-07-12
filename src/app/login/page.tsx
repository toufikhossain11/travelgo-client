"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Label } from "@heroui/react";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa6";
import AuthLayout from "@/src/components/auth/AuthLayout";
import AuthField from "@/src/components/auth/AuthField";
import { isValidEmail } from "@/src/lib/validation";
import { authClient } from "@/src/lib/auth-client";
import toast from "react-hot-toast";

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

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!email.trim()) nextErrors.email = "Email is required";
    else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address";
    if (!password) nextErrors.password = "Password is required";
    else if (password.length < 8) nextErrors.password = "Password must be at least 8 characters";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);
  setFormError(null);

  const { error } = await authClient.signIn.email({ email, password });

  setLoading(false);

  if (error) {
    toast.error(error.message ?? "Invalid email or password.");
    setFormError(error.message ?? "Invalid email or password.");
    return;
  }

  toast.success("Logged in successfully!");
  router.push("/");
}

function handleGoogleAuth() {
  authClient.signIn.social({ provider: "google", callbackURL: "/" });
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

        <div className="flex items-center justify-between text-xs">
          <Checkbox id="remember" isSelected={remember} onChange={setRemember}>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Content>
              <Label htmlFor="remember" className="text-xs text-slate-600">
                Remember me
              </Label>
            </Checkbox.Content>
          </Checkbox>
          <Link href="/forgot-password" className="font-medium text-brand-emerald-dark hover:underline">
            Forgot password?
          </Link>
        </div>

        {formError && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{formError}</p>
        )}

        <Button type="submit" variant="primary" size="sm" fullWidth isDisabled={loading} className="h-10">
          {loading ? "Logging in…" : "Log in"}
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