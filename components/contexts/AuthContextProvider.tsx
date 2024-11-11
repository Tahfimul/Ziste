//sources:
//1. https://medium.com/@sajadshafi/implementing-firebase-auth-in-react-js-typescript-vite-js-88465ac84170
//2. https://stackoverflow.com/questions/66943220/how-to-handle-firebase-onauthstatechanged-in-a-react-app-and-route-users-accordi
"use client";
import { useState, useEffect, ReactNode } from 'react';
import Loading from '../Loading';
import { isSupported, initializeAnalytics } from 'firebase/analytics';
import { app, firebaseAuth } from '../../services/firebase';
import { User } from 'firebase/auth'; 
import { SigninFormValues, UserFormValues } from '@/services/authService';
import { firebaseSignUp, firebaseSignIn, firebaseSignOut, changePassword_, deleteAccount_ } from '@/services/authService';
import { useRouter } from 'next/navigation';

import { AuthContext, IAuth } from './AuthContext';
// interface User_Obj {
//   email: string;
//   firstName: string;
//   lastName: string;
//   birthday: string;
//   isStudent: boolean;
// }




interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [currentUser,  setCurrentUser] =  useState<User  |  null>(null);
  const [isLoading,  setIsLoading] =  useState<boolean>(false);
  const [isAuthLoading,  setIsAuthLoading] =  useState<boolean>(true);
  const [showSignIn, setShowSignIn] = useState<boolean>(false);

  const router = useRouter();
    //Sign up
  const signUp = (creds:  UserFormValues) => {
    setIsLoading(true);
    firebaseSignUp(creds)
      .then(async signUpResult => {
         const { user } = signUpResult; //object destructuring
         if (user)
          {
            setCurrentUser(user)
            //redirect the user on the targeted route
            router.push('/', {scroll:false})
          } 
           
         else { 
           //do something if user is empty like an alert 
           alert("couldn't sign up")
         }
         setIsLoading(false);
      })
      .catch(error  => {
       //check for error
       if (error.code  ===  'auth/email-already-in-use') {
          //show an alert or console
       } else if (error.code  ===  'auth/too-many-requests') {
          //do something like an alert
       }
       // you can check for more error like email not valid or something
       setIsLoading(false);
      });
  }

  //Sign in
  const  signIn = async (creds:  SigninFormValues) => {
    
    setIsLoading(true);
    await firebaseSignIn(creds)
         .then(async (signInResult)  => {
           const { user } =  signInResult;
           if  (user) {
             setCurrentUser(user);
             
             //redirect user to targeted route
            //  router.push('/', {scroll:false})
           } 
           else { 
            alert("couldn't sign in")
           }
           setIsLoading(false);
        })
        .catch(error  => {
           if  (error.code  ===  'auth/wrong-password') {
            //show error
           } else  if  (error.code  ===  'auth/too-many-requests') {
            //show error
           }
           setIsLoading(false);
        });
  
  }

  //Sign out
  const signOut = async () => {
    setShowSignIn(false);
    setIsLoading(true);
    try {
     await firebaseSignOut();
     setCurrentUser(null);
     router.push('/', {scroll:false})
    } catch  (error) {
     setIsLoading(false);
     //show error alert
     alert(error)
    }
  }

  const setShowSignin =()=>{setShowSignIn(!showSignIn)};

  const changePassword = (password:string)=>
  {
      changePassword_(password)
  };

  const deleteAccount = ()=>
  {
    deleteAccount_()
  }
  //create Auth Values
  const authValues: IAuth = {
    user: currentUser,
    loading: isLoading,
    showSignIn: showSignIn,
    setShowSignIn:setShowSignin,
    signIn,
    signUp,
    signOut,
    changePassword,
    deleteAccount
  }

 

  useEffect(() => {
    const setupAnalytics = async () => {
      // Check if the code is running in a browser
      if (typeof window !== 'undefined' && await isSupported()) {
        initializeAnalytics(app);
      }
    };

    setupAnalytics();

    //onAuthStateChanged check if the user is still logged in or not
    const  unsubscribe  =  firebaseAuth.onAuthStateChanged( user  => {
      setCurrentUser(user);
      setIsAuthLoading(false);
     });

     return  unsubscribe;
  }, []);

  //If loading for the first time when visiting the page
  if (isAuthLoading) return <><Loading /></>;
  
  return (<AuthContext.Provider  value={authValues}>{children}</AuthContext.Provider>);
};

export default AuthContextProvider;
