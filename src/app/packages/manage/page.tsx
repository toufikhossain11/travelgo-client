"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FiChevronDown, FiClock, FiEye, FiMapPin, FiPlus, FiTag, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "@/src/context/AuthContext";
import { deleteLocalPackage, getLocalPackagesByUser } from "@/src/lib/localPackagesStore";
import type { LocalPackage } from "@/src/types";

export default function ManagePackagesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LocalPackage | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // শুধু redirect — কোনো setState নেই, তাই cascading render warning আসবে না
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  // effect+setState-এর বদলে render-এর সময়ই সরাসরি হিসাব করা হচ্ছে
  const packages: LocalPackage[] = useMemo(() => {
    if (!user) return [];
    return getLocalPackagesByUser(user.uid);
  }, [user, refreshKey]);

  function handleDelete(pkg: LocalPackage) {
    deleteLocalPackage(pkg.id);
    setRefreshKey((k) => k + 1); // event handler-এর ভিতরে setState — এটা সম্পূর্ণ নিরাপদ
    setDeleteTarget(null);
    toast.success("Package deleted");
  }

  if (loading || !user) {
    return (
      <main className="mx-auto max-w-5xl px-5 py-16 md:px-8">
        <div className="h-72 animate-pulse rounded-2xl bg-slate-100" />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono-travel text-sm font-medium text-brand-sky-dark">Manage packages</p>
          <h1 className="font-display mt-1 text-2xl font-bold text-slate-900 md:text-3xl">Your listed trips</h1>
          <p className="mt-2 text-sm text-slate-500">Packages you&apos;ve added — view details or remove a listing.</p>
        </div>
        <Link href="/packages/add">
          <Button variant="primary" size="sm" className="h-10 gap-2">
            <FiPlus className="h-4 w-4" /> Add package
          </Button>
        </Link>
      </div>

      {packages.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 py-16 text-center">
          <p className="font-display text-lg font-semibold text-slate-700">No packages yet</p>
          <p className="mt-1 max-w-sm text-sm text-slate-400">
            Packages you add will show up here. These are stored locally in your browser.
          </p>
          <Link href="/packages/add" className="mt-5">
            <Button variant="primary" size="sm" className="h-10 gap-2">
              <FiPlus className="h-4 w-4" /> Add your first package
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {packages.map((pkg) => {
            const isExpanded = expandedId === pkg.id;
            return (
              <div key={pkg.id} className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
                  <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-28">
                    {pkg.imageUrl ? (
                      <Image src={pkg.imageUrl} alt={pkg.title} fill className="object-cover" sizes="112px" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-300">
                        <FiTag className="h-6 w-6" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-mono-travel inline-block rounded-full bg-brand-emerald/10 px-2 py-0.5 text-[11px] font-medium text-brand-emerald-dark">
                      {pkg.category}
                    </p>
                    <h3 className="font-display mt-1 truncate font-semibold text-slate-900">{pkg.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <FiMapPin className="h-3.5 w-3.5" /> {pkg.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock className="h-3.5 w-3.5" /> {pkg.durationDays} days
                      </span>
                      <span className="font-mono-travel text-slate-600">৳{pkg.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : pkg.id)}
                      className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition hover:border-slate-300"
                    >
                      <FiEye className="h-3.5 w-3.5" /> View
                      <FiChevronDown className={`h-3.5 w-3.5 transition ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(pkg)}
                      className="flex h-9 items-center gap-1.5 rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      <FiTrash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-slate-100"
                    >
                      <div className="space-y-3 p-5 text-sm">
                        <div>
                          <p className="text-xs font-medium text-slate-400">Short description</p>
                          <p className="mt-1 text-slate-600">{pkg.shortDescription}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-400">Full description</p>
                          <p className="mt-1 whitespace-pre-line text-slate-600">{pkg.fullDescription}</p>
                        </div>
                        <p className="text-xs text-slate-400">
                          Added on{" "}
                          {new Date(pkg.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5"
            onClick={() => setDeleteTarget(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white p-6"
            >
              <h3 className="font-display font-semibold text-slate-900">Delete this package?</h3>
              <p className="mt-1.5 text-sm text-slate-500">
                &quot;{deleteTarget.title}&quot; will be permanently removed. This can&apos;t be undone.
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteTarget)}
                  className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}