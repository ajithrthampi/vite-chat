import React, {useContext, useState} from 'react'
import {ChatContext} from '../context/ChatContext'
import {AuthContext} from '../context/AuthContext'
import {FcAddImage} from 'react-icons/fc'
import {
    Timestamp,
    arrayUnion,
    doc,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore'
import {db, storage} from '../firebase'
import {v4 as uuid} from 'uuid';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {AiOutlineSend} from 'react-icons/ai';
import {MdSend} from 'react-icons/md'


const Input = () => {

    const [text, setText] = useState("")
    const [img, setImg] = useState(null)
    const [profilePic, setProfilePic] = useState('')

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const handleSend = async () => {

        if (img) {
            setText("")
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on('state_changed', (snapshot) => {}, (error) => {}, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateDoc(doc(db, "chats", data.chatId), {
                        messages: arrayUnion(
                            {
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL
                            }
                        )
                    });
                });
            })

        } else {
            setText("")
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion(
                    {id: uuid(), text, senderId: currentUser.uid, date: Timestamp.now()}
                )
            })
        }

        await updateDoc(doc(db, "userChat", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        });
        await updateDoc(doc(db, "userChat", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        });
        // setText("")
        setImg(null)
        setProfilePic("")
    }

    const handleImage = (e) => {
        const Image = e.target.files[0]
        // console.log("Added dimage message",e.target.files[0]);

        setImg(e.target.files[0])
        setProfilePic(URL.createObjectURL(e.target.files[0]))
    }


    return (
        <div>
            <div className="bg-gray-30 p-3  absolute right-0 left-0 bottom-2">
                <hr className="border- bg-gray-600 h-0.5 cursor-pointer mb-4 opacity-20   duration-500"/>
                <input className="flex items-center  h-10  bg-skin-fill_input  w-full rounded-3xl px-3 text-sm py-6 text-skin-text_color" type="text" placeholder="Type your message…"
                    onChange={
                        e => setText(e.target.value)
                    }
                    value={text}/>
            </div>
            <input className='hidden' type="file" id="file"
                            onChange={
                                // e => setImg(e.target.files[0])
                                handleImage
                            }/>
            <label htmlFor="file" className=' text-3xl absolute bottom-7 cursor-pointer right-20'>
                            {
                                profilePic && profilePic ? 
                                <>
                                <img className='w-10 h-10 flex justify-center items-center rounded-full object-cover' src={profilePic} alt="" />
                                </> 
                                :
                                <>
                                  <FcAddImage size={30}/>
                                </>
                            }
                          
                        </label>
            <button className=' bg-[rgb(231,92,64)] text-white px-3 py-3 rounded-full absolute bottom-6 right-6 '
                onClick={handleSend}><MdSend/></button>
        </div>
    )
}

export default Input
