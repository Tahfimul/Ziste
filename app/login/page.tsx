"use client";

import { useState } from 'react';
import { auth } from '../../services/firebase'; 
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; 
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/portal'); 
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/portal'); 
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f4f4de',
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '300px',
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              margin: '0.5rem 0',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              margin: '0.5rem 0',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
          >
            Login
          </button>
        </form>
        <div
          onClick={handleGoogleSignIn}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1.5rem 0',
            padding: '0.75rem',
            backgroundColor: '#db4437',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            textAlign: 'center',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c1351d'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#db4437'}
        >
          <span>Sign in with Google</span>
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
