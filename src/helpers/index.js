const FIREBASE_ERROR_MESSAGES = {
    "auth/email-already-in-use": "The email address is already in use by another account.",
    "auth/invalid-email": "The email address is not valid.",
    "auth/operation-not-allowed": "Email/password accounts are not enabled.",
    "auth/weak-password": "The password is too weak. Please choose a stronger password.",
    "auth/user-not-found": "No user found with this email. Please sign up first.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/too-many-requests": "Too many failed login attempts. Please try again later.",
    "auth/invalid-credential": "Invalid credential. Please try again.",
};

export const getFirebaseErrorMessage = error => FIREBASE_ERROR_MESSAGES[error.code] || "An error occurred: " + error.message;


export const formatTimestamp = (timestampInSeconds) => {
    if (!timestampInSeconds) return "";

    const date = new Date(timestampInSeconds * 1000);

    const options = { year: "numeric", month: "long", day: "numeric" }; // Example: January 16, 2025
    const formattedDate = date.toLocaleDateString("en-US", options);

    const timeOptions = { hour: "2-digit", minute: "2-digit" }; // Example: 10:30 AM
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    return `${formattedTime}, ${formattedDate}`;
};
