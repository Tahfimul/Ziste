// app/chat/page.tsx
"use client";
import styles from '../../components/ChatList.module.css';  
import { Navbar } from '../../components/Navbar';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import ChatList from '../../components/ChatList';
import { Footer } from "@/components/Footer";
import { AuthContext } from "@/components/contexts/AuthContextProvider";

const ChatPage = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  // Redirect to /not-logged-in if user is not authenticated
  useEffect(() => {
    if (!auth.user && !auth.loading) {
      router.push('/not-logged-in');
    }
  }, [auth.user, auth.loading, router]);

  // Show a loading state while waiting for auth status
  if (auth.loading) {
    return <p>Loading...</p>;
  }

  // Ensure that unauthorized users are redirected
  if (!auth.user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <section id="chat" className="bg-white pt-[3vw]"></section>
      <div className="flex justify-left py-[0.8vh] mt-[1.5vh]">
        <h1 className="text-[5vw] text-black">Chat</h1>
      </div>
      <div className={styles.chatPage}>
        <div className={styles.chatContainer}>
          <ChatList userId={auth.user.uid} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChatPage;
