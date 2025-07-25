import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/config/OpenAiModel";
import { VetAgents } from "@/shared/VetAgents";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [
        { role: "system", content: JSON.stringify(VetAgents) },
        {
          role: "user",
          content:
            "User Notes/Symptoms:" +
            notes +
            ", depends on user notes and symptoms, please suggest list of doctors, return Object in JSON only",
        },
      ],
    });

    const rawResponse = completion.choices[0].message || "No response from AI";
    // @ts-ignore
    const response = rawResponse.content.trim().replace('```json', '').replace('```', '');
    const JSONRes = JSON.parse(response);
    return NextResponse.json(JSONRes);
  } catch (error) {
    return NextResponse.json(error);
  }
}
