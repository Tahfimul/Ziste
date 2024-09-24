'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Navbar from '../components/Navbar';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });
  return (
    <>
   <Navbar />

    <h1>Connect with academia.</h1>  
    <div className="p-8">
      <div className='text-white'>{session?.data?.user?.email }</div>
      <button className='text-white' onClick={() => signOut()}>Logout</button>
    </div> 
    </>
  );
}
