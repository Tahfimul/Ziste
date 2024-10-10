// app/chat/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { auth } from '../../services/firebase'; // Use the centralized auth export
import { onAuthStateChanged } from 'firebase/auth';
import ChatList from '../../components/ChatList';
import FirebaseInitializer from '../../components/FirebaseInitializer';

const ChatPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
    <FirebaseInitializer>
      <div>
        <h1>Chat</h1>
        <ChatList userId={userId} />
      </div>
    </FirebaseInitializer>
  );
};

export default ChatPage;
