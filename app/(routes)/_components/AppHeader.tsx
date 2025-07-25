import React from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

const menuOptions = [
    {
        id: 1,
        name: 'Home',
        path: '/home',
    },
    {
        id: 2,
        name: 'History',
        path: '/history',
    },
    {
        id: 3,
        name: 'Pricing',
        path: '/pricing',
    },
    {
        id: 4,
        name: 'Profile',
        path: '/profile',
    }
];

export default function AppHeader() {
  return (
    <div className='flex items-center justify-between py-1 px-10 md:px-20 lg:px-40 shadow'>
        <Image src={"/logo.png"} alt="Logo" width={130} height={130} />
        <div className='hidden md:flex items-center gap-15'>
            {menuOptions.map((option, index) => (
                <div key={index}>
                    <h2 className='text-xl hover:font-bold cursor-pointer transition-all duration-200'>{option.name}</h2>
                </div>
            ))}
        </div>
        <div className="scale-130">
          <UserButton />
        </div>
    </div>
  )
}
