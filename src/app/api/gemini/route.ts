import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";


/* CORRECTION : Remplacement des chemins relatifs par des alias de chemin */
import { checkRateLimit } from "@/lib/rateLimit";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export const runtime = 'edge'; // Optimise for Vercel Edge Functions

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Check rate limit
  const { allowed, remaining, resetTime } = await checkRateLimit(user.id);

  if (!allowed) {
    return new NextResponse("Rate limit exceeded. Try again after " + new Date(resetTime!).toLocaleTimeString(), {
      status: 429,
      headers: {
        "X-RateLimit-Limit": "5",
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": resetTime || "",
      },
    });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!); // Assurez-vous que GEMINI_API_KEY est défini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContentStream(prompt);
    const stream = result.stream;

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const chunkText = chunk.text();
          controller.enqueue(chunkText);
        }
        controller.close();
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "text/plain",
        "X-RateLimit-Limit": "5",
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": resetTime || "",
      },
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
