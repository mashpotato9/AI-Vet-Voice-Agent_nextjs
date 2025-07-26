"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { vetAgent } from "../../_components/VetAgentCard";
import { Circle, PhoneCall } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type SessionInfo = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedVet: vetAgent;
  createdBy: string;
  createdAt: string;
  conversation: JSON;
};

export default function VetAgent() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [sessionInfo, setSessionInfo] = useState<SessionInfo>();

  useEffect(() => {
    GetSessionInfo();
  }, [sessionId]);

  const GetSessionInfo = async () => {
    const res = await axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log(res.data);
    setSessionInfo(res.data);
  };
  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle className="h-4 w-4" /> Not Connected
        </h2>
        <h2 className="font-bold text-xl text-gray-400"> 00:00 </h2>
      </div>
      {sessionInfo && (
        <div className="flex flex-col items-center mt-10 ">
          <Image
            src={sessionInfo?.selectedVet?.image || ""}
            alt={sessionInfo?.selectedVet?.specialist || ""}
            width={120}
            height={120}
            className="rounded-full object-cover"
          />
          <h2 className="font-bold text-lg text-gray-700 mt-3">
            {sessionInfo?.selectedVet?.specialist || ""}
          </h2>
          <p className="text-sm text-gray-400">Pet Care AI Agent</p>
          <div className="mt-32">
            <h2 className="text-gray-500">Assistant Msg</h2>
            <h2 className="text-lg">User Msg</h2>
          </div>
          <Button className="mt-20"><PhoneCall /> Start Chat</Button>
        </div>
      )}
    </div>
  );
}
