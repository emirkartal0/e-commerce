import React from 'react'
import AddCard from '../components/card controller/AddCard'
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth'
import { Button } from "@material-tailwind/react";

function Admin({ user }) {
    return (
        <div className='flex flex-col ml-20 gap-10 mt-5'>
            <img className='w-40 ml-16' src="https://img.icons8.com/fluency/344/admin-settings-male.png" alt="adminImg" />
            <span className=' font-light text-3xl' >{user?.displayName} Hoşgeldiniz</span>
            <div className='flex items-center gap-2'>
                <span className='font-light text-xl'>Ürün eklemek için:</span>
                <AddCard />
            </div>
            <div className='flex items-center gap-2'>
                <span className='font-light text-xl'>Çıkış yapmak için:</span>
                <Button onClick={() => signOut(auth)} className='ml-7' color='indigo' variant="text">EXIT</Button>
            </div>
        </div>
    )
}

export default Admin