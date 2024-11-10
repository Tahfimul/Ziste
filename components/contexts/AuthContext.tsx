import { createContext } from 'react';
import { firebaseAuth } from '../../services/firebase';
import { User } from 'firebase/auth'; 
import { SigninFormValues, UserFormValues } from '@/services/authService';

export const AuthContext = createContext<IAuth>({
    user: firebaseAuth.currentUser,
    loading: false,
    showSignIn:false,
    setShowSignIn:()=>{},
    signIn: () => {},
    signUp: () => {},
    signOut: () => {},
   });

//IAuth context
export  interface  IAuth {
    user:  User  |  null;  //type User comes from firebase
    loading:  boolean;
    showSignIn: boolean;
    setShowSignIn: ()=>void;
    signIn: (creds:  SigninFormValues) =>  void;
    signUp: (creds:  UserFormValues) =>  void;
    signOut: () =>  void;
  }