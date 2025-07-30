import React from 'react'
import AppHeader from '../_components/AppHeader';
import { HistoryProvider } from '@/context/HistoryContext';


export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <AppHeader />
        <HistoryProvider>
          <div className='px-10 md:px-20 lg:px-40 py-10'>
              {children}
          </div>
        </HistoryProvider>
    </div>
  )
}