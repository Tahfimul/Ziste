// app/chat/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { firebaseAuth } from '../../services/firebase'; // Use the centralized auth export
import { onAuthStateChanged } from 'firebase/auth';
import ChatList from '../../components/ChatList';
import AuthContextProvider from '../../components/contexts/AuthContextProvider';

const ChatPage = () => {
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
    <AuthContextProvider>
      <div>
        <h1>Chat</h1>
        <ChatList userId={userId} />
      </div>
    </AuthContextProvider>
  );
};

export default ChatPage;
