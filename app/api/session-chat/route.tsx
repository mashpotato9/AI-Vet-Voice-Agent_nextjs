import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { desc } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const { notes, selectedVet } = await req.json();
    const sessionId = uuidv4();
    const user = await currentUser();
    try {
        const res = await db.insert(SessionChatTable).values({
            sessionId: sessionId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            notes: notes,
            selectedVet: selectedVet,
            //@ts-ignore
        }).returning({ SessionChatTable });

        return NextResponse.json(res[0]?.SessionChatTable);
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const user = await currentUser();

    if (!sessionId || sessionId === "all") {
        // Fetch all sessions for the user
        const res = await db.select().from(SessionChatTable)
        // @ts-ignore
        .where(eq(SessionChatTable.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(SessionChatTable.createdAt));

        return NextResponse.json(res);
    } else {
        // Fetch a specific session for the user
        const res = await db.select().from(SessionChatTable)
        .where(eq(SessionChatTable.sessionId, sessionId));

        return NextResponse.json(res[0]);
    }
}