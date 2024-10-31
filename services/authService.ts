//sources:
//1. https://medium.com/@sajadshafi/implementing-firebase-auth-in-react-js-typescript-vite-js-88465ac84170
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    setPersistence,
    browserLocalPersistence,
    signInWithPopup,
} from "firebase/auth";
import { firebaseAuth } from "./firebase";

//required if you want to keep logged in after user exits the browser or closes tab
setPersistence(firebaseAuth, browserLocalPersistence);

export type SigninFormValues = {
    email: string;
    password: string;
};

export type UserFormValues = {
    email: string;
    password: string;
};

const provider = new GoogleAuthProvider();

//Sign in functionality
export const firebaseSignIn = async ({ email, password }: SigninFormValues) => {
    const result = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
    );
    return result;
};

//Sign in functionality
export const googleSignIn = async () => {
    const result = await signInWithPopup(firebaseAuth, provider).catch(
        (error) => {
            console.log(error);
        }
    );

    return result;
};

//Sign up functionality
export const firebaseSignUp = async ({ email, password }: UserFormValues) => {
    const result = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
    );
    return result;
};

//Sign out functionality
export const firebaseSignOut = async () => {
    await signOut(firebaseAuth);
};

export const getCurrentUser = () => {
    return firebaseAuth.currentUser;
};
