//sources:
//1. https://medium.com/@sajadshafi/implementing-firebase-auth-in-react-js-typescript-vite-js-88465ac84170
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { firebaseAuth } from './firebase';

//required if you want to keep logged in after user exits the browser or closes tab
setPersistence(firebaseAuth,  browserLocalPersistence);

type LoginFormValues = 
{
    email:string,
    password:string
}

type UserFormValues = 
{
    email:string,
    password:string
}

//Sign in functionality
export const firebaseSignIn = async ({ email, password }: LoginFormValues) => {
 const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
 return result;
};

//Sign up functionality
export const firebaseSignUp = async ({ email, password }: UserFormValues) => {
 const  result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
 return result;
};

//Sign out functionality
export const  firebaseSignOut  =  async () => {
 await  signOut(firebaseAuth);
};