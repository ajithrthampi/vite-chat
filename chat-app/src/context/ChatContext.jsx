import {onAuthStateChanged} from "firebase/auth";
import {createContext, useContext, useEffect, useReducer, useState} from "react";
import {auth} from "../firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext()

export const ChatContextProvider = ({children}) => {
   
    const {currentUser} = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
        showModal:""

    }
    const chatReducer = (state, action) => {
        
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user:action.payload,
                    chatId : currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                }
                case "TOGLE_MODAL": 
                return {
                    user:{},
                    chatId : "null"
                   
                }
                // console.log(showModal);
            default:
                return state;
        }
    }
    

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
    // console.log("Satet context ccccc",state);
    return (
        <ChatContext.Provider value={{ data: state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )

}
