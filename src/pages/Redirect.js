import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, collection } from "firebase/firestore";
import db, { auth } from '../Firebase';
import Admin from './Admin';
import Customer from './Customer';
import SignIn from './SignIn';

function Redirect() {

    const [user, setUser] = useState(null);
    const [userList, setUserList] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, authUser => {
            if (authUser) {
                setUser(authUser)
            } else {
                setUser(null)
            }
        });
    }, [])

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, 'users'),
            (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                })
                //console.log(list)
                //console.log(user.uid)
                setUserList(list)
                //console.log(userList)
                // toast success
            },
            (error) => {
                console.log(error)
            }
        );
        return () => {
            unsub();
        };
    }, [])

    return (
        <>
            {
                user ? userList?.find(admin => admin.id == user.uid).admin ? <Admin user={user} /> : <Customer user={user} /> : <SignIn />
            }
        </>
    )
}

export default Redirect