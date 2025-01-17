import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { handleLoginError, handleSignupError } from "../helpers";
import { useNavigate } from "react-router-dom";

export const logIn = async (email, password) => {
    // const navigate = useNavigate();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            alert(`Welcome back, ${userData.username}!`);
            // navigate("/")
        } else {
            alert("User details not found in the database.");
        }
    } catch (e) {
        handleLoginError(e);
    }
};


export const signUp = async (data) => {
    // const navigate = useNavigate();
    const { email, password, username } = data;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            username,
            email,
            createdAt: new Date().toISOString(),
        });
        alert("Signup successful! Welcome, " + username + "!");
    } catch (error) {
        handleSignupError(error);
    }
};
export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (e) {
        return e;
    }
};

export const addEvent = async (eventData) => {
    try {
        const docRef = await addDoc(collection(db, "events"), eventData);
        console.log("Event created with ID:", docRef.id);
    } catch (e) {
        console.error("Error adding event:", e);
    }
};

export const fetchEvents = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const events = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return events;
    } catch (e) {
        console.error("Error fetching events:", e);
    }
};

export const addMessage = async (eventId, message) => {
    try {
        const eventRef = doc(db, "events", eventId);
        await updateDoc(eventRef, {
            messages: arrayUnion(message),
        });
        console.log("Message added!");
    } catch (e) {
        console.error("Error adding message:", e);
    }
};