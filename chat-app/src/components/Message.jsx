import React, { useContext, useEffect, useState } from 'react'
import Messages from './Messages'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import MobileNav from './MobileNav'


const Message = () => {

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const {data} = useContext(ChatContext)

  useEffect(() => {
    
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
       doc.exists() && setMessages(doc.data().messages)
       setLoading(true)
    })
    return () => {
      unSub()
    }
  },[data.chatId])

    return (
      <div className=' bg-skin-fill absolute right-0 left-0 top-0 bottom-0 md:right-0 md:left-0 md:bottom24 md:top-24'>
        <MobileNav/>
        <div className=' overflow-scroll  scrollbar-hide absolute right-0 left-0 md:-top-7 top-14  bottom-24' >
            {
            messages.map((m,index) => (
                <>
                <div key={index}>
                    <Messages message={m} keys={m.id}/>
                </div>
                </>
            ))
        } </div>
        </div>
    )
}

export default Message
