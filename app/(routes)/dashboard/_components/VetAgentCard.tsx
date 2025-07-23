import { Button } from '@/components/ui/button';
import { IconArrowRampRight, IconArrowRight } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react'

type vetAgent = {
    id: number;
    specialist: string;
    description: string;
    image: string;
    agentPrompt: string;
    voiceId: string;
    subscriptionRequired: boolean;
}
type Props = {
    agent: vetAgent;
}

export default function VetAgentCard({agent}: Props) {
  return (
    <div>
      <Image
        src={agent.image}
        alt={agent.specialist}
        width={200}
        height={300}
        className="rounded-lg w-full h-[400px] object-cover mb-1"
      />
      <h2 className='font-bold text-lg mb-1'>{agent.specialist}</h2>
      <p className='line-clamp-2 text-sm text-gray-600 mb-2'>{agent.description}</p>
      <Button className='w-full'>Start Consultation <IconArrowRight /></Button>
    </div>
  )
}
