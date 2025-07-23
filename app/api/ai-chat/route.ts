import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing Hugging Face API key" }, { status: 500 });
  }

  // Concatenate messages for prompt (simple format)
  const prompt = messages.map((m: any) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n") + "\nAssistant:";

  // Use a smaller, free model for testing
  const model = "google/flan-t5-large";
  const url = `https://api-inference.huggingface.co/models/${model}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return NextResponse.json({ error: `Invalid JSON from Hugging Face: ${text}` }, { status: 500 });
    }
    if (!response.ok) {
      // Show Hugging Face error message if available
      return NextResponse.json({ error: data.error || text || "Unknown error from Hugging Face" }, { status: response.status });
    }
    let reply = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;
    if (!reply || reply.trim() === "") {
      reply = data.error || data.message || text || "[No response]";
    }
    return NextResponse.json({ reply });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
} 