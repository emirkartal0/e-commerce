import React from 'react'
import { MdClose } from "react-icons/md";
import db from '../../Firebase';
import { doc, deleteDoc } from "firebase/firestore";

function CardList({ frontImage, title, price, id, uid }) {

    const removeCard = () => {
        deleteDoc(doc(db, `${uid}`, id));
    }

    return (
        <div className='flex justify-between w-2/3 ml-20 mt-5 items-center bg-gray-200 rounded-lg'>
            <img className='w-36 rounded-lg' src={`${frontImage}`} alt="productImg" size="xxl" />
            <div className=' text-lg font-serif'>
                {title}
            </div>
            <div className=' text-lg font-serif'>
                {price}$
            </div>
            <MdClose onClick={removeCard} className='w-20 font-bold text-3xl text-red-600' />
        </div>
    )
}

export default CardList