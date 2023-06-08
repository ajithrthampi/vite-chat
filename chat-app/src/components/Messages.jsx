import React, {useContext, useEffect, useRef} from 'react'
import {AuthContext} from '../context/AuthContext'
import {ChatContext} from '../context/ChatContext'

const Messages = ({message}) => {

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)


    const ref = useRef()

    useEffect(() => {
        ref.current ?. scrollIntoView({behavior: "smooth"})
    }, [message])


    return (
        <div className=' d:block z-0 '
            ref={ref}>
            <div className="flex-1   justify-between flex flex-col">

                <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                    {
                    message.senderId !== currentUser.uid ? <>
                        <div className=" ">
                            <div className="flex items-end ">
                                <div className="flex flex-col space-y- text-xs max-w-xs mx-2 order-2 items-start">
                                    <div> {
                                        message.text && <span className="px-5 py-4 rounded-lg inline-block rounded-bl-none bg-gradient-to-r bg-[rgb(31,39,71)]  from-[rgb(231,92,64)] from-10% via-[rgb(111,67,112)] via-50% transition- to-[rgb(39,47,109)] to-90% text-gray-200">
                                            {
                                            message ?. text
                                        } </span>
                                    }

                                        {
                                        message.img && <div>
                                            <img className=' h-60 object-cover rounded-md'
                                                src={
                                                    message.img
                                                }
                                                alt=""/>
                                        </div>
                                    } </div>
                                </div>
                                <img src={
                                        data.user.photoURL
                                        // currentUser.photoURL
                                    }
                                    alt="My profile"
                                    className="w-6 h-6 rounded-full order-1 object-cover"/>
                            </div>
                        </div>
                    </> : <>
                        <div className="chat-message">
                            <div className="flex items-end justify-end">
                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                    <div> {
                                        message.text && <span className="px-6 py-4 rounded-lg inline-block rounded-br-none bg-[rgb(31,39,71)] text-white ">
                                            {
                                            message ?. text
                                        } </span>
                                    }
                                        {
                                        message.img && <div>
                                            <img className=' h-60 object-cover  rounded-md'
                                                src={
                                                    message ?. img
                                                }
                                                alt=""/>
                                        </div>
                                    } </div>
                                </div>
                                <img src={
                                        currentUser.photoURL
                                    }
                                    alt="My profile"
                                    className="w-6 h-6 rounded-full order-2 object-cover"/>
                            </div>
                        </div>
                    </>
                } </div>


            </div>
        </div>
    )
}

export default Messages
