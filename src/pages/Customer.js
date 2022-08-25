import React from 'react'
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth'
import { Button } from "@material-tailwind/react";

function Customer({user}) {
    return (
        <div className='flex flex-col ml-20 gap-10 mt-5'>
            <img className='w-40 ml-16' src="https://img.icons8.com/doodle/344/group.png" alt="userImg" />
            <span className='ml-10 font-light text-3xl' >Kullanıcı: {user?.displayName}</span>
            <div className='flex items-center gap-2'>
                <img className='w-20' src="https://img.icons8.com/doodle/344/discount--v1.png" alt="discount" />
                <span className='font-light text-xl'>Harika fırsatlarla dolu uygulamamıza hoşgeldiniz!</span>
            </div>
            <div className='flex items-center gap-2'>
                <img className='w-20' src="https://img.icons8.com/doodle/344/shutdown.png" alt="exit" />
                <span className='font-light text-lg'>Çıkış yapmak için:</span>
                <Button onClick={() => signOut(auth)} className='ml-7 mt-1' color='red' variant="text">EXIT</Button>
            </div>
        </div>
    )
}

export default Customer