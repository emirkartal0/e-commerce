import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, addDoc } from 'firebase/firestore'
import db from '../Firebase'
import Card from '../components/card controller/Card'
import { Input } from '@material-tailwind/react';

function Products({ user }) {

    const [cardList, setCardList] = useState([]);

    const [query, setQuery] = useState('');

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, 'cards'),
            (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                })
                setCardList(list)
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
            <div className='w-1/3 ml-20 mt-2'>
                <Input value={query} onChange={(e) => setQuery(e.target.value)} color='gray' label="Search Product" variant="standard" />
            </div>
            <div className='flex flex-wrap overflow-scroll '>
                {
                    cardList.filter((card) => card.title.toLowerCase().includes(query)).map((card) => (
                        <Card
                            user={user}
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            frontImage={card.imageURL.frontImage}
                            backImage={card.imageURL.backImage}
                            price={card.price}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default Products