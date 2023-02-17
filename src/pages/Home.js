import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { AiFillLinkedin } from 'react-icons/ai';
import { CgImage } from 'react-icons/cg';
import { FiSend } from 'react-icons/fi';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import { getDatabase,set,ref, push, onValue, remove } from "firebase/database"; 
import uuid from 'react-uuid';
import { getStorage, ref as storeRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import Loader from '../components/Loader';

function Home() {

  let data = useSelector((state) => state);
  let [user, setUser] = useState();
  useEffect(()=> { 
    onValue(ref(db, "users"), (snapshot) => {
      snapshot.forEach((item) => {
        if(item.key == data.userInfo.user.uid){
          setUser({...item.val(), uid: item.key})
        } 
      }); 
    });
  }, []) 
  let db = getDatabase();
  let storage = getStorage();
  let uniqueId = uuid();

  let [post, setPost] = useState(''); 
  let [file, setFile] = useState(); 
  let [preview, setPreview] = useState(); 
  let [loader, setLoader]  = useState(false);
  let [deleteLoader, setDeleteLoader] = useState(false);
  let [allData, setAllData]  = useState([]);

  useEffect(() => {  
    if (!file) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

 useEffect(() => {
    let users = [];
    onValue(ref(db, "users"), (snapshot) => {
      snapshot.forEach((item) => {
        users.push({ ...item.val(), uid: item.key }); 
      }); 
    });

    onValue(ref(db, "posts"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
         let postUser = users.find(user => user.uid == item.val().userId);
         if(postUser){
           arr.push({ 
            ...item.val(), 
            postId: item.key,
            userName: postUser.name,
            userDesignation: postUser.designation,
            userProfile: postUser.profileUrl,
            }); 
         }

      });
      setAllData(arr);
    }); 
 }, []);

  let handleInput = (e) => {
    setPost(e.target.value)
  };

  let handleFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined)
      return
    }
    setFile(e.target.files[0]);
    e.target.value = null;
  };

  let handlePost = () => {
    setLoader(true);
    if(!post){
      toast.error('Please write something !!')
      setLoader(false);
      return
    }
    
    if(file){
      const storageRef = storeRef(storage, 'posts/'+uniqueId); 
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(storageRef).then((imageUrl)=>{
          set(push(ref(db, 'posts/')), {  
            userId: user.uid,
            post : post,
            imageUrl: imageUrl,
            imageId: uniqueId,
          }).then(()=>{ 
            setPost('');
            setFile(undefined);
            setLoader(false);
            toast.success('Post Successful');
          }).catch(() => { 
            setLoader(false);
            toast.error('Something went wrong');
          }) 
        })
      });
    }else{
      set(push(ref(db, 'posts/')), {  
        userId: user.uid,
        post : post,
      }).then(()=>{ 
        setPost('');
        setFile(undefined);
        setLoader(false);
        toast.success('Post Successful');
      }).catch(() => {
        setLoader(false);
          toast.error('Something went wrong'); 
      }) 
    }
  };

  let handleDelete = (item) => {
    setDeleteLoader(true)
    if(item.imageUrl){
      deleteObject(storeRef(storage, 'posts/'+item.imageId)).then(()=>{
        remove(ref(db, 'posts/'+item.postId)).then(() => {
          toast.success('Successfully deleted !!')
          setDeleteLoader(false)
        });
      }).catch(() => { 
        toast.error('Something is wrong !!')
        setDeleteLoader(false)
      });
    }else{
      remove(ref(db, 'posts/'+item.postId)).then(() => {
        toast.success('Successfully deleted !!')
        setDeleteLoader(false)
      });
    }
    
  }

  return (
    <>
      <div className="flex flex-wrap max-[1180px]:flex-col-reverse p-[4px]">
        <div className="flex-auto mb-20 max-w-[850px] mr-[32px]">
          <div className="postBox bg-white px-[30px] py-[25px]">
              <p className='font-medium leading-[14.4px] text-[12px]'>NEW POST</p>
              <hr className='opacity-40 mt-[17px] mb-[29px]'/>
              <div className="input-area flex"> 
                <textarea rows='1' value={post} onChange={handleInput} name="post" className='focus:outline-0 overflow-hidden resize-none p-2.5 w-full leading-[21.6px] text-[18px]' placeholder="What's on your mind?"></textarea> 
                <input type="file" accept='image/*' hidden onChange={handleFile} name="file" id='postImage'/>
                <div className="w-1/4 icon-area ml-auto text-right">
                  <label htmlFor="postImage" className='inline-block pr-5 opacity-20'><CgImage/></label>
                  {loader?
                    <button className="p-1 rounded text-white bg-primary-btn cursor-not-allowed">
                       <Loader/>
                    </button>
                  :
                    <button onClick={handlePost} className='p-1 rounded text-white bg-primary-btn'><FiSend/></button>
                  }
                </div>
              </div>
              {file &&
                <div className="postImage mt-[15px]">
                  <img className='max-h-[300px] w-full object-cover' src={preview} alt="" />
                </div>
              }
          </div>
          {allData.map(item => (
            <div key={item.postId} className="postCard bg-white mt-[35px]">
              <div className="postHeader text-right dropdown">
                {item.userId == user.uid && 
                  <>
                    <button type="button" className='p-[15px]'>
                      <BiDotsHorizontalRounded />
                    </button>  
                      <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                        <div className="absolute right-0 mt-1 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"> 
                          {deleteLoader ? 
                              <button className="px-8 py-2 rounded text-white bg-primary-btn w-full text-sm leading-5 text-left cursor-not-allowed">
                                <Loader/>
                              </button>
                            : 
                              <button type='button' onClick={() => handleDelete(item)} className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"><span className='p-[3px]'><BsTrash/></span> Delete</button> 
                            }
                        </div>  
                    </div>
                  </>
                }
              </div>
              <hr  className='opacity-40' />
              <div className="postBody px-[30px] pb-[70px]">
                <div className="postUser flex my-[15px]">
                    <div className="avatar">
                        <img className='h-[52px] mr-[15px] w-[52px] rounded-full object-cover' src={item.userProfile?item.userProfile:'/avatar.png' } alt="Avator"/>
                    </div>
                    <div className="info">
                      <p className='mt-[12px] text-[14px] font-bold leading-[16.8px]'>{item.userName}</p>
                      <p className='text-[10px]'>{item.userDesignation}</p>
                    </div>
                </div>
                <p className="text-[14px] leading-[21px]">{item.post}</p> 
                {item.imageUrl&&
                  <div className="postImage mt-[15px]">
                    <img className='max-h-[300px] w-full object-cover' src={item.imageUrl} alt="" />
                  </div>
                }
              </div> 
            </div>
          ))} 
        </div>
        {user && 
          <div className="flex-auto max-w-[290px] max-[1180px]:mb-[35px]">
            <div className="profile bg-white overflow-hidden">
              <div className="relative mb-[66px]">
                <img className='w-full h-[120px] object-cover' src={user.coverUrl ? user.coverUrl : "/cover.jfif" }  alt="Cover Photo" />   
                <img className='absolute top-[70px] left-[95px] w-[100px] h-[100px] object-cover rounded-full outline outline-8 outline-white' src={user.profileUrl ? user.profileUrl : "/avatar.png"} alt="Cover Photo" />   
              </div>
              <p className='text-center text-[14px] leading-[16.8px] font-bold mx-[30px]'> <Link to={'/profile/'+user.uid}>{user.name}</Link> <span className='inline-block'><AiFillLinkedin/></span></p>
                {user.about ? 
                  <p className='text-center text-[10px] ml-[29px] mr-[21px]  mt-[6px] mb-[26px]'>
                    {user.about}
                  </p>
                :
                  <p className='text-center text-[10px] ml-[29px] mr-[21px]  mt-[6px] mb-[26px]'>
                    Write something about yourself
                  </p>
                }
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Home
