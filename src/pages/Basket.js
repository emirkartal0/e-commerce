import React, { useEffect, useState, Fragment } from 'react'
import db from '../Firebase';
import { onSnapshot, collection } from 'firebase/firestore'
import CardList from '../components/card controller/CardList';
import { Button } from "@material-tailwind/react";

function Basket({ user }) {

    const [cardList, setCardList] = useState([]);

    const [totPrice, setTotPrice] = useState(0);

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, `${user?.uid}`),
            (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    if (doc.data().basket) {
                        list.push({ id: doc.id, ...doc.data() })
                    };
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

    const totalPrice = () => {
        let list = [];
        cardList.map(card => {
            list.push(parseFloat(card.price))
        })
        var tot = 0;
        list.map((num) => tot += num)
        alert('\n Toplam alışveriş ücreti: ' + tot + '$')
    }

    return (
        <>
            <div>
                {cardList.map((card) => (
                    <CardList
                        key={card.id}
                        uid={user.uid}
                        id={card.id}
                        frontImage={card.frontImage}
                        title={card.title}
                        price={card.price}
                    />
                ))}
            </div>
            <Button className='ml-20 mt-5' color='teal' onClick={totalPrice}>checkout</Button>
        </>
    )
}

export default Basket