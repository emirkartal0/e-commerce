import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMenuAlt3 } from 'react-icons/hi'
import { MdHome, MdFavorite, MdFingerprint, MdStore, MdShoppingCart, MdClose } from 'react-icons/md'

function Sidebar({ children }) {

    const menus = [
        { name: 'Home Page', link: '/', icon: MdHome },
        { name: 'Products', link: '/products', icon: MdStore, margin: true },
        { name: 'Favorites', link: '/favorites', icon: MdFavorite },
        { name: 'Basket', link: '/basket', icon: MdShoppingCart },
        { name: 'Sign In', link: '/redirect', icon: MdFingerprint, margin: true },
    ]

    const [open, setOpen] = useState(true)

    return (
        <div className='flex'>
            <div className={`${open ? 'w-80' : 'w-16'} rounded-tr-2xl duration-500 min-h-screen bg-[#0e0e0e] text-gray-200 px-4`}>
                <div className='py-3 flex justify-end duration-1000'>
                    {
                        !open &&
                        <HiMenuAlt3
                            onClick={() => setOpen(!open)}
                            className='cursor-pointer'
                            size={30}
                        />
                    }
                    {
                        open &&
                        <MdClose
                            onClick={() => setOpen(!open)}
                            className='cursor-pointer'
                            size={30}
                        />
                    }
                </div>
                <div className='flex flex-col mt-5 gap-4 relative'>
                    {
                        menus?.map((menu, i) => (
                            <Link
                                to={menu?.link}
                                className={`${menu.margin && 'mt-3'} ${!open && 'py-2'} group flex items-center text-lg gap-5 font-light p-3.5 px-1 hover:bg-gray-700 duration-500 rounded-md`}
                                key={i}
                            >
                                <div>{React.createElement(menu?.icon, { size: '24' })}</div>
                                <h2
                                    style={{
                                        transitionDelay: `${i + 1}00ms`
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-20 overflow-hidden'} `}
                                >
                                    {menu.name}
                                </h2>
                                {/*  side bar'da üzerine geldiğinde ne olduğu gösteren kod
                                <h2
                                    className={`${open && 'hidden'} absolute left-24 bg-white font-light text-base whitespace-pre text-gray-800 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300`}
                                >
                                    {menu?.name}
                                </h2> */}
                            </Link>
                        ))
                    }
                </div>
            </div>
            <main className='w-full'> {children} </main>
        </div>
    )
}

export default Sidebar