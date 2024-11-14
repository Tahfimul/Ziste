// components/ChatList.tsx
"use client";

import { useEffect, useState, useCallback } from 'react';
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
  const [startingChat, setStartingChat] = useState(false);

  // Fetch users
  useEffect(() => {
    const fetchUserMap = async () => {
      try {
        const map = await fetchUsers();
        setUsersMap(map);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
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
      if (convos.length > 0 && !selectedConversation) {
        setSelectedConversation(convos[0]);
      }
    });

    return () => unsubscribe();
  }, [userId, selectedConversation]);

  // Start a new conversation
  const startNewConversation = async () => {
    setStartingChat(true);
    const userToFind = prompt("Enter user name or email:");
    if (!userToFind) {
      setStartingChat(false);
      return;
    }

    // Fetch users and find the target user
    try {
      const usersCollection = await getDocs(collection(db, 'users'));
      const targetUser = usersCollection.docs.find(doc => {
        const data = doc.data();
        return data.name === userToFind || data.email === userToFind;
      });

      if (targetUser) {
        const usersArray = [targetUser.id, userId];

        const newConversation = await addDoc(collection(db, 'conversations'), {
          users: usersArray,
          createdAt: serverTimestamp(),
        });

        setSelectedConversation({
          id: newConversation.id,
          users: usersArray,
          createdAt: undefined,
        });
      } else {
        alert("User not found.");
      }
    } catch (error) {
      console.error("Error starting new conversation:", error);
    }
    setStartingChat(false);
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatList}>
        <button className={styles.startChatBtn} onClick={startNewConversation} disabled={startingChat}>
          {startingChat ? "Starting..." : "Start New Conversation"}
        </button>
        {loading ? (
          <p>Loading conversations...</p>
        ) : (
          <ul>
            {conversations.map((conversation) => {
              const userEmails = conversation.users
                .filter((id) => id !== userId)
                .map((id) => usersMap[id]?.email)
                .filter(email => email)
                .join(', ');

              return (
                <li key={conversation.id}>
                  <div className={styles.conversation}>
                    <button onClick={() => setSelectedConversation(conversation)}>
                      {userEmails || "Unnamed User"}
                    </button>
                  </div>
                </li>
                
              );
            })}
          </ul>
        )}
      </div>

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