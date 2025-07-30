'use client'

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import NewSession from './NewSession';
import HistoryTable from './HistoryTable';
import { useHistory } from '@/context/HistoryContext';

export default function HistoryList() {
    const { history, loading } = useHistory();

  if (loading) {
    return <div className='mt-10 text-center'>Loading...</div>;
  }

  return (
    <div className='mt-10'>
        {history.length == 0 ? (
            <div className='flex flex-col items-center justify-center p-7 border-dashed rounded-2xl border-gray-300 border-3 '>
                <Image src={'/vet-assistance.png'} alt='Vet Assistance' width={200} height={2000} />
                <h2 className='text-lg font-semibold mt-3'>No history available</h2>
                <p>It looks like you haven't consulted with a vet yet.</p>
                <NewSession>
                    <Button className='mt-3 hover:scale-110'>Start a consultation</Button>
                </NewSession>
            </div>
        ) : (
            <div>
                <HistoryTable history={history} />
            </div>
        )}
    </div>
  )
}
