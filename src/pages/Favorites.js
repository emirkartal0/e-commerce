import React, { useState, useEffect } from 'react'
import Card from '../components/card controller/Card';
import db from '../Firebase';
import { onSnapshot, collection } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast';

function Favorites({ user }) {

    const [cardList, setCardList] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, `${user?.uid}`),
            (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    if (doc.data().favorite) {
                        list.push({ id: doc.id, ...doc.data() })
                    };
                })
                setCardList(list)
                /* if (cardList.length === 0) {
                    toast.error('Your favorite list is empty')
                }
                if (cardList.length > 0) {
                    toast.success('Your favorite list is ready')
                } */
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
        <div className='flex flex-wrap overflow-scroll '>
            <Toaster />
            {cardList.length > 0 ?
                cardList.map((card) => (
                    <Card
                        user={user}
                        key={card.id}
                        title={card.title}
                        frontImage={card.frontImage}
                        backImage={card.backImage}
                        price={card.price}
                    />
                )) : ''
            }
        </div>  
    )
}

export default Favorites