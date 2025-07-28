import { Button } from '@/components/ui/button';
import { IconArrowRampRight, IconArrowRight } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react'
import NewSession from './NewSession';

export type vetAgent = {
    id: number;
    specialist: string;
    description: string;
    image: string;
    agentPrompt: string;
    voiceId?: string;
    subscriptionRequired: boolean;
    
}
type Props = {
    vetAgent: vetAgent;
}

export default function VetAgentCard({vetAgent}: Props) {
  return (
    <div>
      <Image
        src={vetAgent.image}
        alt={vetAgent.specialist}
        width={200}
        height={300}
        className="rounded-lg w-full h-[400px] object-cover mb-1"
      />
      <h2 className='font-bold text-lg mb-1'>{vetAgent.specialist}</h2>
      <p className='line-clamp-2 text-sm text-gray-600 mb-2'>{vetAgent.description}</p>
      <NewSession>
        <Button className='w-full hover:scale-110'>Start Consultation <IconArrowRight /></Button>
      </NewSession>
    </div>
  )
}
