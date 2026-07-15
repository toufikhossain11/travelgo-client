"use client";

import type { LocalPackage } from "@/src/types";

const STORAGE_KEY = "travelgo_user_packages";

export function getAllLocalPackages(): LocalPackage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LocalPackage[]) : [];
  } catch {
    return [];
  }
}

export function getLocalPackagesByUser(userId: string): LocalPackage[] {
  return getAllLocalPackages().filter((pkg) => pkg.createdBy === userId);
}

export function addLocalPackage(pkg: LocalPackage): void {
  const all = getAllLocalPackages();
  all.unshift(pkg);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function deleteLocalPackage(id: string): void {
  const all = getAllLocalPackages().filter((pkg) => pkg.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}