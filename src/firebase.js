
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC7F1WSqp3J0ONvkbDEOMlCTatamJASugY",
  authDomain: "netflix-clone-6b8f9.firebaseapp.com",
  projectId: "netflix-clone-6b8f9",
  storageBucket: "netflix-clone-6b8f9.firebasestorage.app",
  messagingSenderId: "464626871543",
  appId: "1:464626871543:web:585e5af7e8758df0d0f7f2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}


const login = async (email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}



const logout =()=>{
    signOut(auth);
}


export {auth, db, login, signup, logout};