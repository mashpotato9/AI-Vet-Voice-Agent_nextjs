import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/config/OpenAiModel";
import { VetAgents } from "@/shared/VetAgents";
import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm/sql/expressions/conditions";

const REPORT_GENERATION_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on the AI vet agent's info and conversation between AI agent and user, generate a structured report with the following fields:
1. sessionId: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician AI")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned
11. recommendations: list of AI suggestions (e.g., rest, see a doctor)
Return the result in this JSON format:
{
 "sessionId": "string",
 "agent": "string",
 "user": "string",
 "timestamp": "ISO Date string",
 "chiefComplaint": "string",
 "summary": "string",
 "symptoms": ["symptom1", "symptom2"],
 "duration": "string",
 "severity": "string",
 "medicationsMentioned": ["med1", "med2"],
 "recommendations": ["rec1", "rec2"],
}

Only include valid fields. Respond with nothing else.`;

export async function POST(req: NextRequest) {
  const { sessionId, messages, sessionInfo } = await req.json();

  try {
    const UserInput =
      "AI Vet Agent: " +
      JSON.stringify(sessionInfo) +
      "Conversation: " +
      JSON.stringify(messages);
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [
        { role: "system", content: REPORT_GENERATION_PROMPT },
        { role: "user", content: UserInput },
      ],
    });

    const rawResponse = completion.choices[0].message || "No response from AI";
    // @ts-ignore
    const response = rawResponse.content
      .trim()
      .replace("```json", "")
      .replace("```", "");
    const JSONRes = JSON.parse(response);

    // save to database
    const res = await db.update(SessionChatTable).set({
        report: JSONRes,
        conversation: messages,
    }).where(eq(SessionChatTable.sessionId, sessionId));

    return NextResponse.json(JSONRes);
  } catch (error) {
    return NextResponse.json(error);  
  }
}
