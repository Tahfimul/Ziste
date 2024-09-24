import React from 'react';
import Link from "next/link";
import './Navbar.css';

const Navbar = () => {
  return (

<nav className="navbar">
  <div className="navbar-left">
    <Link href="app/page" className="logo">
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
  <div className="navbar-right">
    <Link href = "/signin"> Sign In </Link>
  </div>
</nav>
);
};

export default Navbar;