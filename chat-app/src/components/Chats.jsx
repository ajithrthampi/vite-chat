import React, {useContext} from 'react'
import Message from './Message'
import Input from './Input'
import {ChatContext} from '../context/ChatContext'

const Chats = () => {
    const {data} = useContext(ChatContext)

    return (
        <div className=''>
            <div class="absolute left-1/ -ml-0.5 w-0.5 h-screen bg-gray-600 opacity-20"></div>
            <div className='hidden md:block'>
                <div className='flex justify-between pl-5 p-2'>
                    <div className='flex  gap-3 '>
                        <img className='w-12 h-12 rounded-full object-cover'
                            src={
                                data.user ?. photoURL
                            }
                            alt=""/>
                        <div className='flex  flex-col justify-center'>
                            <h4 className='text-sm text-white'>
                                {
                                data.user ?. displayName
                            } </h4>
                            <p className='text-xs text-gray-400'>Last seen today</p>
                        </div>
                    </div>
                    <div>kjbkhb</div>
                </div>
            </div>
            <hr class=" bg-gray-600 opacity-20 hidden md:block cursor-pointer  duration-500"/>
            <div>
                <Message/>
            </div>

            <div>

                <Input/>
            </div>
        </div>
    )
}

export default Chats
