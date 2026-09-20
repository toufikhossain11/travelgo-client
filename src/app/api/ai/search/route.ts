import { NextResponse } from "next/server";
import { genAI, GEMINI_MODEL } from "@/src/lib/gemini";
import { categories } from "@/src/data/categories";

interface SearchRequestBody {
  query: string;
}

export async function POST(request: Request) {
  try {
    const body: SearchRequestBody = await request.json();
    const { query } = body;

    if (!query?.trim()) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const categoryIds = categories.map((c) => c.id).join(", ");

    const prompt = `Parse this travel search query into structured filters. The query may be in English or Bengali (Banglish/Bengali script).

Query: "${query}"

Valid categories are exactly: ${categoryIds} (or "all" if no category is mentioned or implied).

Rules:
- "beach", "shomudro", "sea", "sagor" → category "beach"
- "mountain", "pahar", "hill" → category "mountain"
- Extract a max price if a budget is mentioned (numbers like "70 hajar" or "70k" mean 70000 — Bengali "hajar" = thousand, "lakh"/"lakh" = 100000)
- Extract a min price only if a lower bound is clearly stated
- Extract min/max trip duration in days if mentioned ("5 din" = 5 days, "a week" = 7 days)
- Extract a free-text search term only if there's a specific place name mentioned (e.g. "Bali", "Kyoto") — otherwise leave it empty
- Leave any field out entirely if it isn't mentioned in the query

Respond with ONLY a JSON object in this exact shape, no other text:
{"search": "", "category": "all", "minPrice": null, "maxPrice": null, "minDuration": null, "maxDuration": null}`;

    const response = await genAI.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const raw = (response.text ?? "").trim().replace(/^```json\s*|```$/g, "");
    const parsed = JSON.parse(raw);

    return NextResponse.json({ filters: parsed });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Couldn't understand that search. Try the filters below instead." }, { status: 500 });
  }
}