import React, { useContext, useState } from 'react'
import {FiSearch} from 'react-icons/fi'
import { AuthContext } from '../context/AuthContext'
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";
import { db } from '../firebase';
import {IoMdClose, IoMdCloseCircleOutline} from 'react-icons/io';

const Search = () => {

    const [username, setUsername] = useState("")
    const [user, setUser] = useState("")
    const [err, setErr] = useState(false)
    const {currentUser} = useContext(AuthContext)

    // Search user
    const handleSearch = async () => { // checking with Enter
        const q = query(collection(db, "users"), where("displayName", "==", username))


        try { // Getting searched user data..
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => { // doc.data() is never undefined for query doc snapshots
                setUser(doc.data())
            });
        } catch (error) {
            setErr(true)
        }
    }

    // Press Enter
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    // click search user
    const handleSelect = async () => { // check whether  the group( chats in firestore) exists, if not create.
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
        
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (! res.exists()) { // create chat in chat collection
                await setDoc(doc(db, "chats", combinedId), {messages: []});

                // create user chats
                await updateDoc(doc(db, "userChat", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });

                await updateDoc(doc(db, "userChat", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });

            }
        } catch (error) {}
        setUser(null)
        setUsername("")
    }

    const handleClose = () => {
        setUser(null)
    }

    return (
        <div className=''>
            <div className='flex gap-6'>
                <input className='rounded-xl mt-2 w-full py-2 bg-[rgb(31,39,71)] text-sm placeholder:text-white p-2 text-white' type="text" placeholder='search user'
                  value={username}
                  onKeyDown={handleKey}
                  onChange={
                      e => setUsername(e.target.value)
                  }
                />
                <button className=' px-4 bg-[rgb(31,39,71)] mt-2 py-3 rounded-xl text-xl text-gray-400  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300'
                 onClick={handleSearch}
                >
                    <FiSearch/>
                </button>
            </div>
            {
            user && <div className='
                                fixed  bg-opacity-25 backdrop-blur-sm
                                md:fle justify-center items-center z-20 md:w-[27%] w-full
                                '>
                                    <div className=''>
                <div className=' flex items-center p-2 gap-3 bg-[rgb(231,92,64)] rounded-xl mt-5  cursor-pointer mr-10 md:mr-0 md:w-full relative '
                    onClick={handleSelect}>
                    <img className='h-16 w-16 bg-red-400 rounded-full object-cover'
                        src={
                            user.photoURL
                        }
                        alt="sdf"/>
                    <h1 className=' text-sm font-medium text-white'>
                        {
                        user.displayName
                    }</h1>
                </div>
                <h1 className=' absolute top-12 right-12 md:right-1 cursor-pointer text-gray-300' onClick={handleClose}><IoMdCloseCircleOutline size={26}/></h1>
                </div>
            </div>
        }
        </div>
        
    )
}

export default Search
