import React, {useContext, useState} from 'react'
import {AuthContext} from '../context/AuthContext'
import {BsCaretDown} from 'react-icons/bs';
import {HiOutlinePhone} from 'react-icons/hi';
import {FiUsers} from 'react-icons/fi';
import {GoReport} from 'react-icons/go';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import ThemeChangeButton from './themeChange/ThemeChangeButton';

const Header = () => {

    const {currentUser} = useContext(AuthContext)
    const [show, setShow] = useState(false)

    const handleModal = () => {
        setShow(!show)
    }


    return (
        <div>
            <div className='md:hidden w-screen h-14 bg-[rgb(31,39,71)] '>
                <div className='flex justify-between items-center p-2 '>
                    <h1 className='text-lg text-white pl-3'>Chats</h1>
                    <div className='flex items-center gap-6 pr-12'>
                        <img className='w-10 h-10 rounded-full object-cover items-center'
                            src={
                                currentUser ?. photoURL
                            }
                            alt=""/>
                        <div className='text-white absolute right-5'
                            onClick={handleModal}
                           >
                            <BsCaretDown/>
                            
                        </div>
                        {
                            < div > {
                                show && <div>
                                    <div className='absolute z-30 bg-skin-fill_sidebar right-0  top-16  rounded-lg py-2 dro-shadow-md'>
                                        <div className='w-[200px] text-skin-text_color'>
                                               <div className=' '>
                                                <div className='flex items-center justify-start gap-3 pl-2'>
                                                <h4 className='font-Mulish text-sm '>Change Theme</h4>
                                                    <div className='text-lg '>
                                                       <ThemeChangeButton/>
                                                    </div>
                                                    
                                                </div>
                                                <hr className="h-px my-3  bg-gray-200 border-0 dark:bg-gray-700"></hr>
                                            </div>

                                            <div className=' '>
                                                <div className='flex items-center justify-start gap-3 pl-2 '
                                                 onClick={
                                                    () => signOut(auth)
                                            }
                                                >
                                                    <div className='text-lg '>
                                                        <GoReport/>
                                                    </div>
                                                    <h4 className='font-Mulish text-sm '
                                                        >Logout</h4>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            } </div>
                        } 

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
