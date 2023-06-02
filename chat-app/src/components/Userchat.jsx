import React, { useContext, useEffect, useState } from 'react'
import Search from './Search'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import {db} from '../firebase'
import { useNavigate } from 'react-router-dom'
import {onSnapshot, doc} from 'firebase/firestore'

const Userchat = () => {

    const [chats, setChats] = useState([])
    const {currentUser} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState([])
    const {dispatch} = useContext(ChatContext)

    
    const navigate = useNavigate()

    useEffect(() => {
        const getChat = () => {
            
            const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
                setChats(doc.data())
                setDate(doc.data())
                setLoading(true)
                
            });
            return() => {
                unsub();
            }
        }
        currentUser.uid && getChat()

    }, [currentUser.uid])

//    console.log("Date", Object.entries(date));
    // console.log("chats,,,",  Object.entries(chats))


    //click on user to chat
    const handleSelect = (u) => {
        dispatch({type: "CHANGE_USER", payload: u})
        // navigate("/chat")
        // dispatch({type: "TOGLE_MODAL", payload: "defaultModal"})
    }


    return (
        <div className=' rounded-2xl absolute left-0 right-10 m-5 top-0 bottom-0 flex flex-col gap-7 '>
            <div className='flex flex-col gap-'>
                <div className='text-white font-mono text-sm'>
                    Messages
                    <span className='rounded-full p-1 text-xs font-mono bg-red-400 ml-1'>10</span>
                </div>
                <div className=''>
                    <Search/>
                </div>
            </div>

            <div className='flex flex-col gap-6  overflow-y-scroll no-scrollbar'>
            {
                Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map(chat => (

                <div className='  cursor-pointer bg-gradient-to-b bg-[rgb(31,39,71)]  hover:from-[rgb(231,92,64)] from-10% hover:via-[rgb(111,67,112)] via-50% transition- hover:to-[rgb(39,47,109)] to-90% py-5 px-5 rounded-2xl  border-b-4 border-[rgb(31,39,71)] transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'
                key={chats[0]} onClick={() => handleSelect(chat[1].userInfo)}
                >
                    <div className='flex justify-between items-center '>
                        <div className='flex gap-3 justify-center items-center'>
                            <img className='rounded-full w-14 h-14 object-cover'
                             src={chat[1]?.userInfo?.photoURL}
                             alt=""/>
                            <div className='flex flex-col gap-1 text-white '>
                                <h3 className='text-sm'>{chat[1]?.userInfo?.displayName}</h3>
                                <p className='text-xs'>{chat[1]?.lastMessage?.text}</p>
                            </div>
                        </div>
                        <div>
                            <p className='text-white text-xs'>
                                2: 50 pm
                            </p>
                        </div>
                    </div>
                </div>
                  ))
                } 
            </div>
        </div>
    )
}

export default Userchat
