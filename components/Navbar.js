import React from 'react';
import Link from "next/link";
import './Navbar.css';

const Navbar = () => {
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
        <Link href="/products">Courses</Link>
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
    <Link href = "/login"> Login </Link>
  </div>
</nav>
);
};

export default Navbar;