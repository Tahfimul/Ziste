// app/chat/page.tsx
// source: chatgpt
"use client";
import styles from './ChatPage.module.css';  
import Navbar from '../../components/Navbar2';
import { useEffect, useState } from 'react';
import { firebaseAuth } from '../../services/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import ChatList from '../../components/ChatList';
import FirebaseInitializer from '../../components/FirebaseInitializer';

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
    <FirebaseInitializer>
      <div className={styles.chatPage}>
        <Navbar/>
        <div className={styles.chatContainer}>
          <ChatList userId={userId} />
        </div>
      </div>
    </FirebaseInitializer>
  );
};

export default ChatPage;