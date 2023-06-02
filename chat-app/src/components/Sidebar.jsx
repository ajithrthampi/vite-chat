import React from 'react'
import {FcCdLogo} from 'react-icons/fc';
import {HiHome} from 'react-icons/hi';
import {BsFillChatSquareFill} from 'react-icons/bs';
import {CgProfile} from 'react-icons/cg';
import {TbLogout} from 'react-icons/tb';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Sidebar = () => {
    return (
        <div className=' '>

            <div className='  bg-[rgb(36,48,91)] absolute  bottom-0 top-0 left-0 right-0 m-5 rounded-2xl'>
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
                        <div className='text-2xl' onClick={() => signOut(auth)}>
                            <TbLogout/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
