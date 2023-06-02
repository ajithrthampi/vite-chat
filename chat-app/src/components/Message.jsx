import React, { useContext, useEffect, useState } from 'react'
import Messages from './Messages'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

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
        <div className='o'>
            {
            messages.map(m => (
                <>
                    <Messages message={m} key={m.id}/>
                </>
            ))
        } </div>
    )
}

export default Message
