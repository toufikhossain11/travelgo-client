import { NextResponse } from "next/server";
import { genAI, GEMINI_MODEL } from "@/src/lib/gemini";
import { destinations } from "@/src/data/destinations";

interface RelatedRequestBody {
  currentId: string;
}

export async function POST(request: Request) {
  try {
    const body: RelatedRequestBody = await request.json();
    const { currentId } = body;

    const current = destinations.find((d) => d.id === currentId);
    if (!current) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    const others = destinations.filter((d) => d.id !== currentId);

    const catalog = others
      .map(
        (d) =>
          `- id: ${d.id} | ${d.name}, ${d.country} | category: ${d.category} | price: ${d.currency}${d.price} | duration: ${d.durationDays} days | rating: ${d.rating} | ${d.shortDescription}`
      )
      .join("\n");

    const prompt = `A traveler is viewing this package:
- ${current.name}, ${current.country} | category: ${current.category} | price: ${current.currency}${current.price} | duration: ${current.durationDays} days | ${current.shortDescription}

From the catalog below, pick the 4 packages that best match this one in overall travel experience — consider pace, price range, and the kind of traveler it suits, not just the category label.

Catalog:
${catalog}

Respond with ONLY a JSON array of exactly 4 id strings from the catalog, ordered best match first. No other text. Example: ["id-one","id-two","id-three","id-four"]`;

    const response = await genAI.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const raw = (response.text ?? "").trim().replace(/^```json\s*|```$/g, "");
    const ids: string[] = JSON.parse(raw);

    const validIds = ids.filter((id) => others.some((d) => d.id === id)).slice(0, 4);

    // fallback: fill up to 4 if AI returned fewer valid ids
    if (validIds.length < 4) {
      const remaining = others.filter((d) => !validIds.includes(d.id)).map((d) => d.id);
      validIds.push(...remaining.slice(0, 4 - validIds.length));
    }

    return NextResponse.json({ ids: validIds });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}