import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import db from '../../Firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore'
import { doc, deleteDoc } from "firebase/firestore";

function Card({ id, title, frontImage, backImage, price, user }) {

    const [favList, setFavList] = useState([]);
    const [basketList, setBasketList] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, `${user?.uid}`),
            (snapshot) => {
                let listFav = [];
                let listBasket = [];
                snapshot.docs.forEach((doc) => {
                    if (doc.data().favorite) {
                        listFav.push({ id: doc.id, ...doc.data() });
                    }
                    if (doc.data().basket) {
                        listBasket.push({ id: doc.id, ...doc.data() })
                    }
                })
                setFavList(listFav);
                setBasketList(listBasket);
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

    const addFavoriteCard = () => {
        if (user == undefined) {
            toast.error('Please Login!')
            return;
        };
        addDoc(collection(db, `${user.uid}`), {
            favorite: true,
            basket: false,
            title: `${title}`,
            frontImage: `${frontImage}`,
            backImage: `${backImage}`,
            price: `${price}`,
        });
        toast.success('Added Favorites!')
    }

    const addBasketCard = () => {
        if (user == undefined) {
            toast.error('Please Login!')
            return;
        };
        addDoc(collection(db, `${user.uid}`), {
            favorite: false,
            basket: true,
            title: `${title}`,
            frontImage: `${frontImage}`,
            backImage: `${backImage}`,
            price: `${price}`,
        });
        toast.success('Added Basket!')
    }

    return (
        <div className='flex ml-20 my-5'>
            <div className='relative group shadow-lg overflow-hidden'>
                <Toaster />
                <img src={`${frontImage}`} className=' h-96 w-70 duration-700 shadow-lg group-hover:opacity-0 rounded-xl' />
                <img src={`${backImage}`} className=' absolute top-0 z-[-1] h-96 w-72 shadow-lg rounded-xl duration-700' />
                <img onClick={addFavoriteCard} src="https://img.icons8.com/color/344/filled-like.png" className=' absolute w-9 p-1 pt-1.5 rounded-full hover:bg-deep-orange-100 delay-150 duration-700 right-[-60px] top-5 hover:delay-75 group-hover:right-2' alt="favorite" />
                <button onClick={addBasketCard} className='absolute px-5 py-2 left-1/4 group-hover:bottom-3 duration-700 bottom-[-65px] bg-blue-gray-800 text-white hover:bg-blue-gray-500 font-thin rounded'>add to Basket</button>
                <button className='absolute rounded duration-700 font-light bg-green-900 hover:bg-green-600 py-1.5 px-1  text-white right-[-60px] top-[334px] group-hover:right-1 cursor-default'>{`${price}` + '$'}</button>
            </div>
        </div>
    )
}

export default Card
