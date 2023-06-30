import React, {useContext, useEffect, useState} from 'react'
import Search from './Search'
import {AuthContext} from '../context/AuthContext'
import {ChatContext} from '../context/ChatContext'
import {db} from '../firebase'
import {useNavigate} from 'react-router-dom'
import {onSnapshot, doc} from 'firebase/firestore'
import moment from 'moment'
import LazyChatUser from './skeletons/LazyChatUser'
import Header from './Header'
import { ThemeContext } from './context/ThemeContext'

const Userchat = () => {

    const [chats, setChats] = useState([])
    const {currentUser} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState([])
    const {dispatch} = useContext(ChatContext)
    const { value, setValue } = useContext(ThemeContext);
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
    // console.log("chats", typeof(chats));


    // click on user to chat
    const handleSelect = (u) => {
        dispatch({type: "CHANGE_USER", payload: u})
    }

    const messageChatLength = Object.keys(chats);

    // console.log(propertyNames);


    return (
        <>
            <Header/>
            <div className=' rounded-2xl absolute left-0 right-0 m-5 top-10 bottom-0 flex flex-col gap-7 '>

                <div className='flex flex-col gap-'>
                    <div className='text-white font-mono text-sm'>
                        <div className='flex flex-row gap-1 items-center'>
                            <h4 className='font-poppins'>
                                Messages
                            </h4>
                            <div className='w-5 h-5 bg-red-400 rounded-full '>
                                <p className='flex justify-center items-center pt-0.5 text-xs'>
                                    {
                                    messageChatLength ?. length
                                } </p>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <Search/>
                    </div>
                </div>

                {
                loading == true ? <>
                    <div className='flex flex-col md:gap-6 gap-2  overflow-y-scroll no-scrollbar'>
                        {
                        Object.entries(chats) ?. sort((a, b) => b[1].date - a[1].date).map((chat, index) => (

                            <div className='  cursor-pointer bg-gradient-to-b bg-skin-fill_user_card  text-skin-text_color hover:text-[rgb(253,253,254)]  hover:from-skin-fill_user_card_hover from-10% hover:via-skin-fill_hover_via via-50% transition- hover:to-skin-fill_hover_to to-90% lg:py-5 py-3 px-5 rounded-2xl  shadow-md shadow-skin-card_border_color mx-1  transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'
                                key={index}
                                onClick={
                                    () => handleSelect(chat[1].userInfo)
                            }>
                                <div className='flex justify-between items-center  '>
                                    <div className='flex gap-3 justify-center items-center'>
                                        <img className='rounded-full lg:w-14 lg:h-14 md:w-10 md:h-10 h-12 w-12 object-cover'
                                            src={
                                                chat[1] ?. userInfo ?. photoURL
                                            }
                                            alt=""/>
                                        <div className='flex flex-col gap-1  '>
                                            <h3 className='text-sm font-poppins'>
                                                {
                                                chat[1] ?. userInfo ?. displayName
                                            }</h3>
                                            <p className='text-xs text-ellipsis whitespace-nowrap  font-poppins   overflow-hidden xl:w-28 md:w-10 w-16'>
                                                {
                                                chat[1] ?. lastMessage ?. text
                                            }</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className=' text-xs'>
                                            {
                                            moment(chat[1].date ?. toDate()).fromNow()
                                        } </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    } </div>
                </> : <>
                    <div className=''>
                        <LazyChatUser/>
                    </div>
                </>
            } </div>
        </>
    )
}

export default Userchat
