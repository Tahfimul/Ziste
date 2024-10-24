// app/chat/page.tsx
// source: chatgpt
"use client"
import {Navbar} from '@/components/Navbar2';
import { useEffect, useState } from 'react';
import { firebaseAuth } from '@/services/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import ChatList from '@/components/ChatList';

const Chat = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!userId) {
    return <p>Please log in to access the chat.</p>;
  }

  return (
    <>
      <div className="chatPage">
        <Navbar/>
        <div className="chatContainer">
          <ChatList userId={userId} />
        </div>
      </div>
    </>
  );
};

export default Chat;