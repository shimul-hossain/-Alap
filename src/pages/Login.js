import React, { useState,useEffect } from 'react'
import {
  getAuth,
  signInWithEmailAndPassword,   
} from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { activeUser, loginStatus } from "../slices/userSlice";
import {Link,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getDatabase, ref, onValue } from "firebase/database"; 
import Loader from '../components/Loader';

function Login() {
    document.body.style = 'background: #fff;';
    let loginInfo = useSelector((state) => state);
    let navigate = useNavigate();
    let db = getDatabase();
    useEffect(() => { 
         if(loginInfo.userInfo.status == 1){
             navigate("/");
            }
    }, []);
    const auth = getAuth();
    let dispatch = useDispatch();
    let expression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let [disable, setDisable] = useState(false); 
    let [data, setData] = useState({
        email: '', 
        password: '', 
    })
    let [error, setError] = useState({
        emailError: '', 
        passwordError: '',  
    })

    let handleInput = (e) => {
        let {name, value}= e.target;
        setData({...data, [name]:value});
    }

    let handleSubmit = () => {
        setDisable(true);
        let errorStatus = true;
        if(data.email == ''){  
            errorStatus = true;
            setError((error) => ({...error, emailError:"Email is Required"}));
        }else if(!expression.test(data.email)){  
            errorStatus = true;
            setError((error) => ({...error, emailError:"Please Enter Valid Email Address"}));
        }else{ 
            errorStatus = false;
            setError((error) => ({...error, emailError:""}));
        };

        if(data.password == ''){ 
            errorStatus = true;
            setError((error) => ({...error, passwordError:"Password is Required"}));
        }else{ 
            errorStatus = false;
            setError((error) => ({...error, passwordError:""}));
        };
 
        if(errorStatus){
            setDisable(false); 
          }else{ 
            signInWithEmailAndPassword(auth, data.email, data.password)
            .then((loginInfo) => { 
                    onValue(ref(db, "users"), (snapshot) => { 
                      snapshot.forEach(item => {
                        if(item.key == loginInfo.user.uid){
                            dispatch(activeUser({uid:loginInfo.user.uid}));
                            localStorage.setItem("user", JSON.stringify({uid:loginInfo.user.uid}));            
                            dispatch(loginStatus(1));
                            setDisable(false);  
                            localStorage.setItem("status", 1);            
                            navigate("/");
                        }
                      });
                    });  
            })
            .catch((error) => {
              setDisable(false);
              const errorCode = error.code;
              toast.error(errorCode.replace('auth/', '')); 
          });
        }

    }
  return (
    <div className="max-w-container mt-20 mx-auto px-3"> 
    <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"/>
        <img className='mx-auto' src="/logo.png" alt="" />
        <p className='text-center text-[30px] font-bold mt-4'>Login</p>
        <p className='text-center mb-5'>Free register and you can enjoy it</p>
        <label className="block mt-5">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Email Address
            </span>
            <input type="email" name="email" onChange={handleInput} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm focus:ring-1" placeholder="email" />
            {error.emailError && 
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    {error.emailError}
                </div>
            }
        </label>
        <label className="block mt-5">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Password
            </span>
            <input type="password" name="password" onChange={handleInput} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm focus:ring-1" placeholder="......" />
            {error.passwordError && 
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    {error.passwordError}
                </div>
            }
        </label>
        {disable? 
            <button className="w-full px-4 py-2 mt-10 font-semibold text-sm bg-primary-btn text-white rounded-full shadow-sm cursor-not-allowed">
                <Loader/>
            </button> 
        :    
            <button className="w-full px-4 py-2 mt-10 font-semibold text-sm bg-primary-btn text-white rounded-full shadow-sm" onClick={handleSubmit}>Sign In</button>
        }
      <p className='mt-5 text-center'>Have no account ? <Link className='text-blue-600 visited:text-purple-600 underline' to="/register">Register here</Link></p>
    </div>
  )
}

export default Login