import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { getFirebaseErrorMessage } from "../helpers";

export const logIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            return { ...userData, userId: user.uid, token };
        }
    } catch (e) {
        throw getFirebaseErrorMessage(e);
    }
};

export const signUp = async (data) => {
    const { email, password, username } = data;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            username,
            email,
            createdAt: new Date().toISOString(),
        });
    } catch (e) {
        throw getFirebaseErrorMessage(e);
    }
};

export const logOut = async () => {
    signOut(auth);
};

export const fetchEvents = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const events = await Promise.all(
            querySnapshot.docs.map(async (eventDoc) => {
                const eventData = eventDoc.data();

                const userDoc = doc(db, "users", eventData.createdBy);
                const userSnap = await getDoc(userDoc);

                const createdByUser = userSnap.exists() ? userSnap.data() : null;

                return {
                    id: eventDoc.id,
                    ...eventData,
                    createdByUser,
                };
            })
        );
        return events;
    } catch (e) {
        throw e;
    }
};

export const getEventDetailsByIdWithMessages = async (eventId) => {
    try {
        const eventDoc = doc(db, "events", eventId);
        const eventSnap = await getDoc(eventDoc);

        if (!eventSnap.exists()) {
            throw new Error("Event not found");
        }

        const eventData = eventSnap.data();

        const createdByDoc = doc(db, "users", eventData.createdBy);
        const createdBySnap = await getDoc(createdByDoc);

        const createdByUser = createdBySnap.exists() ? createdBySnap.data() : null;

        const messages = await Promise.all(
            (eventData.messages || []).map(async (message) => {
                const userDoc = doc(db, "users", message.userId);
                const userSnap = await getDoc(userDoc);

                return {
                    ...message,
                    username: userSnap.exists() ? userSnap.data().username : "Unknown User",
                };
            })
        );

        const participants = await Promise.all(
            (eventData.participants || []).map(async (participant) => {
                const userDoc = doc(db, "users", participant);
                const userSnap = await getDoc(userDoc);
                return {
                    username: userSnap.exists() ? userSnap.data().username : "Unknown User",
                };
            })
        );

        return {
            eventId: eventId,
            ...eventData,
            createdByUser: createdByUser ? createdByUser.username : "Unknown User",
            messages,
            participants,
        };
    } catch (error) {
        console.error("Error fetching event details with messages:", error.message);
        throw error;
    }
};

export const addMessage = async (eventId, messageContent) => {
    try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error("User not authenticated");
        }

        const message = {
            text: messageContent,
            userId: currentUser.uid,
            timestamp: new Date(),
        };

        const eventRef = doc(db, "events", eventId);

        const docRef = await updateDoc(eventRef, {
            messages: arrayUnion(message),
        });

        return docRef;

    } catch (e) {
        console.error("Error adding message:", e);
        throw e;
    }
};

export const addEvent = async (eventData) => {
    try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            throw new Error("User not authenticated");
        }
        const eventWithMetaData = {
            ...eventData,
            createdBy: currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "events"), eventWithMetaData);
        return docRef;
    } catch (e) {
        throw e;
    }
};

export const fetchUsers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return users;
    } catch (e) {
        console.error("Error fetching users:", e);
        throw e;
    }
};