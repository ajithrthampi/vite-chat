import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import {SlArrowLeft} from 'react-icons/sl'

const MobileNav = () => {

    const [state, setState] = useState("")
    const {data} = useContext(ChatContext)
    const {dispatch} = useContext(ChatContext)

    useEffect(() => {
        if(data){
            setState(data)
        }
    }, [data])
   
    const handleClose = () => {
        dispatch({type: "TOGLE_MODAL", })
    }
  return (
    <>
     
     {
            state ?. user ?. displayName ? <>
                <div className='md:hidden '>
                    <div className='w-full fixed  flex  items-center bg-[rgb(31,39,71)] py-2  top-0 z-30 '>
                        <div className=' flex justify-center items-center gap-7 px-5 h-full'>
                            <div className='text-lg text-white ' onClick={handleClose}>
                                <SlArrowLeft />
                            </div>
                            <div className='flex justify-center items-center gap-3'>
                                <img className='h-8 w-8 bg-red-400 rounded-full object-cover'
                                    src={
                                        data.user ?. photoURL
                                    }
                                    alt="sdf"/>
                                    <div className='flex flex-col justify-center'>
                                   
                                <h1 className=' pt-1 text-sm font-medium text-white'>
                                    {
                                    data.user ?. displayName
                                }</h1>
                                 <p className='text-xs text-white'>last seen</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </> : <></>
        }
     
    </>
  )
}

export default MobileNav