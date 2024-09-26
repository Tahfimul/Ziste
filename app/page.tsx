import React from 'react';
import Navbar from '../components/Navbar';
import{
  Route,
  BrowserRouter as Router,
  Routes,
  redirect
} from 'react-router-dom';
import firebase from '../services/firebase';
import {toast, ToastContainer} from 'react-toastify';
//test
export default function Home() {
  return (
    <>
    <Navbar />
    <h1>Connect with academia.</h1>   
    </>
  );
}
