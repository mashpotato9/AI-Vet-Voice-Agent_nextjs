import { VetAgents } from '@/shared/list'
import React from 'react'
import VetAgentCard from './VetAgentCard'

export default function VetAgentList() {
  return (
    <div className='mt-10'>
        <h2 className='font-bold text-2xl mb-5'>
            Available Veterinary Agents
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 mt-5'>
            {VetAgents.map((agent, index) => (
                <div key={index} className='p-5 mb-4 bg-gray-100 rounded-lg shadow hover:scale-105 hover:shadow-xl transition-shadow duration-300'>
                    <VetAgentCard agent={agent} />
                </div>
            ))}
        </div>
    </div>
  )
}
