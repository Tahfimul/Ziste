/* sources: */
/* 1. sitepoint.com/creating-a-navbar-in-react/ */

"use client";

import React from 'react';
import Link from "next/link";
import './Navbar.css';
import { signIn, useSession, signOut } from "next-auth/react"; //Added for signin session with Google

const Navbar = () => {
  const { data: session } = useSession();
  return (

<nav className="navbar">
  <div className="navbar-left">
    <Link href="/" className="logo">
      Ziste
    </Link>
  </div>
  <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <Link href="/viewenrolledcoursepage">Courses</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
      <li>
        <Link href="/contact">Contact</Link>
      </li>
      
    </ul>
  </div>

  {session?.user ? (
        <div className="flex gap-x-2 items-center">
          <Link href="/"> </Link>
          <p>
            {session.user.name} {session.user.email}
          </p>
          <img 
          src={session.user.image!}
            alt=""
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          <button
            onClick={async () => {
              await signOut({
                callbackUrl: "/",
              })
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-sky-400 px-3 py-2 rounded"
        >
          Sign In
        </button>
      )}

      
</nav>
);
};

export default Navbar;
