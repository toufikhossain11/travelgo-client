"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FiCompass, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Trip packages", href: "/packages" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link href="/" className="font-display flex items-center gap-2 text-xl font-bold text-brand-emerald-dark">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-emerald text-white">
            <FiCompass className="h-4 w-4" />
          </span>
          TravelGo
        </Link>

        <nav className="hidden items-center gap-8 text-[15px] font-medium text-slate-600 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="px-4 py-2 text-[15px] font-medium text-slate-600 hover:text-slate-900">
            Log in
          </Link>
          <Link href="/register" className="px-4 py-2">
            <Button variant="primary" className="rounded-full">
              Sign up free
            </Button>
          </Link>
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
            <div className="space-y-3 px-5 py-4 font-medium text-slate-700">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block py-1" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-2">
                <Link
                  href="/login"
                  className="flex-1 rounded-full border border-slate-200 py-2 text-center font-semibold"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="flex-1 rounded-full bg-brand-emerald py-2 text-center font-semibold text-white"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
