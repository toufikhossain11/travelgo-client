import { NextResponse } from "next/server";
import { genAI, GEMINI_MODEL } from "@/src/lib/gemini";
import { buildPackageContext } from "@/src/lib/packageContext";

interface ChatRequestBody {
  message: string;
  history: { role: "user" | "assistant"; content: string }[];
}

const SYSTEM_INSTRUCTION = `You are the TravelGo trip-planning assistant. TravelGo is a tour package booking website.
Only recommend packages from the list below — never invent destinations, prices, or ids that aren't listed.
When you recommend a package, mention its name and price so the user recognizes it.
Keep replies short (2-4 sentences), friendly, and conversational. If nothing in the list fits the request, say so honestly.

Available packages:
`;

export async function POST(request: Request) {
  try {
    const body: ChatRequestBody = await request.json();
    const { message, history } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const context = buildPackageContext();

    const contents = [
      { role: "user", parts: [{ text: SYSTEM_INSTRUCTION + context }] },
      { role: "model", parts: [{ text: "Understood — I'll only recommend packages from that list." }] },
      ...history.map((h) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await genAI.models.generateContent({
      model: GEMINI_MODEL,
      contents,
    });

    const reply = response.text;

    if (!reply) {
      return NextResponse.json({ error: "No response generated. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}