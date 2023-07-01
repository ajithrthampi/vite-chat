import React from 'react'
import Sidebar from '../components/Sidebar'
import Userchat from '../components/Userchat'
import Message from '../components/Message'
import Chats from '../components/Chats'
import  { memo } from 'react';

const Homepage = () => {
    return (

        <>
            <div className='theme-ligh grid grid-cols-12 absolute top-0 bottom-0 bg-skin-fill right-0 left-0'>

                <div className='col-span-1 relative  hidden md:block'>
                    <Sidebar/>
                </div>
                <div className='col-span-4 md:relative '>
                    <Userchat/>
                </div>
                <div className='col-span-7 md:relative '>
                    <Chats/>
                </div>

            </div>
        </>

    )
}

export default memo(Homepage);

