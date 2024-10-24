// components/ChatList.tsx
"use client";

import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, Timestamp, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { fetchUsers } from '../services/UserService';
import ChatWindow from './ChatWindow';
import styles from './ChatList.module.css';

interface Conversation {
  id: string;
  users: string[];
  createdAt?: Timestamp; 
}


interface ChatListProps {
  userId: string;
}

const ChatList = ({ userId }: ChatListProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [usersMap, setUsersMap] = useState<{ [key: string]: { name: string; email: string } }>({});

  // Fetch users
  useEffect(() => {
    const fetchUserMap = async () => {
      const map = await fetchUsers();
      setUsersMap(map);
    };

    fetchUserMap();
  }, []);

  // Fetch conversations from Firestore
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
      if (convos.length > 0) {
        setSelectedConversation(convos[0]);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  // Start a new conversation
  const startNewConversation = async () => {
    const userToFind = prompt("Enter user name or email:");
    if (!userToFind) return;

    // Fetch users and find the target user
    const usersCollection = await getDocs(collection(db, 'users'));
    const targetUser = usersCollection.docs.find(doc => {
      
      const data = doc.data();
      return data.name === userToFind || data.email === userToFind;
    });

    if (targetUser) {
      const usersArray = [targetUser.id, userId];

      try {
        const newConversation = await addDoc(collection(db, 'conversations'), {
          users: usersArray,
          createdAt: serverTimestamp(),
        });

        setSelectedConversation({
          id: newConversation.id,
          users: usersArray,
          createdAt: undefined,
        });
      } catch (error) {
        console.error("Error starting new conversation:", error);
      }
    } else {
      alert("User not found.");
    }
  };

  return (
    <div className={styles.chatWrapper}>
      {/* Left Side - Chat List */}
      <div className={styles.chatList}>
        <button className={styles.startChatBtn} onClick={startNewConversation}>Start New Conversation</button>
        {loading ? (
          <p>Loading conversations...</p>
        ) : (
          <ul>
            {conversations.map((conversation) => {
              // Get user emails from the usersMap, excluding the current user
              const userEmails = conversation.users
                .filter((id) => id !== userId) // Exclude the current user's ID
                .map((id) => usersMap[id]?.email) // Get the user email from the map
                .filter(email => email) // Ensure the email is not undefined
                .join(', '); // Join emails with a comma

              return (
                <li key={conversation.id}>
                  <button onClick={() => setSelectedConversation(conversation)}>
                    {userEmails || "Unnamed User"} {/* Fallback if no emails are found */}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Right Side - Chat Window */}
      <div className={styles.chatWindow}>
        {selectedConversation ? (
          <ChatWindow conversationId={selectedConversation.id} userId={userId} />
        ) : (
          <p>Select a conversation to view messages</p>
        )}
      </div>
    </div>
  );
};

export default ChatList;