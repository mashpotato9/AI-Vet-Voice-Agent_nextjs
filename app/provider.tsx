"use client";

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { UserDetailContext } from '@/context/UserDetailContext';

export type UsersDetail = {
    name: string;
    email: string;
    credits: number;
    createdAt: string;
}

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const { user } = useUser();
    const [userDetails, setUserDetails] = useState<any>();
    useEffect(() => {
        user && CreateUser();
    }, [user]);

    const CreateUser = async () => {
        const result = await axios.post('/api/users');
        setUserDetails(result.data);
    }

  return (
    <div>
        <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserDetailContext.Provider>
    </div>
  )
}