// components/ChatList.tsx
"use client";

import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, addDoc, getDoc, serverTimestamp, Timestamp, getDocs } from 'firebase/firestore';
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



// Start a new conversation or select an existing one
const startNewConversation = async () => {
  const usersInput = prompt("Enter user name(s) or email(s) separated by commas:");
  if (!usersInput) return;

  // Convert input to lowercase for case-insensitive comparison
  const usersArray = usersInput.split(',').map(user => user.trim().toLowerCase());
  let targetUserIds: string[] = []; // Explicitly declare as string[]

  // Fetch users and find target users
  const usersCollection = await getDocs(collection(db, 'users'));
  
  usersArray.forEach((userToFind) => {
    const targetUser = usersCollection.docs.find(doc => {
      const data = doc.data();
      // Convert both the stored name and email to lowercase for comparison
      return data.name?.toLowerCase() === userToFind || data.email?.toLowerCase() === userToFind;
    });

    if (targetUser) {
      targetUserIds.push(targetUser.id);
    } else {
      alert(`User ${userToFind} not found.`);
    }
  });

  if (targetUserIds.length === 0) return;

  // Add the current user to the conversation users array
  targetUserIds.push(userId);

  try {
    // Check if a conversation with the exact same users already exists
    const conversationsCollection = await getDocs(collection(db, 'conversations'));
    const existingConversation = conversationsCollection.docs.find(doc => {
      const conversationData = doc.data();
      const existingUsers = conversationData.users;
      
      // Check if the existing conversation has the same users (regardless of order)
      return existingUsers.length === targetUserIds.length && 
             targetUserIds.every(userId => existingUsers.includes(userId));
    });

    if (existingConversation) {
      // Select the existing conversation and let users begin messaging
      setSelectedConversation({
        id: existingConversation.id,
        users: existingConversation.data().users,
        createdAt: existingConversation.data().createdAt,
      });
      console.log("Conversation already exists. Selected existing conversation.");
    } else {
      // If no existing conversation, create a new one
      const newConversationRef = await addDoc(collection(db, 'conversations'), {
        users: targetUserIds,
        createdAt: serverTimestamp(),
      });

      // Fetch the document to ensure it's fully created and contains data
      const newConversationSnapshot = await getDoc(newConversationRef);
      
      // Ensure the new conversation document exists and has data
      if (newConversationSnapshot.exists()) {
        const newConversationData = newConversationSnapshot.data();

        if (newConversationData) {
          // Select the newly created conversation
          setSelectedConversation({
            id: newConversationSnapshot.id,
            users: newConversationData.users,
            createdAt: newConversationData.createdAt,
          });
          console.log("New conversation created and selected.");
        } else {
          console.error("Error: New conversation data is undefined.");
        }
      } else {
        console.error("Error: New conversation was created but document does not exist.");
      }
    }
  } catch (error) {
    console.error("Error starting new conversation:", error);
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
