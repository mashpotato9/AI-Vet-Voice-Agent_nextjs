import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

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