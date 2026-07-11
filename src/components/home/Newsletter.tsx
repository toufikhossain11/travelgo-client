"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { fadeInUp } from "@/src/lib/motion";


export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: wire up to the backend newsletter endpoint, e.g. POST /api/newsletter
    setSubmitted(true);
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="flex flex-col items-center justify-between gap-6 rounded-[20px] bg-brand-emerald-dark p-8 md:flex-row md:p-12"
      >
        <div className="max-w-md text-center md:text-left">
          <h2 className="font-display text-2xl font-semibold text-white">
            Get trip ideas before the price goes up
          </h2>
          <p className="mt-2 text-sm text-emerald-100">One email a week — new packages, seasonal deals, no spam.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full gap-2 md:w-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-full px-4 py-3 text-sm outline-none md:w-64"
          />
          <Button type="submit" variant="primary" className="shrink-0 rounded-full !bg-brand-amber">
            {submitted ? "Subscribed" : "Subscribe"}
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
