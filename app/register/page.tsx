"use client";

import { useState } from 'react';
import { db } from '../../services/firebase'; // Centralized auth and db exports
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import {Navbar} from "../../components/Navbar";
import { firebaseSignUp } from '@/services/authService';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const userCredential = await firebaseSignUp({email, password})
      const user = userCredential.user;

      // Save user info to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email,
        createdAt: new Date(),
      });

      router.push('/chat'); // Redirect to chat page upon successful registration
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className='flex flex-col gap-[2vh] items-center justify-center mt-[12vh]'>
        <h1 className='justify-center  text-[4vw]'>Register</h1>
        <div className='flex justify-center items-center'>
          <form onSubmit={handleRegister}>
            <input
              className='px-[1vw] py-[0.5vh] mx[1vw] focus:ring-0 outline-none border-2 border-black rounded-lg text-[1.5vw]'
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className='px-[1vw] py-[0.5vh] mx-[1vw] focus:ring-0 outline-none border-2 border-black rounded-lg text-[1.5vw]'
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className='flex justify-center my-[1.5vh] bg-[#e1613d] rounded-md px-[1vw] py-[0.5py] text-[1.5vw]'>Register</button>
          </form>
        </div>
        {error && <p>{error}</p>}
        
      </div>
    </div>
  );
};

export default Register;
