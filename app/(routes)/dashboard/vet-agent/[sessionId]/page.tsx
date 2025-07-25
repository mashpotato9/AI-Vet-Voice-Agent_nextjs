"use client"
import { useParams } from 'next/navigation'
import React from 'react'

export default function VetAgent() {
  const { sessionId } = useParams<{ sessionId: string }>()
  
  return (
    <div>Vet Agent Page: {sessionId}</div>
  )
}
