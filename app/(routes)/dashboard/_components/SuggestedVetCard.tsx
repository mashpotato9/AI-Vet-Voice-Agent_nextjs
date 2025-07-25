import React from "react";
import { vetAgent } from "./VetAgentCard";
import Image from "next/image";

type Props = {
  vetAgent: vetAgent;
  setSelectedVet: any;
  selectedVet: vetAgent;
};

export default function SuggestedVetCard({ vetAgent, setSelectedVet, selectedVet }: Props) {
  return (
    <div className={`flex flex-col items-center justify-between hover:scale-105 hover:shadow-lg 
    transition-transform duration-300 shadow-gray-300 shadow-lg p-4 rounded-lg bg-gray-50 
    cursor-pointer ${selectedVet?.id === vetAgent.id ? "ring-1 ring-gray-400" : ""}`} onClick={() => setSelectedVet(vetAgent)}>
      <Image
        src={vetAgent.image}
        alt={vetAgent.specialist}
        width={80}
        height={100}
        className="rounded-lg w-[80px] h-[100px] object-cover mb-1"
      />
      <h2 className="font-bold text-sm mb-1 text-center">{vetAgent.specialist}</h2>
      <p className="text-xs text-center line-clamp-3"> {vetAgent.description}</p>
    </div>
  );
}
