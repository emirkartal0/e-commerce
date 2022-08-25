import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const cardImages = [
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-d5c3c.appspot.com/o/CardPictures%2F11.jpegb4892b9a-3b67-49b2-80ee-06a41d67c67a?alt=media&token=5a1c324f-9255-4624-870d-a851502ad496',
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-d5c3c.appspot.com/o/CardPictures%2F13.jpeg44182ff4-e33a-4bfc-b208-3fdf338792f5?alt=media&token=4527834d-ba10-4867-906e-12324b39acda',
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-d5c3c.appspot.com/o/CardPictures%2F10.jpegf6481fef-ba85-4aa0-a396-129711fa45a3?alt=media&token=564ec214-1b3c-4bf6-ae4d-e92fb093d94a',
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-d5c3c.appspot.com/o/CardPictures%2F3.jpeg2abde7e4-7a8d-4a93-8c1e-4c37f2c1d16b?alt=media&token=057ec0a2-ee6a-4b27-9885-551b77fd5ac0',
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-d5c3c.appspot.com/o/CardPictures%2F9.jpege9bf9470-25a4-49bf-8f9b-00566bba6c77?alt=media&token=3faa1403-7aa4-485c-bd21-fb8a29c7906f',
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-d5c3c.appspot.com/o/CardPictures%2F4.jpeg0c4e4982-4fd1-491e-bbed-a049b41ccff6?alt=media&token=59fcdab7-d617-42f4-b24c-a8fa6b70f396'
]
/* const headerImages = [
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-d5c3c.appspot.com/o/CardPictures%2F90.jpeg?alt=media&token=26932e5c-5e93-4625-817c-7cad630d60c3',
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-d5c3c.appspot.com/o/CardPictures%2F91.jpeg?alt=media&token=733dae9d-0b17-4374-8d0d-39dec50681d2',
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-d5c3c.appspot.com/o/CardPictures%2F92.jpeg?alt=media&token=5dc76b81-ea9e-4e1c-906e-20fc8789b7ee'
] */

function HomePage() {

    const [width, setWidth] = useState(0);
    const carousel = useRef();

    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    },[])

    return (
        <div className='flex rounded-lg flex-col mx-20 gap-2 bg-blue-gray-200 overflow-hidden w-4/5'>
            <img src="https://firebasestorage.googleapis.com/v0/b/e-commerce-d5c3c.appspot.com/o/CardPictures%2F90.jpeg?alt=media&token=26932e5c-5e93-4625-817c-7cad630d60c3" alt="carousel" />
            <motion.div ref={carousel} className='carousel cursor-grab rounded-lg overflow-hidden' >
                <motion.div drag='x' dragConstraints={{ right: 0, left: -width }} className='inner-carousel flex bg-blue-gray-200'>
                    {
                        cardImages.map((image, i) => {
                            return (
                                <motion.div key={i} className='item  min-w-[300px] w-1/3 p-5'>
                                    <img className='w-full h-full pointer-events-none rounded-xl' src={image} alt="image" />
                                </motion.div>
                            );
                        })
                    }
                </motion.div>
            </motion.div>
        </div>
    )
}

export default HomePage