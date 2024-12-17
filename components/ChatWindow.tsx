import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import styles from './ChatWindow.module.css';

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

  useEffect(() => {
    // Add an orderBy clause to order by the 'createdAt' timestamp
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
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.messageBox}>
        {messages.map((message) => (
          <p key={message.id} className={message.senderId === userId ? styles.ownMessage : styles.otherMessage}>
            {message.text}
          </p>
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
