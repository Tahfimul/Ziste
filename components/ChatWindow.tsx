// components/ChatWindow.tsx

"use client";

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

    // Fetch messages for the selected conversation
    useEffect(() => {
        const q = query(collection(db, 'messages'), where('conversationId', '==', conversationId), orderBy('createdAt'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Message[];

            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [conversationId]);

    // Handle sending a new message
    const sendMessage = async () => {
        if (newMessage.trim()) {
            // Add a new message to Firestore
            await addDoc(collection(db, 'messages'), {
                text: newMessage,
                senderId: userId, // Ensure we pass the senderId as userId
                conversationId,
                createdAt: serverTimestamp(),
            });
            setNewMessage('');
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

