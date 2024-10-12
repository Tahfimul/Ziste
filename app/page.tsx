// app/page.tsx
import { Navbar } from "../components/Navbar2";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />
      <h1>Connect with academia.</h1>
      <h2>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </h2>
    </>
  );
}
