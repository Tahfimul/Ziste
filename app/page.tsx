// app/page.tsx
'use client'
import App from '@/components/welcome'
import Hero from '@/components/hero';

import {Navbar} from '@/components/Navbar';
import AuthContextProvider from '@/components/contexts/AuthContextProvider';
export default function Home() {
  return (
    <AuthContextProvider>
      
        <Navbar/>
        <App/>
        <Hero/>
    </AuthContextProvider>
  );
}
