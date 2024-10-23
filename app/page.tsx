// app/page.tsx
'use client'
import App from '@/components/welcome'
import Hero from '@/components/hero';
import { useSession } from "next-auth/react";
import Navbar from '@/components/Navbar2';
export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      {session?.user ? 
        (<Navbar/>):        
        (<></>)

      }
      <App/>
      <Hero/>
    </>
  );
}
