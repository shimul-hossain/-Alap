import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { getDatabase,ref, onValue, remove } from "firebase/database"; 
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { getStorage, ref as storeRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { toast } from 'react-toastify'

function Profile() {
  let {id} = useParams();
  let [user, setUser] = useState();
  let [tabActive, setTabActive]  = useState('profile');
  let [allData, setAllData]  = useState([]);
  let [deleteLoader, setDeleteLoader] = useState(false);
  let db = getDatabase();
  let storage = getStorage();
  useEffect(()=> { 
    onValue(ref(db, "users"), (snapshot) => {
      snapshot.forEach((item) => {
        if(item.key == id){
          setUser({...item.val(), uid: item.key})
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
  return (
    <>
    {user && 
      <div className="flex p-2">
        <div className="flex-auto relative mb-20 w-[850px] mr-[40px]">
            <img className='h-[180px] w-full object-cover' src={user.coverUrl ? user.coverUrl : "/cover.jfif" } alt="" />
            <label className='absolute top-[20px] right-[57px] bg-white text-[12px] leading-[14.4px] rounded p-[12px]'>
                <span className='inline-block mr-[10px]'><FiEdit/></span>Edit profile
            </label>

            <div className="profile flex relative bg-white p-[25px]">
                <div className="profile-image w-[220px]">
                    <img className='absolute -top-[25px] w-[170px] h-[170px] rounded-full outline outline-8 outline-white object-cover' src={user.profileUrl ? user.profileUrl : "/avatar.png"} alt="" />
                </div>
                <div className='ml-[25px]'>
                    <p className='font-bold text-[18px] leading-[21.6px]'>{user.name}</p>
                    <p className='mt-[10px] text-[14px] leading-[21px]'>Freelance UX/UI designer, 80+ projects in web design, mobile apps  (iOS & android) and creative projects. Open to offers.</p>
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
                  <p className='text-[18px] leading-[21.6px] font-bold'>About</p>
                  <p className='mt-[10px] text-[14px] leading-[21px]'>I'm more experienced in eCommerce web projects and mobile banking apps, but also like to work with creative projects, such as landing pages or unusual corporate websites. </p>
                  <button className='pl-[5px] mt-[20px] text-[12px] leading-[14.4px] font-medium  text-primary-btn'>
                    SEE MORE
                  </button>
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
                                <svg className="animate-spin mx-auto h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
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