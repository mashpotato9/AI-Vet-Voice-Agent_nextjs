"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { vetAgent } from "../../_components/VetAgentCard";
import { Circle, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";

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
type message = {
  role: string;
  text: string;
}

export default function VetAgent() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [sessionInfo, setSessionInfo] = useState<SessionInfo>();
  const [isConnected, setIsConnected] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currRole, setCurrRole] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [messages, setMessages] = useState<message[]>([]);

  useEffect(() => {
    GetSessionInfo();
  }, [sessionId]);

  const GetSessionInfo = async () => {
    const res = await axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log(res.data);
    setSessionInfo(res.data);
  };

  const StartChat = async () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);
    vapi.start(process.env.NEXT_PUBLIC_VAPI_GENERAL_VETERINARIAN_ID!);

    vapi.on("call-start", () => {
      console.log("Call started");
      setIsConnected(true);
    });
    vapi.on("call-end", () => {
      setIsConnected(false);
      console.log("Call ended");
    });
    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const {role, transcriptType, transcript} = message;
        if (transcriptType === "partial") {
        setTranscript(transcript);
        setCurrRole(role);
        } else if (transcriptType === "final") {
          setMessages((prevMessages: message[]) => [
            ...prevMessages,
            { role, text: transcript },
          ]);
          setTranscript("");
          setCurrRole(null);
        }
      }
    });

    vapiInstance.on("speech-start", () => {
      console.log("Assistant started speaking");
      setCurrRole("assistant");
    });
    vapiInstance.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setCurrRole("user");
    });
  };

  const endCall = () => {
    if (!vapiInstance) return;
    vapiInstance.stop();

    vapiInstance.off("call-start");
    vapiInstance.off("call-end");
    vapiInstance.off("message");

    setIsConnected(false);
    setVapiInstance(null);
  };

  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle
            className={`h-4 w-4 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />{" "}
          {isConnected ? "Connected" : "Not Connected"}
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
          <div className="mt-32 w-full min-h-[200px]">
            {!isConnected ? (
              <h2 className="text-gray-500 text-center mb-2">Live Transcript</h2>
            ) : (
              <div className="space-y-2">
                {messages?.slice(-4).map((msg: message, index) => (
                  <div key={index} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
                    <div className={`text-lg p-2 rounded-lg max-w-[70%] ${msg.role === "assistant" ? "bg-blue-100" : "bg-green-100"}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {transcript && (
                  <div className={`flex ${currRole === "assistant" ? "justify-start" : "justify-end"}`}>
                    <div className={`text-lg p-2 rounded-lg max-w-[70%] opacity-70 ${currRole === "assistant" ? "bg-blue-100" : "bg-green-100"}`}>
                      {transcript}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {!isConnected ? (
            <Button
              className="mt-20 bg-green-500 hover:bg-green-600"
              onClick={StartChat}
            >
              <PhoneCall /> Start Call
            </Button>
          ) : (
            <Button className="mt-20" variant={"destructive"} onClick={endCall}>
              <PhoneOff /> End Call
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
