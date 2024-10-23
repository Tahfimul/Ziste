// services/UserService.tsx
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export const fetchUsers = async () => {
  const usersCollection = await getDocs(collection(db, 'users')); // Replace with your user collection name
  const usersMap: { [key: string]: { name: string; email: string } } = {};
  usersCollection.forEach((doc) => {
    const data = doc.data();
    usersMap[doc.id] = { name: data.name, email: data.email }; // Adjust based on your user data structure
  });
  return usersMap;
};