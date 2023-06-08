import React from 'react'
import Sidebar from '../components/Sidebar'
import Userchat from '../components/Userchat'
import Message from '../components/Message'
import Chats from '../components/Chats'

const Homepage = () => {
    return (

        <>
            <div className='grid grid-cols-12 md:h-screen'>

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

export default Homepage
