// components/ChatWindow.tsx
// source: chatgpt
"use client";

import { useState, useEffect } from 'react';
import { collection, query, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import styles from './ChatWindow.module.css';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/services/firebase'; 

// interface Message {
//     id: string;
//     senderId: string;
//     text: string;
//     createdAt: Timestamp; 
//   }
  
interface Message {
  timestamp: number;
  user: string;
  text: string;
}

interface ChatWindowProps {
  conversationId: string;
  userId: string;
}

const ChatWindow = ({ conversationId, userId }: ChatWindowProps) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    console.log(userId);
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUserEmail(user.email as string);
      } else {
        setUserEmail("");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // const q = query(collection(db, 'messages'), where('conversationId', '==', conversationId));

    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   const msgs = snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     senderId: doc.data().senderId,
    //     text: doc.data().text,
    //     createdAt: doc.data().createdAt,
    //   }));
    //   setMessages(msgs);
    // });

    const conversationDocRef = collection(
      db,
      `courses/0QjIlcwcWo3kAEKhY6zE/conversations/9JLAdM7tnCan4nhw6W2msPveyej1/${conversationId}`
    );

    const q_ = query(conversationDocRef);
      const unsubscribe = onSnapshot(q_, (snapshot:any)=>{
        console.log('ran\n');  
        
        const docs = snapshot.docs.sort((a:any, b:any) => {
          const timestampA = a.data().timestamp as number; 
          const timestampB = b.data().timestamp as number;
          return timestampA - timestampB;
        })

        const updatedConversations = docs.map((doc:any) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMessages(updatedConversations);


        },
        (error) => {
          console.error("Error observing collection: ", error.message);
      });

    return () => unsubscribe();
  }, [conversationId]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const docRef = doc(db, `courses/0QjIlcwcWo3kAEKhY6zE/conversations/9JLAdM7tnCan4nhw6W2msPveyej1/${conversationId}`, `${Date.now()}`);
      await setDoc(docRef, {
        timestamp: Date.now(),
        user: userEmail,
        text: newMessage
      });
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.messageBox}>
        {messages.map((message) => (
          
          message.user === userEmail ?<p className={styles.currentUserMessage} key={message.timestamp}>{message.text}</p>:<p className={styles.otherUserMessage} key={message.timestamp}>{message.text}</p>
        ))}
      </div>
      <div className={styles.typingArea}>
        <textarea
          rows={1}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
