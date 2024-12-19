// components/ChatWindow.tsx
// source: chatgpt
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, getDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import styles from './ChatWindow.module.css';
import { Timestamp } from 'firebase/firestore';


interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: Timestamp; 
}

interface ChatWindowProps {
  conversationId: string;
  userId: string;
}

const ChatWindow = ({ conversationId, userId }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userEmails, setUserEmails] = useState<{ [userId: string]: string }>({}); // Map to store userId to email mapping

  useEffect(() => {
    // Fetch the messages in order of creation
    const q = query(
      collection(db, 'messages'), 
      where('conversationId', '==', conversationId),
      orderBy('createdAt', 'asc') // Sort messages by 'createdAt' in ascending order
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        senderId: doc.data().senderId,
        text: doc.data().text,
        createdAt: doc.data().createdAt,
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [conversationId]);

  useEffect(() => {
    // Fetch emails for all users in the conversation
    const fetchEmails = async () => {
      const usersInConversation = messages.map((msg) => msg.senderId);
      const uniqueUserIds = Array.from(new Set(usersInConversation)); // Remove duplicates

      const emailMap: { [userId: string]: string } = {};

      for (const userId of uniqueUserIds) {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userEmail = userDoc.data()?.email;
          if (userEmail) {
            emailMap[userId] = userEmail;
          }
        }
      }

      setUserEmails(emailMap);
    };

    if (messages.length > 0) {
      fetchEmails();
    }
  }, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      await addDoc(collection(db, 'messages'), {
        conversationId,
        senderId: userId,
        text: newMessage,
        createdAt: serverTimestamp(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.messageBox}>
        {messages.map((message) => {
          const senderEmail = userEmails[message.senderId]; // Get sender's email from the map
          return (
            <p key={message.id} className={message.senderId === userId ? styles.ownMessage : styles.otherMessage}>
              <strong>{senderEmail}:</strong> {message.text}
            </p>
          );
        })}
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