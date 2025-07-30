"use client";

import { Button } from "@/components/ui/button";
import { IconArrowRampRight, IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";
import NewSession from "./NewSession";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@clerk/nextjs";
import { useHistory } from "@/context/HistoryContext";
import axios from "axios";
import { useRouter } from "next/navigation";

export type vetAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId?: string;
  subscriptionRequired: boolean;
};
type Props = {
  vetAgent: vetAgent;
};

export default function VetAgentCard({ vetAgent }: Props) {
  const { has } = useAuth();
  const isPro = has && has({ plan: "pro" });
  const { history } = useHistory();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

    const onStartConsultation = async () => {
    setLoading(true);
    // save the note and selected vet to db
    const res = await axios.post("/api/session-chat", {
      notes: vetAgent.specialist,
      selectedVet: vetAgent,
    });
    console.log(res.data);
    if (res.data?.sessionId) {
      console.log(res.data.sessionId);
      // route to consultation page
      router.push('/dashboard/vet-agent/' + res.data.sessionId);
    }
    setLoading(false);
  };

  return (
    <div className="relative">
      {vetAgent.subscriptionRequired && (
        <Badge className="absolute m-2 right-0" variant="default">
          Pro
        </Badge>
      )}
      <Image
        src={vetAgent.image}
        alt={vetAgent.specialist}
        width={200}
        height={300}
        className="rounded-lg w-full h-[400px] object-cover mb-1"
      />
      <h2 className="font-bold text-lg mb-1">{vetAgent.specialist}</h2>
      <p className="line-clamp-2 text-sm text-gray-600 mb-2">
        {vetAgent.description}
      </p>
        <Button
          className="w-full hover:scale-110"
          disabled={(!isPro && vetAgent.subscriptionRequired) || (!isPro && history.length > 0)}
          onClick={onStartConsultation}
        >
          Start Consultation <IconArrowRight />
        </Button>
    </div>
  );
}
