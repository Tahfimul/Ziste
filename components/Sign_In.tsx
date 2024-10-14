import { useState } from 'react';
import { auth } from '@/services/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the function
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

const Signin = ()=>
{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
  
    const handleSignIn = async (e: React.FormEvent) => {
      e.preventDefault();
      
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/chat'); // Redirect to chat page upon successful SignIn
      } catch (err) {
        setError('SignIn failed. Please check your credentials.');
        console.error(err);
      }
    };

    return  (
    <div>
      <h1>SignIn</h1>
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
            onClick={() => signIn()}
            className="bg-sky-400 px-3 py-2 rounded"
            >
            Sign In with Google
      </button>
    </div>
    )
}

export default Signin