"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FiChevronDown, FiCompass, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "@/src/context/AuthContext";

const baseLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const authOnlyLinks = [
  { label: "Add Package", href: "/packages/add" },
  { label: "Manage Packages", href: "/packages/manage" },
];

function isLinkActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
const { user, loading, logout } = useAuth();
  const navLinks = user ? [...baseLinks, ...authOnlyLinks] : baseLinks;

  async function handleLogout() {
  await logout();

  toast.success("Logged out successfully");

  setProfileOpen(false);
  setOpen(false);

  router.push("/");
}

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link href="/" className="font-display flex items-center gap-2 text-xl font-bold text-brand-emerald-dark">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-emerald text-white">
            <FiCompass className="h-4 w-4" />
          </span>
          TravelGo
        </Link>

        <nav className="hidden items-center gap-7 text-[15px] font-medium text-slate-600 lg:flex">
          {navLinks.map((link) => {
            const active = isLinkActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative whitespace-nowrap pb-1 transition ${
                  active ? "text-slate-900" : "hover:text-slate-900"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-brand-emerald"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {loading ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition hover:bg-slate-50"
              >
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName ?? "Profile"}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-emerald text-sm font-semibold text-white">
                    {user.displayName?.charAt(0).toUpperCase() ?? "U"}
                  </span>
                )}
                <span className="max-w-[120px] truncate text-sm font-medium text-slate-700">{user.displayName}</span>
                <FiChevronDown className={`h-4 w-4 text-slate-400 transition ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-slate-100 bg-white py-1.5 shadow-lg"
                    >
                      <div className="border-b border-slate-100 px-4 py-2.5">
                        <p className="truncate text-sm font-semibold text-slate-800">{user.displayName}</p>
                        <p className="truncate text-xs text-slate-400">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                      >
                        <FiLogOut className="h-4 w-4" /> Log out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 text-[15px] font-medium text-slate-600 hover:text-slate-900">
                Log in
              </Link>
              <Link href="/register" className="px-4 py-2">
                <Button variant="primary" className="rounded-full">
                  Sign up free
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-slate-700 lg:hidden"
        >
          {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-100 bg-white lg:hidden"
          >
            <div className="space-y-1 px-5 py-4 font-medium text-slate-700">
              {navLinks.map((link) => {
                const active = isLinkActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-2.5 py-2 transition ${
                      active ? "bg-brand-emerald/10 font-semibold text-brand-emerald-dark" : "hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {user ? (
                <div className="mt-2 border-t border-slate-100 pt-3">
                  <div className="mb-3 flex items-center gap-3">
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL!}
                        alt={user.displayName ?? "Profile"}
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-emerald text-sm font-semibold text-white">
                        {user.displayName?.charAt(0).toUpperCase() ?? "U"}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">{user.displayName}</p>
                      <p className="truncate text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 py-2 text-sm font-semibold text-red-500"
                  >
                    <FiLogOut className="h-4 w-4" /> Log out
                  </button>
                </div>
              ) : (
                <div className="mt-2 flex gap-3 border-t border-slate-100 pt-3">
                  <Link
                    href="/login"
                    className="flex-1 rounded-full border border-slate-200 py-2 text-center font-semibold"
                    onClick={() => setOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 rounded-full bg-brand-emerald py-2 text-center font-semibold text-white"
                    onClick={() => setOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}