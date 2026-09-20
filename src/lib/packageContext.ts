import { destinations } from "@/src/data/destinations";

// প্রতিটা package-এর শুধু জরুরি তথ্য — পুরো object পাঠালে token খরচ বেশি হয়
export function buildPackageContext(): string {
  return destinations
    .map(
      (d) =>
        `- id: ${d.id} | ${d.name}, ${d.country} | category: ${d.category} | price: ${d.currency}${d.price} | duration: ${d.durationDays} days | rating: ${d.rating}`
    )
    .join("\n");
}