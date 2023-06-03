import React, {useState} from 'react'
import './Login.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faGoogle, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import {FcAddImage} from 'react-icons/fc';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth, db, storage} from '../firebase';
import {uploadBytesResumable, getDownloadURL, ref} from 'firebase/storage';
import {doc, setDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const [profilePic, setProfilePic] = useState('')
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [err, setErr] = useState(false)
    const [errlogin, setErrLOgin] = useState(false)
    const navigate = useNavigate()

    const handleSignUpClick = () => {
        setIsSignUpMode(true);
    };

    const handleSignInClick = () => {
        setIsSignUpMode(false);
    };

    const handleImageUpload = (e) => {
        const Image = e.target.files[0]
        

        setProfilePic(URL.createObjectURL(e.target.files[0]))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        // Create User with email and password
        if (displayName || file) {
            try {
                if (! password || file) {


                    const res = await createUserWithEmailAndPassword(auth, email, password)

                    // Upload Image
                    const storageRef = ref(storage, `Images/ &{Date.now()}-${
                        file.name
                    }`);

                    const uploadTask = uploadBytesResumable(storageRef, file);

                    uploadTask.on('state_changed', (snapshot) => {}, (error) => {
                        setErr(true)
                    }, () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                            await updateProfile(res.user, {displayName, photoURL: downloadURL})
                            // userCollection
                            await setDoc(doc(db, "users", res.user.uid), {
                                uid: res.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL
                            })
                            // user Chat Collection
                            await setDoc(doc(db, "userChat", res.user.uid), {})
                            // navigate("/login")


                        });
                    });
                    setIsSignUpMode(false);

                } else {
                    setErr("Please add profile image")
                }
            } catch (error) {
                if (error.code === 'auth/invalid-email') {

                    setErr("Please add correct email format")
                }
                if (error.code === 'auth/weak-password') {
                    setErr("Password should be at least 6 characters")
                }
                if (error.code === 'auth/missing-email') {
                    setErr("Please add an email")
                }
                if (error.code === 'auth/missing-password') {
                    setErr("Please enter password")
                }
                if (error.code === 'auth/email-already-in-use') {
                    setErr("Email already in use")
                }
            }
        } else {
            if (! displayName) {
                setErr("Please give a usernam")

            }

        }
    }
   
    //Login
    const handleLogin = async(e) => {
        e.preventDefault()

        const email = e.target[0].value;
        const password = e.target[1].value;
       

        try {
          await signInWithEmailAndPassword(auth, email, password)
         
          navigate("/home")
        } catch (error) {
          if(error.code === 'auth/user-not-found'){
            
            setErrLOgin("User does not exist.")
         } if(error.code === "auth/invalid-email"){
          setErrLOgin("Please add an email")
         } if(error.code === 'auth/missing-password'){
          setErrLOgin("Please Enter password")
         } if(error.code === 'auth/wrong-password'){
          setErrLOgin("Password is wrong")
         }        
        }
    }

    return (
        <div className={
            `loginContainer ${
                isSignUpMode ? 'sign-up-mode' : ''
            }`
        }>
            <div className="forms-container">
                <div className="signin-signup">
                    <form onSubmit={handleLogin}
                        action="#"
                        className="sign-in-form loginForm">
                          {
                        errlogin && <div className='text-red-600'>{errlogin}</div>
                    }
                        <h2 className="title text-white">Login</h2>
                        <div className="input-field">
                            <FontAwesomeIcon icon={faEnvelope}
                                className='my-auto mx-auto'/>
                            <input className='LoginInput' type="email" placeholder="Email"/>
                        </div>
                        <div className="input-field">
                            <FontAwesomeIcon icon={faLock}
                                className='my-auto mx-auto'/>
                            <input className='LoginInput' type="password" placeholder="Password"/>
                        </div>
                        <button className='btn'>Login</button>
                    </form>


                    {/* Register */}
                    <form action="#"
                        onSubmit={handleSubmit}
                        className="sign-up-form loginForm">
                        {
                        err && <div className='text-red-600'>
                            {err}</div>
                    }
                        <h2 className="title text-white">Register</h2>
                        <div className="input-field">
                            <FontAwesomeIcon icon={faUser}
                                className='my-auto mx-auto'/>
                            <input className='LoginInput' type="text" placeholder="Username"/>
                        </div>
                        <div className="input-field">
                            <FontAwesomeIcon icon={faEnvelope}
                                className='my-auto mx-auto'/>
                            <input className='LoginInput' type="email" placeholder="Email"/>
                        </div>
                        <div className="input-field">
                            <FontAwesomeIcon icon={faLock}
                                className='my-auto mx-auto'/>
                            <input className='LoginInput' type="password" placeholder="Password"/>
                        </div>
                        <div>
                            <input className='hidden' type="file" id="file"
                                onChange={handleImageUpload}/>
                            <label htmlFor="file" className='flex cursor-pointer items-center gap-2 font-normal text-sm'>
                                {
                                profilePic && profilePic ? <>
                                    <img className='w-10 h-10 rounded-full object-cover'
                                        src={profilePic}
                                        alt=""/>
                                    <div className='font-perifpp text-xs text-gray-200'>Change image</div>
                                </> : <>
                                    <FcAddImage size={28}/>
                                    <span className='text-[#89BDD6] text-base'>Add an Image</span>
                                </>
                            } </label>
                        </div>
                        <button className='btn'>Sign Up</button>
                    </form>
                </div>
            </div>


            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3 className='loginh3'>New here?</h3>
                        <p className='loginp'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                                                                                                                                                                      ex ratione. Aliquid!
                        </p>
                        <button className="btn transparent"
                            onClick={handleSignUpClick}>
                            Register
                        </button>
                    </div>
                    <img src="/img/dogLogin1.svg" class="image" alt=""/>
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3 className='loginh3'>One of us ?</h3>
                        <p className='loginp'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                                                                                                                                                                      laboriosam ad deleniti.
                        </p>
                        <button onClick={handleSignInClick}
                            className="btn transparent"
                            id="sign-in-btn">
                            Login
                        </button>
                    </div>
                    <img src="/img/dogLogin.svg" class="image" alt=""/>
                </div>
            </div>
        </div>
    )
}

export default Register
