import React from 'react'
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button'
import VetAgentList from './_components/VetAgentList'
import NewSession from './_components/NewSession'

export default function Dashboard() {
  return (
    <div>
        <div className='flex items-center justify-between'>
            <h2 className='font-bold text-2xl'>My Dashboard</h2>
            <NewSession>
              <Button className='hover:scale-110'>Consult With Veterinary</Button>
            </NewSession>
        </div>
        <HistoryList />
        <VetAgentList />
    </div>
  )
}
