"use client";
import { addLocalPackage } from "@/src/lib/localPackagesStore";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@heroui/react";
import { FiDollarSign, FiImage, FiMapPin, FiTag } from "react-icons/fi";
import toast from "react-hot-toast";
import AuthField from "@/src/components/auth/AuthField";
import FormSelect from "@/src/components/packages/FormSelect";
import FormTextarea from "@/src/components/packages/FormTextarea";
import { useAuth } from "@/src/context/AuthContext";
import { isValidUrl } from "@/src/lib/validation";

const categoryOptions = ["Adventure", "Beach", "Cultural", "Wildlife", "Mountain", "Cruise"];

interface FormErrors {
  title?: string;
  location?: string;
  shortDescription?: string;
  fullDescription?: string;
  price?: string;
  durationDays?: string;
  imageUrl?: string;
}

export default function AddPackagePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Adventure");
  const [location, setLocation] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // protected route — logged in না থাকলে login-এ পাঠিয়ে দাও
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!title.trim()) nextErrors.title = "Title is required";
    if (!location.trim()) nextErrors.location = "Location is required";
    if (!shortDescription.trim()) nextErrors.shortDescription = "Short description is required";
    else if (shortDescription.length > 180) nextErrors.shortDescription = "Keep it under 180 characters";
    if (!fullDescription.trim()) nextErrors.fullDescription = "Full description is required";
    if (!price || Number(price) <= 0) nextErrors.price = "Enter a valid price";
    if (!durationDays || Number(durationDays) <= 0) nextErrors.durationDays = "Enter a valid duration";
    if (imageUrl.trim() && !isValidUrl(imageUrl)) nextErrors.imageUrl = "Enter a valid image URL";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  if (!validate()) return;

  setSubmitting(true);

  const newPackage = {
    id: crypto.randomUUID(),
    title,
    category,
    location,
    shortDescription,
    fullDescription,
    price: Number(price),
    durationDays: Number(durationDays),
    imageUrl: imageUrl || undefined,
    createdBy: user!.uid,                          // session!.user.id ছিল
    createdByName: user!.displayName ?? "Anonymous", // session!.user.name ছিল
    createdAt: new Date().toISOString(),
  };

  addLocalPackage(newPackage);
  await new Promise((resolve) => setTimeout(resolve, 500));

  setSubmitting(false);
  toast.success("Package added successfully!");
  router.push("/packages/manage");
}

  if (loading || !user) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <div className="h-72 animate-pulse rounded-2xl bg-slate-100" />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:py-14">
      <div className="mb-8">
        <p className="font-mono-travel text-sm font-medium text-brand-sky-dark">Add a package</p>
        <h1 className="font-display mt-1 text-2xl font-bold text-slate-900 md:text-3xl">List a new tour package</h1>
        <p className="mt-2 text-sm text-slate-500">
          Fill in the details below — travelers will see this on the Explore page once it&apos;s published.
        </p>
      </div>

      <Card className="rounded-2xl p-5 sm:p-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <AuthField
            id="title"
            name="title"
            label="Package title"
            icon={<FiTag className="h-4 w-4" />}
            placeholder="e.g. 6-Day Bali Explorer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormSelect id="category" label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </FormSelect>

            <AuthField
              id="location"
              name="location"
              label="Location / Country"
              icon={<FiMapPin className="h-4 w-4" />}
              placeholder="e.g. Bali, Indonesia"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              error={errors.location}
            />
          </div>

          <FormTextarea
            id="shortDescription"
            label="Short description"
            placeholder="One or two sentences shown on the package card (max 180 characters)"
            rows={2}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            error={errors.shortDescription}
          />

          <FormTextarea
            id="fullDescription"
            label="Full description"
            placeholder="The complete itinerary, inclusions, and what makes this trip worth it"
            rows={6}
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            error={errors.fullDescription}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <AuthField
              id="price"
              name="price"
              label="Price (৳)"
              type="number"
              icon={<FiDollarSign className="h-4 w-4" />}
              placeholder="68500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={errors.price}
            />

            <AuthField
              id="durationDays"
              name="durationDays"
              label="Duration (days)"
              type="number"
              icon={<FiTag className="h-4 w-4" />}
              placeholder="6"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              error={errors.durationDays}
            />
          </div>

          <div>
            <AuthField
              id="imageUrl"
              name="imageUrl"
              label="Image URL (optional)"
              type="url"
              icon={<FiImage className="h-4 w-4" />}
              placeholder="https://example.com/photo.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              error={errors.imageUrl}
            />
            {imageUrl.trim() && isValidUrl(imageUrl) && (
              <div className="relative mt-2 h-32 w-full overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Package preview"
                  className="h-full w-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            )}
          </div>

          <Button type="submit" variant="primary" size="sm" fullWidth isDisabled={submitting} className="h-10">
            {submitting ? "Adding package…" : "Add package"}
          </Button>
        </form>
      </Card>
    </main>
  );
}