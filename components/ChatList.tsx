// components/ChatList.tsx
"use client";

import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, Timestamp, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { fetchUsers } from '../services/UserService';
import ChatWindow from './ChatWindow';
// import styles from './ChatList.module.css';
import '@/styles/globals.css'
import { v4 as uuidv4 } from 'uuid';

interface Conversation {
  id: string;
  users: string[];
  createdAt?: Timestamp; 
}


interface ChatListProps {
  userId: string;
}

enum conversationType
{
  CHANNEL,
  CHAT
}

const ChatList = ({ userId }: ChatListProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [usersMap, setUsersMap] = useState<{ [key: string]: { name: string; email: string } }>({});
  const [type, setType] = useState<conversationType|undefined>(undefined)
  const [called, setCalled] = useState<boolean>(false)
  const [showDirectMessages, setShowDirectMessages] = useState<boolean>(true)
  // Fetch users
  useEffect(() => {
    const fetchUserMap = async () => {
      const map = await fetchUsers();
      setUsersMap(map);
    };

    fetchUserMap();
  }, []);

  // Fetch conversations frxom Firestore
  useEffect(() => {

    setType(conversationType.CHAT);
    console.log(uuidv4().replaceAll('-',''));

    if(!called)
    {
        const q = query(collection(db, 'courses'), where('courseID', '==', 'ec6a0242242f4a8c82fae03051b7884d'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          
          setLoading(false);              

          snapshot.docs.map((doc) => 
            {
              console.log(doc.data());              
            
              (async () => {
                const q_ = query(collection(db, `courses/${doc.id}/channels`));
                const querySnapshot = await getDocs(q_);
                querySnapshot.forEach((doc_) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc_.id, " => ", doc_.data());
                  (async () => {
                    const q_1 = query(collection(db, `courses/${doc.id}/channels/${doc_.id}/access_control`));  
                    const querySnapshot_1 = await getDocs(q_1);
                    querySnapshot_1.forEach((doc_1) => {
                      console.log(doc_1.id, " => ", doc_1.data());
                    });
                  })();
                });
              })();
              
            }
            
          );

          
      });

      setCalled(true);

      return () => unsubscribe();

      
    }

    if(type ===  conversationType.CHAT)
    {

      
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
    }

    else if(type===conversationType.CHANNEL)
    {

    }
  }, [userId, type]);

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

  const toggleDirectMessages = ()=>
  {
    setShowDirectMessages(!showDirectMessages);
  }

  return (
    // <div className={styles.chatWrapper}>
    <div className='chatWrapper'>
      {/* Left Side - Chat List */}
      {/* <div className={styles.chatList}> */}
      <div className='chatList'>
        <button className='startChatBtn' onClick={startNewConversation}>Start New Conversation</button>
        {loading ? (
          <p>Loading conversations...</p>
        ) : (
          <>
            <div className="flex items-center space-x-1 hover:bg-gray-200 cursor-pointer" onClick={toggleDirectMessages}>
              
              <svg width="12" height="12" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 15L0.339745 0L17.6603 0L9 15Z" fill="#1E1E1E"/>
              </svg>

              <p className="text-gray-700">Direct messages</p>            
            </div>
            { showDirectMessages &&
                <ul>
                  {conversations.map((conversation) => {
                    // Get user emails from the usersMap, excluding the current user
                    const userEmails = conversation.users
                      .filter((id) => id !== userId) // Exclude the current user's ID
                      .map((id) => usersMap[id]?.email) // Get the user email from the map
                      .filter(email => email) // Ensure the email is not undefined
                      .join(', '); // Join emails with a comma

                    return (
                      <li className="pl-4" key={conversation.id}>
                        <button onClick={() => setSelectedConversation(conversation)}>
                          {userEmails || "Unnamed User"} {/* Fallback if no emails are found */}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            }
          </>
        )}
      </div>

      {/* Right Side - Chat Window */}
      {/* <div className={styles.chatWindow}> */}
      <div className='chatWindow'>
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