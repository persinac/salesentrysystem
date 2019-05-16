import { db } from "./firebase";

// User API
export const doCreateUser = (id: string, username: string, email: string): Promise<any> => {
    console.log(id + ' | ' + username + ' | ' + email);
    return db.ref(`users/${id}`).set({
        email,
        username
    });
};

export const onceGetUsers = () => db.ref("users").once("value");