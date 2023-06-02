import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Messages = ({message}) => {

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)
    
   
    const ref = useRef()

    useEffect(() => {
        ref.current ?. scrollIntoView({behavior: "smooth"})
    }, [message])


    return (
        <div classNameName='bg-yellow-600'>
            <div className="flex flex-col flex-grow absolute right-0 top-20 bottom-20  left-0  overflow-hidden  ">
                <div className="flex flex-col flex-grow h-0 p-4 overflow-auto no-scrollbar">

                    <div className="flex w-full mt-2 space-x-3 max-w-xs">
                        <img className="flex-shrink-0 md:h-10 md:w-10 h-7 w-7 rounded-full object-cover" src="https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
                        <div className='text-white'>
                            <div className="bg-gradient-to-r md:py-6 py-4 bg-[rgb(31,39,71)] from-[rgb(231,92,64)] via-[rgb(111,67,112)] to-[rgb(39,47,109)] p-3 rounded-r-xl rounded-bl-xl">
                                <p className="text-sm ">Lorem ipsum dolor sit amet, consectetur adipiscing eliteeweewew........</p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                    </div>


                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div className="bg-[rgb(31,39,71)] md:py-6 py-4 text-white p-3 rounded-l-xl rounded-br-xl">
                                <p className="text-sm">How are you</p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                        <img className="flex-shrink-0 md:h-10 md:w-10 h-7 w-7 rounded-full object-cover" src="https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Messages
