// app/chat/page.tsx
// source: chatgpt
"use client";
import styles from '@/components/ChatList.module.css';  
import {Navbar} from '../../components/Navbar';
import { useEffect, useState } from 'react';
import { firebaseAuth } from '../../services/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import ChatList from '../../components/ChatList';
import AuthContextProvider from '../../components/contexts/AuthContextProvider';
import {Footer} from "@/components/Footer";

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
      <section id="chat" className="bg-white pt-[3vw]"></section>
        <Navbar/>
        <div className="flex justify-left py-[0.8vh] mt-[1.5vh]">
        <h1 className="text-[5vw] text-black">Chat</h1>
      </div>
      <div className={styles.chatPage}>
        <div className={styles.chatContainer}>
          <ChatList userId={userId} />
        </div>
      </div>
      <Footer />
    </AuthContextProvider>
  );
};

export default ChatPage;