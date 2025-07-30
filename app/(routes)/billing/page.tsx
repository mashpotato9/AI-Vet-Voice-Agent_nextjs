import React from 'react'
import { PricingTable } from '@clerk/nextjs'

export default function Billing() {
  return (
    <div className='px-10 lg:px-30 py-10'>
        <h2 className='text-3xl font-bold mb-5'>Join Subscription</h2>
        <PricingTable />
    </div>
  )
}
