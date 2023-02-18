import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { FiEdit } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { getDatabase,ref,set, onValue, remove } from "firebase/database"; 
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsTrash,BsPencil } from 'react-icons/bs';
import { getStorage, ref as storeRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { toast } from 'react-toastify'
import Loader from '../components/Loader';

function Profile() {
  let {id} = useParams();
  let data = useSelector((state) => state);
  let loginUser = data.userInfo.user; 
  let [user, setUser] = useState();
  let [tabActive, setTabActive]  = useState('profile');
  let [allData, setAllData]  = useState([]);
  let [deleteLoader, setDeleteLoader] = useState(false);
  let [coverLoader, setCoverLoader] = useState(false);
  let [profileLoader, setProfileLoader] = useState(false);
  let [name, setName] = useState('');
  let [quote, setQuote] = useState('');
  let [about, setAbout] = useState('');
  let [designation, setDesignation] = useState('');
  let [editStatus, setEditStatus] = useState({
    name : false,
    quote : false,
    about : false,
    designation : false,
  })
  let db = getDatabase();
  let storage = getStorage();
  useEffect(()=> { 
    onValue(ref(db, "users"), (snapshot) => {
      snapshot.forEach((item) => {
        if(item.key == id){
          setUser({...item.val(), uid: item.key})
          setName(item.val().name)
          setQuote(item.val().quote)
          setAbout(item.val().about)
          setDesignation(item.val().designation)
        } 
      }); 
    });
  }, []) 
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
  
  let handleCover = (e) => {
    setCoverLoader(true)
    if (!e.target.files || e.target.files.length === 0) {
      setCoverLoader(false)
      return
    }else{ 
      uploadBytes(storeRef(storage, 'cover/'+loginUser.uid), e.target.files[0]).then((snapshot) => {
        getDownloadURL(storeRef(storage, 'cover/'+loginUser.uid)).then((imageUrl)=>{
          set((ref(db, 'users/'+loginUser.uid)), {   
            ...user,
            coverUrl: imageUrl, 
          }).then(()=>{    
              setCoverLoader(false)
              e.target.value = null;
              toast.success('Cover Photo Updated Successfully');
            }).catch(() => {  
              setCoverLoader(false)
              toast.error('Something went wrong');
            }) 
          })
        });
      } 
  };
  let handleProfile = (e) => {
    setProfileLoader(true)
    if (!e.target.files || e.target.files.length === 0) {
      setCoverLoader(false)
      return
    }else{ 
      uploadBytes(storeRef(storage, 'profile/'+loginUser.uid), e.target.files[0]).then((snapshot) => {
        getDownloadURL(storeRef(storage, 'profile/'+loginUser.uid)).then((imageUrl)=>{
          set((ref(db, 'users/'+loginUser.uid)), {   
            ...user,
            profileUrl: imageUrl, 
          }).then(()=>{    
              setProfileLoader(false)
              e.target.value = null;
              toast.success('Profile Photo Updated Successfully');
            }).catch(() => {  
              setProfileLoader(false)
              toast.error('Something went wrong');
            }) 
          })
        });
      } 
  };
  let handleNameChange = ()=> { 
    setEditStatus({...editStatus,name:false })
    if(name.trim() == ''){
      toast.error('Name is required');
      setName(user.name);
    }else{
      if(user.name != name.trim()){
        set((ref(db, 'users/'+loginUser.uid)), {   
          ...user,
          name: name.trim(), 
        }).then(()=>{      
            toast.success('Name Updated Successfully');
          }).catch(() => {   
            toast.error('Something went wrong');
          }) 
      }
      
    }
  }
  let handleQuoteChange = ()=> { 
    setEditStatus({...editStatus,quote:false })
    if(quote.trim() == ''){
      toast.error('Quote is required');
      setQuote(user.quote);
    }else{
      if(user.quote != quote.trim()){
        set((ref(db, 'users/'+loginUser.uid)), {   
          ...user,
          quote: quote.trim(), 
        }).then(()=>{      
            toast.success('Quote Updated Successfully');
          }).catch(() => {   
            toast.error('Something went wrong');
          }) 
      }
      
    }
  }
  let handleAboutChange = ()=> { 
    setEditStatus({...editStatus,about:false })
    if(about.trim() == ''){
      toast.error('Quote is required');
      setAbout(user.about);
    }else{
      if(user.about != about.trim()){
        set((ref(db, 'users/'+loginUser.uid)), {   
          ...user,
          about: about.trim(), 
        }).then(()=>{      
            toast.success('About Updated Successfully');
          }).catch(() => {   
            toast.error('Something went wrong');
          }) 
      }
      
    }
  }
  let handleDesignationChange = ()=> { 
    setEditStatus({...editStatus,designation:false })
    if(designation.trim() == ''){
      toast.error('Quote is required');
      setAbout(user.designation);
    }else{
      if(user.designation != designation.trim()){
        set((ref(db, 'users/'+loginUser.uid)), {   
          ...user,
          designation: designation.trim(), 
        }).then(()=>{      
            toast.success('Designation Updated Successfully');
          }).catch(() => {   
            toast.error('Something went wrong');
          }) 
      }
      
    }
  }
  return (
    <>
    {user && 
      <div className="flex p-2">
        <div className="flex-auto relative mb-20 w-[850px] mr-[40px]">
            <img className='h-[180px] w-full object-cover' src={user.coverUrl ? user.coverUrl : "/cover.jfif" } alt="" />
            {loginUser.uid == user.uid &&
              <>
                <input type="file"accept='image/*' hidden onChange={handleCover} id='coverImage' />
                {coverLoader ? 
                  <button className="absolute top-[20px] right-[7%] px-[41px] py-[12px] rounded text-white bg-primary-btn text-sm leading-5 text-left cursor-not-allowed">
                    <Loader/>
                  </button>
                : 
                  <label htmlFor='coverImage' className='absolute top-[20px] right-[7%] bg-white text-[12px] leading-[14.4px] rounded p-[12px]'>
                      <span className='inline-block mr-[10px]'><FiEdit/></span>Edit cover
                  </label>
                 } 
              </>
            }

            <div className="profile flex max-[900px]:flex-wrap relative bg-white p-[25px]">
                <div className="profile-image w-[220px]">
                    <img className='absolute -top-[25px] w-[170px] max-[900px]:w-[100px] h-[170px] max-[900px]:h-[100px] rounded-full outline outline-8 outline-white object-cover' src={user.profileUrl ? user.profileUrl : "/avatar.png"} alt="" />
                    {loginUser.uid == user.uid &&
                      <>
                        <input type="file"accept='image/*' hidden onChange={handleProfile} id='profileImage' />
                        {profileLoader ? 
                          <button className="absolute left-[180px]  max-[900px]:left-[115px] top-[100px] max-[900px]:top-[50px] p-1 rounded text-white bg-primary-btn text-sm leading-5 text-left cursor-not-allowed">
                            <Loader/>
                          </button>
                          :
                          <label htmlFor='profileImage' className='absolute left-[180px]  max-[900px]:left-[115px] top-[100px] max-[900px]:top-[50px]  bg-white '><FiEdit/></label>
                        }
                      </>
                    }
                </div>
               
                <div className='min-[901px]:ml-[25px] w-full max-[900px]:mt-[70px]'>
                    <p className='font-bold text-[18px] leading-[21.6px]'>
                    {editStatus.name? 
                    <input type="text" autoFocus onBlur={handleNameChange} value={name} onChange={(e)=>setName(e.target.value)}  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm focus:ring-1"/>
                    :
                    <>
                    {user.name}  
                      {loginUser.uid == user.uid &&
                        <button onClick={() => setEditStatus({...editStatus,name:true })} className='ml-[10px]'> <BsPencil/></button>
                      }
                    </>
                    }
                      </p>
                      <p className='font-medium text-[16px] leading-[21.6px]'> 
                        {editStatus.designation? 
                          <input type="text" autoFocus onBlur={handleDesignationChange} value={designation} onChange={(e)=>setDesignation(e.target.value)}  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm focus:ring-1"/>
                          :
                          <>
                          {user.designation}  
                            {loginUser.uid == user.uid &&
                              <button onClick={() => setEditStatus({...editStatus,designation:true })} className='ml-[10px]'> <BsPencil/></button>
                            }
                          </>
                          }
                      </p>
                    <p className='mt-[10px] text-[14px] leading-[21px]'>
                      {editStatus.quote?
                        <textarea autoFocus defaultValue={quote} onBlur={handleQuoteChange} onChange={(e)=>setQuote(e.target.value)}  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm focus:ring-1"></textarea>
                      :
                      <>
                        {user.quote || 
                          <span>Write Few Words About Your Selft</span>
                        }
                        {loginUser.uid == user.uid &&
                          <button onClick={() => setEditStatus({...editStatus,quote:true })} className='ml-[10px]'> <BsPencil/></button>
                        }
                      </>
                      }
                      </p>
                    <button className='bg-primary-btn text-[12px] font-medium leading-[14.4px] text-white py-[9px] px-[45px] rounded mt-[14px] mb-[10px]'>Contact info</button>
                </div>
            </div> 

            <div className="mt-[31px]">
                <button onClick={()=> setTabActive('profile')} className={"w-[240px] py-[12px] rounded-tl border border-b-0 bg-white "+(tabActive == 'profile' ? 'activeTab':'') }>PRPOFILE</button>
                <button onClick={()=> setTabActive("friends")} className={"w-[240px] py-[12px] rounded border border-b-0 bg-white "+(tabActive == 'friends' ? 'activeTab':'')}>FRIENDS</button>
                <button onClick={()=> setTabActive("posts")} className={"w-[240px] py-[12px] rounded-tr border border-b-0 bg-white "+(tabActive == 'posts' ? 'activeTab':'')}>POST</button>
            </div>
            <hr className='opacity-40' />
            {tabActive == 'profile' && 
              <div className='profileInfo'>
                <div className="about bg-white mt-[30px] p-[30px]">
                  <p className='text-[18px] leading-[21.6px] font-bold'>About 
                  {(!editStatus.about && loginUser.uid == user.uid) &&  
                    <button onClick={() => setEditStatus({...editStatus,about:true })} className='ml-[10px]'> <BsPencil/></button>
                  }
                  </p>
                  {editStatus.about?
                  <textarea autoFocus rows={5} defaultValue={about} onBlur={handleAboutChange} onChange={(e)=>setAbout(e.target.value)}  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm focus:ring-1"></textarea>
                  :
                  <p className='mt-[10px] text-[14px] leading-[21px]'>{user.about}</p>
                  }

                  {/* <button className='pl-[5px] mt-[20px] text-[12px] leading-[14.4px] font-medium  text-primary-btn'>
                    SEE MORE
                  </button> */}
                </div>

                <div className="experience mt-[39px] bg-white p-[30px]">
                    <p className='mb-[20px] font-bold text-[18px] leading-[21.6px]'>Experience</p>
                    <div className="experieneCart flex">
                      <img className='w-[54px] h-[54px] mr-[16px] rounded-full object-cover' src="/experience.png" alt="" />
                      <div className="info">
                        <p className='text-[14px] mb-[10px] font-medium leading-[21px]'>Freelance UX/UI designer</p>
                        <p className='text-[10px] mb-[5px]'><span className='mr-[15px]'>Self Employed</span><span className='font-light'>Around the world</span></p>
                        <p className='text-[10px] mb-[10px]'><span className='font-light mr-[23px]'>Jun 2016 — Present</span><span className='font-medium text-primary-btn'>3 yrs 3 mos</span></p>
                        <p className='text-[10px]'>Work with clients and web studios as freelancer.  Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes.</p>
                      </div>
                    </div>
                    <hr className='opacity-40 mt-[25px] mb-[20px]'/>
                    <div className="experieneCart flex">
                      <img className='w-[54px] h-[54px] mr-[16px] rounded-full object-cover' src="/experience.png" alt="" />
                      <div className="info">
                        <p className='text-[14px] mb-[10px] font-medium leading-[21px]'>Freelance UX/UI designer</p>
                        <p className='text-[10px] mb-[5px]'><span className='mr-[15px]'>Self Employed</span><span className='font-light'>Around the world</span></p>
                        <p className='text-[10px] mb-[10px]'><span className='font-light mr-[23px]'>Jun 2016 — Present</span><span className='font-medium text-primary-btn'>3 yrs 3 mos</span></p>
                        <p className='text-[10px]'>Work with clients and web studios as freelancer.  Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes.</p>
                      </div>
                    </div>
                </div>

                <div className="experience mt-[39px] bg-white p-[30px]">
                    <p className='mb-[20px] font-bold text-[18px] leading-[21.6px]'>Education</p>
                    <div className="experieneCart flex">
                      <img className='w-[54px] h-[54px] mr-[16px] object-cover' src="/education.jfif" alt="" />
                      <div className="info">
                        <p className='mb-[10px] font-medium text-[14px] leading-[21px]'>Moscow State Linguistic University</p>
                        <p className='text-[10px] mb-[5px]'>Bachelor's degree Field Of StudyComputer and Information Systems Security/Information Assurance</p>
                        <p className='mb-[10px] text-[10px] font-light'>2013 — 2017</p>
                        <p className='text-[10px]'>Additional English classes and UX profile courses​.</p>
                      </div>
                    </div> 
                </div>

              </div>
            }
            {tabActive == 'posts' &&
              allData.map(item => (
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
        <div className="flex-auto w-[290px]">
           
        </div>
      </div>
    }
    </>
  )
}

export default Profile