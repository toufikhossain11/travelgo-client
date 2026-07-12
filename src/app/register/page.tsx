"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Label } from "@heroui/react";
import { FiEye, FiEyeOff, FiImage, FiLock, FiMail, FiUser } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa6";
import AuthLayout from "@/src/components/auth/AuthLayout";
import AuthField from "@/src/components/auth/AuthField";
import { isValidEmail, isValidUrl, isStrongPassword } from "@/src/lib/validation";
import { authClient } from "@/src/lib/auth-client";
import toast from "react-hot-toast";


interface FormErrors {
  name?: string;
  email?: string;
  imageUrl?: string;
  password?: string;
  terms?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [password, setPassword] = useState("");
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
    if (imageUrl.trim() && !isValidUrl(imageUrl)) nextErrors.imageUrl = "Enter a valid image URL";
    if (!password) nextErrors.password = "Password is required";
    else if (!isStrongPassword(password))
      nextErrors.password = "At least 8 characters, with a letter and a number";
    if (!agreed) nextErrors.terms = "You must accept the terms to continue";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);
  setFormError(null);

  const { error } = await authClient.signUp.email({
    email,
    name,
    password,
    image: imageUrl || undefined,
  });

  setLoading(false);

  if (error) {
    toast.error(error.message ?? "Something went wrong. Please try again.");
    setFormError(error.message ?? "Something went wrong. Please try again.");
    return;
  }

  toast.success(`Welcome to TravelGo, ${name}!`);
  router.push("/");
}

 function handleGoogleAuth() {
  authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
  });
}

  return (
    <AuthLayout heading="Create your account" subheading="Save trips, track bookings and get personalized deals.">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <AuthField
          id="name"
          name="name"
          label="Full name"
          icon={<FiUser className="h-4 w-4" />}
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          autoComplete="name"
        />

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

        <div>
          <AuthField
            id="imageUrl"
            name="imageUrl"
            label="Profile image URL (optional)"
            type="url"
            icon={<FiImage className="h-4 w-4" />}
            placeholder="https://example.com/photo.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            error={errors.imageUrl}
            autoComplete="off"
          />
          {imageUrl.trim() && isValidUrl(imageUrl) && (
            <div className="mt-2 flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Profile preview"
                className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-200"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <span className="text-[11px] text-slate-400">Preview</span>
            </div>
          )}
        </div>

        <AuthField
          id="password"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          icon={<FiLock className="h-4 w-4" />}
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="new-password"
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

        <div>
          <Checkbox id="terms" isSelected={agreed} onChange={setAgreed} isInvalid={Boolean(errors.terms)}>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Content>
              <Label htmlFor="terms" className="text-xs text-slate-600">
                I agree to TravelGo&apos;s{" "}
                <Link href="/privacy" className="font-medium text-brand-emerald-dark hover:underline">
                  Terms &amp; Privacy Policy
                </Link>
              </Label>
            </Checkbox.Content>
          </Checkbox>
          {errors.terms && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.terms}</p>}
        </div>

        {formError && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{formError}</p>
        )}

        <Button type="submit" variant="primary" size="sm" fullWidth isDisabled={loading} className="h-10">
          {loading ? "Creating account…" : "Create account"}
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
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-emerald-dark hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}