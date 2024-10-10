"use client";

import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

interface Conversation {
  id: string;
  users: string[];
  createdAt?: Timestamp | null;
}

const ChatList = ({ userId }: { userId: string }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'conversations'), where('users', 'array-contains', userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLoading(false);
      const convos = snapshot.docs.map((doc) => ({
        id: doc.id,
        users: doc.data().users || [],
        createdAt: doc.data().createdAt || null,
      }));
      setConversations(convos);
    });

    return () => unsubscribe();
  }, [userId]);

  const startNewConversation = async () => {
    const newUsers = prompt("Enter user IDs separated by commas:");
    const usersArray = newUsers ? newUsers.split(',').map(user => user.trim()).concat(userId) : [userId];

    try {
      const newConversation = await addDoc(collection(db, 'conversations'), {
        users: usersArray,
        createdAt: serverTimestamp(),
      });

      setSelectedConversation({
        id: newConversation.id,
        users: usersArray,
        createdAt: null,
      });
    } catch (error) {
      console.error("Error starting new conversation:", error);
    }
  };

  return (
    <div>
      <button onClick={startNewConversation}>Start New Conversation</button>
      {loading ? (
        <p>Loading conversations...</p>
      ) : (
        <ul>
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              <button onClick={() => setSelectedConversation(conversation)}>
                Conversation {conversation.id} with users: {conversation.users.join(', ')}
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedConversation && (
        <div>
          <h3>Selected Conversation:</h3>
          <p>ID: {selectedConversation.id}</p>
          <p>Users: {selectedConversation.users.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default ChatList;
