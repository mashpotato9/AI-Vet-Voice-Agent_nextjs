"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { vetAgent } from "../../_components/VetAgentCard";
import { Circle, Loader2, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { useRouter } from "next/router";
import { toast } from "sonner";

type SessionInfo = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedVet: vetAgent;
  createdBy: string;
  createdAt: string;
  conversation: JSON;
  voiceId: string;
};
type message = {
  role: string;
  text: string;
};

export default function VetAgent() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [sessionInfo, setSessionInfo] = useState<SessionInfo>();
  const [isConnected, setIsConnected] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currRole, setCurrRole] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [messages, setMessages] = useState<message[]>([]);
  const [startCallLoading, setStartCallLoading] = useState<boolean>(false);
  const [endCallLoading, setEndCallLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    GetSessionInfo();
  }, [sessionId]);

  const GetSessionInfo = async () => {
    const res = await axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log(res.data);
    setSessionInfo(res.data);
  };

  const StartChat = async () => {
    setStartCallLoading(true);
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    const VapiAgentConfig = {
      name: "AI Pet Care Agent",
      firstMessage:
        "Hello! I'm your AI Pet Care Agent. I'm here to help you with your pet's health and wellness. How can I assist you today?",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "playht",
        voiceId: sessionInfo?.selectedVet?.voiceId,
      },
      model: {
        provider: "openai",
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: sessionInfo?.selectedVet?.agentPrompt,
          },
        ],
      },
    };

    console.log("VapiAgentConfig:", VapiAgentConfig);

    // @ts-ignore
    vapi.start(VapiAgentConfig);

    vapi.on("call-start", () => {
      console.log("Call started");
      setIsConnected(true);
      setStartCallLoading(false);
    });
    vapi.on("call-end", () => {
      console.log("Call ended");
    });
    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;
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

    vapi.on("speech-start", () => {
      console.log("Assistant started speaking");
      setCurrRole("assistant");
    });
    vapi.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setCurrRole("user");
    });
  };

  const endCall = async () => {
    setEndCallLoading(true);
    if (!vapiInstance) return;
    vapiInstance.stop();

    try {
      vapiInstance.off("call-start");
      vapiInstance.off("call-end");
      vapiInstance.off("message");
      vapiInstance.off("speech-start");
      vapiInstance.off("speech-end");
    } catch (error) {
      console.log("Error removing event listeners:", error);
    }

    setVapiInstance(null);

    const res = await GenerateReport();
    setIsConnected(false);
    setEndCallLoading(false);
    toast.success("Report generated successfully!");

    setTimeout(() => {
      router.replace("/dashboard");
    }, 3000);
  };

  const GenerateReport = async () => {
    const result = await axios.post("/api/generate-report", {
      sessionId: sessionId,
      messages: messages,
      sessionInfo: sessionInfo,
    });

    console.log("Report generated:", result.data);
    return result.data;
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
              <h2 className="text-gray-500 text-center mb-2">
                Live Transcript
              </h2>
            ) : (
              <div className="space-y-2">
                {messages?.slice(-4).map((msg: message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === "assistant" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`text-lg p-2 rounded-lg max-w-[70%] ${
                        msg.role === "assistant"
                          ? "bg-blue-100"
                          : "bg-green-100"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {transcript && (
                  <div
                    className={`flex ${
                      currRole === "assistant" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`text-lg p-2 rounded-lg max-w-[70%] opacity-70 ${
                        currRole === "assistant"
                          ? "bg-blue-100"
                          : "bg-green-100"
                      }`}
                    >
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
              disabled={startCallLoading}
            >
              {startCallLoading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <PhoneCall className="mr-2" />
              )}{" "}
              Start Call
            </Button>
          ) : (
            <Button
              className="mt-20"
              variant={"destructive"}
              onClick={endCall}
              disabled={endCallLoading}
            >
              {endCallLoading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <PhoneCall className="mr-2" />
              )}{" "}
              End Call
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
