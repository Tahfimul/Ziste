"use client";

import { useState } from 'react';
import { auth, db } from '../../services/firebase'; // Centralized auth and db exports
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Navbar } from "../../components/Navbar2";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
