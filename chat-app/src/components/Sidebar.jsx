import React from 'react'
import {FcCdLogo} from 'react-icons/fc';
import {HiHome} from 'react-icons/hi';
import {BsFillChatSquareFill} from 'react-icons/bs';
import {CgProfile} from 'react-icons/cg';
import {TbLogout} from 'react-icons/tb';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase';

const Sidebar = () => {
    return (
        <div className=' '>

            <div className='  bg-[rgb(36,48,91)] absolute  bottom-5 top-5 xl:left-5 xl:right-1 left-3 -right-2  rounded-2xl'>
                <div className='flex flex-col gap-20 items-center'>
                    <div className='flex flex-col'>
                        <div className='text-4xl '>
                            <FcCdLogo/>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-20 text-white '>
                        <div className='text-xl'>
                            <BsFillChatSquareFill/>
                        </div>
                        <div className='text-2xl'>
                            <CgProfile/>
                        </div>
                        <div className='text-2xl group relative cursor-pointer 
                                         m-3'
                            onClick={
                                () => signOut(auth)
                        }
                        >
                            <TbLogout/>
                            <button className="transition transform
                                                translate-y-8 ease-in-out invisible
                                                absolute group-hover:visible pr-
                                                pl- -mt-16 pb-2 -ml-8 bg-[rgb(231,92,64)] 
                                                text-white group-hover:translate-y-0 rounded-xl text-sm px-5 flex justify-center pt-2"
                                                
                                                >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
