// Function to handle Firebase errors
export const handleSignupError = (error) => {
    switch (error.code) {
        case "auth/email-already-in-use":
            alert("The email address is already in use by another account.");
            break;
        case "auth/invalid-email":
            alert("The email address is not valid.");
            break;
        case "auth/operation-not-allowed":
            alert("Email/password accounts are not enabled.");
            break;
        case "auth/weak-password":
            alert("The password is too weak. Please choose a stronger password.");
            break;
        default:
            alert("An error occurred: " + error.message);
            break;
    }
};

export const handleLoginError = (error) => {
    switch (error.code) {
        case "auth/user-not-found":
            alert("No user found with this email. Please sign up first.");
            break;
        case "auth/wrong-password":
            alert("Incorrect password. Please try again.");
            break;
        case "auth/too-many-requests":
            alert("Too many failed login attempts. Please try again later.");
            break;
        case "auth/invalid-email":
            alert("Invalid email address. Please check and try again.");
            break;
        case "auth/invalid-credential":
            alert("Invalid credential. Please try again.");
            break;
        default:
            alert("An error occurred: " + error.message);
            break;
    }
};