// app/page.tsx
'use client'
import App from '@/components/welcome'
import Hero from '@/components/hero';
import { Navbar } from '@/components/Navbar2';
import AuthContextProvider from '@/components/contexts/AuthContextProvider';
export default function Home() {
  // const { data: session } = useSession();
  return (
    <AuthContextProvider>
      <>
        <Navbar/>

        <App/>
        <Hero/>
      </>
    </AuthContextProvider>
  );
}
