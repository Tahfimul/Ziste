import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { firebaseSignIn } from '@/services/authService';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth, db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';

const Signin = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) router.push('/', { scroll: false });
  }, [session]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await firebaseSignIn({ email, password });
      router.push('/chat'); // Redirect to chat page upon successful SignIn
    } catch (err) {
      setError('SignIn failed. Please check your credentials.');
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: 'select_account',
    });

    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      router.push('/portal'); // Redirect to chat page upon successful login
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
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
        <button type="submit">Sign In</button>
      </form>
      {error && <p>{error}</p>}
      <button
        onClick={handleGoogleSignIn}
        className="bg-sky-400 px-3 py-2 rounded"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default Signin;
