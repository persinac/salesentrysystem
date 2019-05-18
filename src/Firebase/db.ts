import { db } from "./firebase";

// User API
export const doCreateUser = (id: string, username: string, email: string) =>
    db.ref(`users/${id}`).set({
        email,
        username
    });

export const getUsers = () => db.ref("users").once("value");
export const getUserById = (uid: string) => db.ref(`users/#{uid}`).once("value");
