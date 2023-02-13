import React, { useEffect } from 'react'
import { FiEdit } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

function Profile() {
  let {id} = useParams();
  useEffect(()=> {
    console.log(id);
  }, []) 
  return (
    <>
      <div className="flex p-2">
        <div className="flex-auto relative mb-20 w-[850px] mr-[40px]">
            <img className='h-[180px] w-full object-cover' src="/cover.jfif" alt="" />
            <label className='absolute top-[20px] right-[57px] bg-white text-[12px] leading-[14.4px] rounded p-[12px]'>
                <span className='inline-block mr-[10px]'><FiEdit/></span>Edit profile
            </label>

            <div className="profile flex relative bg-white p-[25px]">
                <div className="profile-image w-[220px]">
                    <img className='absolute -top-[25px] w-[170px] h-[170px] rounded-full outline outline-8 outline-white object-cover' src="/profile.jfif" alt="" />
                </div>
                <div className='ml-[25px]'>
                    <p className='font-bold text-[18px] leading-[21.6px]'>Dmitry Kargaev</p>
                    <p className='mt-[10px] text-[14px] leading-[21px]'>Freelance UX/UI designer, 80+ projects in web design, mobile apps  (iOS & android) and creative projects. Open to offers.</p>
                    <button className='bg-primary-btn text-[12px] font-medium leading-[14.4px] text-white py-[9px] px-[45px] rounded mt-[14px] mb-[10px]'>Contact info</button>
                </div>
            </div> 

            <div className="mt-[31px]">
                <button className='activeTab w-[240px] py-[12px] rounded-tl border border-b-0 bg-white'>PRPOFILE</button>
                <button className='w-[240px] py-[12px] rounded border border-b-0 bg-white'>FRIENDS</button>
                <button className='w-[240px] py-[12px] rounded-tr border border-b-0 bg-white'>POST</button>
            </div>
            <hr className='opacity-40' />
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
                    <img className='w-[54px] h-[54px] mr-[16px] rounded-full object-cover' src="experience.png" alt="" />
                    <div className="info">
                      <p className='text-[14px] mb-[10px] font-medium leading-[21px]'>Freelance UX/UI designer</p>
                      <p className='text-[10px] mb-[5px]'><span className='mr-[15px]'>Self Employed</span><span className='font-light'>Around the world</span></p>
                      <p className='text-[10px] mb-[10px]'><span className='font-light mr-[23px]'>Jun 2016 — Present</span><span className='font-medium text-primary-btn'>3 yrs 3 mos</span></p>
                      <p className='text-[10px]'>Work with clients and web studios as freelancer.  Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes.</p>
                    </div>
                  </div>
                  <hr className='opacity-40 mt-[25px] mb-[20px]'/>
                  <div className="experieneCart flex">
                    <img className='w-[54px] h-[54px] mr-[16px] rounded-full object-cover' src="experience.png" alt="" />
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
                    <img className='w-[54px] h-[54px] mr-[16px] object-cover' src="education.jfif" alt="" />
                    <div className="info">
                      <p className='mb-[10px] font-medium text-[14px] leading-[21px]'>Moscow State Linguistic University</p>
                      <p className='text-[10px] mb-[5px]'>Bachelor's degree Field Of StudyComputer and Information Systems Security/Information Assurance</p>
                      <p className='mb-[10px] text-[10px] font-light'>2013 — 2017</p>
                      <p className='text-[10px]'>Additional English classes and UX profile courses​.</p>
                    </div>
                  </div> 
              </div>

            </div>
        </div> 
        <div className="flex-auto w-[290px]">
           
        </div>
      </div>
    </>
  )
}

export default Profile