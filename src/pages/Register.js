import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,updateProfile  } from "firebase/auth";
import { getDatabase,set,ref,push } from "firebase/database";
import {Link, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const auth = getAuth();
    const db = getDatabase();
    let navigate = useNavigate();
    let expression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let [disable, setDisable] = useState(false); 
    let [data, setData] = useState({
        email: '', 
        name: '', 
        password: '', 
    })
    let [error, setError] = useState({
        emailError: '', 
        nameError: '', 
        passwordError: '',  
    })

    let handleInput = (e) => {
        let {name, value}= e.target;
        setData({...data, [name]:value});
        console.log(data);
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
        
        if(data.name == ''){ 
            errorStatus = true;
            setError((error) => ({...error, nameError:"Full Name is Required"}));
        }else{ 
            errorStatus = false;
            setError((error) => ({...error, nameError:""}));
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
            console.log("Error Found");
        }else{
            
            createUserWithEmailAndPassword(auth,data.email,data.password).then((user)=>{
                // sendEmailVerification(auth.currentUser)
                set(ref(db, 'users/' + user.user.uid), {
                    name: data.name,
                    email: user.user.email,
                  }).then(()=>{ 
                        toast("Registration Successful.");
                      setTimeout(() => {
                          setDisable(false);                
                          navigate('/login')
                      }, 2000);
                    }).catch(error => {
                      setDisable(false);
                      console.log(error);
                  }) 
            }).catch((error) => {
                setDisable(false);
                const errorCode = error.code;
                console.log(errorCode);                
            });
        }

    }
  return (
    <div className="max-w-container mt-20 mx-auto"> 
        <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"/>
        <img className='w-20 mx-auto' src="/logo192.png" alt="" />
        <p className='text-center text-[30px] font-bold mt-5'>Get started with easily register</p>
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
                Full Name 
            </span>
            <input type="text" name="name" onChange={handleInput} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Full Name" />
            {error.nameError && 
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    {error.nameError}
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
            <button className="w-full px-4 py-2 mt-10 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm cursor-not-allowed">
                <svg className="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </button> 
        :    
            <button className="w-full px-4 py-2 mt-10 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm" onClick={handleSubmit}>Sign up</button>
        }
      <p className='mt-5 text-center'>Already Have an account ? <Link className='text-blue-600 visited:text-purple-600 underline' to="/login">Login here</Link></p>
    </div>
  )
}

export default Register