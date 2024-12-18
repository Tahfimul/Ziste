// components/ChatList.tsx
"use client";

import { useEffect, useState, useRef } from 'react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, Timestamp, getDocs, doc} from 'firebase/firestore';
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

interface Conversation2 {
  id: string;
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
  const [selectedConversation2, setSelectedConversation2] = useState<Conversation2|null>(null);
  const [usersMap, setUsersMap] = useState<{ [key: string]: { name: string; email: string } }>({});
  const [type, setType] = useState<conversationType|undefined>(undefined)
  const [called, setCalled] = useState<boolean>(true)
  const [showDirectMessages, setShowDirectMessages] = useState<boolean>(true)
  const [showChannels, setShowChannels] = useState<boolean>(true)
  const [conversationTags, setConversationTags] = useState<Map<string, number>>(new Map())
  const [viewDocRef, setViewDocRef] = useState<any>(null)
  const [isViewSubscribed, setIsViewSubscribed] = useState<boolean>(false)
  // const [viewPanelUnsubscribe, setViewPanelUnsubscribe] = useState<(()=>void)|null>(null)
  const viewPanelUnsubscribeRef = useRef<(()=> void) | null>(null) 
  // Fetch users
  useEffect(() => { 
    const fetchUserMap = async () => {
      const map = await fetchUsers();
      setUsersMap(map);
    };

    fetchUserMap();
  }, []);


  // Fetch conversations from Firestore

  useEffect(()=>{

    console.log(conversations)
    console.log(usersMap)

    if(viewDocRef && isViewSubscribed)
    {
      {
        selectedConversation? console.log(selectedConversation):console.log('');
      }        
      console.log('retrieving requested viewDocRef')
      console.log('viewDocRef: ',viewDocRef);

      const q_ = query(viewDocRef);
      const observerUnsubscribe = onSnapshot(q_, (snapshot:any)=>{
        console.log('ran\n');  

        console.log('retrieved convo: ',snapshot.docs.map[0])
        
        // const updatedConversations = snapshot.docs.map((doc:any) => ({
        //   id: doc.id,
        //   ...doc.data(),
        // }));

        // setConversations(updatedConversations);


        },
        (error) => {
          console.error("Error observing collection: ", error.message);
      });

      viewPanelUnsubscribeRef.current = observerUnsubscribe;

      // setViewPanelUnsubscribe(observerUnsubscribe)
    }
    // else if(viewPanelUnsubscribe)
    // {
    //   viewPanelUnsubscribe()
    //   setViewPanelUnsubscribe(null)
    //   console.log('unsubscribed from Firestore updates')
    // }
    else if(viewPanelUnsubscribeRef.current)
    {
      viewPanelUnsubscribeRef.current()
      viewPanelUnsubscribeRef.current = null;
      console.log('Unsubscribed from Firestore updates');
    }

    // Cleanup on unmount
    return () => {
      // if (viewPanelUnsubscribe) {
      //   viewPanelUnsubscribe();
      //   console.log("Unsubscribed from Firestore updates on unmount.");
      // }

      if(viewPanelUnsubscribeRef.current)
      {
        viewPanelUnsubscribeRef.current();
        viewPanelUnsubscribeRef.current = null;
        console.log('Cleaned up Firestore updates on unmount');
      }
    };

  },[viewDocRef, isViewSubscribed])

  useEffect(()=>{
     
    const firstDocRef = doc(db, `courses/0QjIlcwcWo3kAEKhY6zE/conversations`, '9JLAdM7tnCan4nhw6W2msPveyej1');
        
    const unsubscribe = onSnapshot(firstDocRef, (snapshot)=>
    {

      setLoading(false);

      if(snapshot.exists())
      {
        if(snapshot.get('conversations'))
        {
          const data = snapshot.data();
          const convos = data.conversations;
          console.log('convos: ',convos);
          console.log('createdAt: ',convos[0].createdAt);
          convos.map((val:string)=>
          {
            console.log('val: ',val);
            if(!conversationTags?.has(val))
            {
              console.log('conversationTags does not have value: ',val);
              console.log(conversationTags)
              conversationTags?.set(val, 1);
              setConversationTags(conversationTags);
            }

          })
        }
          
      }
        
      
    });


    return ()=> unsubscribe();
      


  }, [conversationTags]);

  // Fetch conversations frxom Firestore

  useEffect(() => {

    setType(undefined);
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

  const toggleChannels = ()=>
  {
    setShowChannels(!showChannels);
  }

  const queryConversation = (conversationId:string) =>
  {
      setSelectedConversation2({id: conversationId});
      console.log('queryConversation called for conversationId: ',conversationId)
      console.log('queryConversation called for conversationId with length: ',conversationId.length)
      // const conversationDocRef = collection(
      //   db,
      //   "courses",
      //   "0QjIlcwcWo3kAEKhY6zE",
      //   "conversations",
      //   "9JLAdM7tnCan4nhw6W2msPveyej1",
      //   conversationId
      // );

      const conversationDocRef = collection(
        db,
        `courses/0QjIlcwcWo3kAEKhY6zE/conversations/9JLAdM7tnCan4nhw6W2msPveyej1/${conversationId}`
      );

      // const conversationDocRef = doc(db, `courses/0QjIlcwcWo3kAEKhY6zE/conversations/9JLAdM7tnCan4nhw6W2msPveyej1/${conversationId}`, `1733413332`)

      console.log('conversationDocRef: ',conversationDocRef);

      if(isViewSubscribed && viewDocRef)
      {
        setIsViewSubscribed(false)
        setViewDocRef(null)
      }
      setViewDocRef(conversationDocRef)
      setIsViewSubscribed(true)
      
  }

  return (
    // <div className={styles.chatWrapper}>
    <div className='chatWrapper'>
      {/* Left Side - Chat List */}
      {/* <div className={styles.chatList}> */}
      <div className='chatList bg-patekGreen'>
        <button className='startChatBtn' onClick={startNewConversation}>Start New Conversation</button>
        {loading ? (
          <p>Loading conversations...</p>
        ) : (
          <>
            <div className="flex items-center space-x-1 hover:bg-gray-200 cursor-pointer" onClick={toggleChannels}>
              
              <p>#</p>

              <p className="">Channels</p>            
            </div>
            {
              showChannels && 
              <>             
              </>
            }
           
            
            <div className="flex items-center space-x-1 hover:bg-gray-200 cursor-pointer" onClick={toggleDirectMessages}>
              
              <svg width="12" height="12" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 15L0.339745 0L17.6603 0L9 15Z" fill="#FFFF"/>
              </svg>

              <p className="">Direct messages</p>            
            </div>
            { showDirectMessages &&
                 <ul>
                  {[...conversationTags.entries()].map(([key]) => (
                    <li className="pl-4" key={key}>
                      <button onClick={()=>queryConversation(key)}>
                          {key}
                      </button>
                      
                    </li>
                  ))}
               </ul>
            }
          </>
        )}
      </div>

      {/* Right Side - Chat Window */}
      {/* <div className={styles.chatWindow}> */}
      <div className='chatWindow'>
        {selectedConversation2 ? (
          // <ChatWindow conversationId={selectedConversation.id} userId={userId} />
          <ChatWindow conversationId={selectedConversation2.id} userId={userId} />
        ) : (
          <p>Select a conversation to view messages</p>
        )}
      </div>
    </div>
  );
};

export default ChatList;