import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { AiFillLinkedin } from 'react-icons/ai';
import { CgImage } from 'react-icons/cg';
import { FiSend } from 'react-icons/fi';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

function Home() {

  let data = useSelector((state) => state);

  useEffect(() => {
    console.log(data);
  });

  return (
    <>
      <div className="flex p-2">
        <div className="flex-auto mb-20 w-[850px] mr-[40px]">
          <div className="postBox bg-white px-[30px] py-[25px]">
              <p className='font-medium leading-[14.4px] text-[12px]'>NEW POST</p>
              <hr className='opacity-40 mt-[17px] mb-[29px]'/>
              <div className="input-area flex"> 
                <textarea rows='1' className='focus:outline-0 overflow-hidden resize-none p-2.5 w-full leading-[21.6px] text-[18px]' placeholder="What's on your mind?"></textarea> 
                <input type="file" hidden  id='postImage'/>
                <div className="w-1/6 icon-area ml-auto text-right">
                  <label htmlFor="postImage" className='inline-block pr-5 opacity-20'><CgImage/></label>
                  <button  className='p-1 rounded text-white bg-primary-btn'><FiSend/></button>
                </div>
              </div>
          </div>
          <div className="postCard bg-white mt-[35px]">
            <div className="postHeader text-right">
              <button className='p-[15px]'>
                <BiDotsHorizontalRounded />
              </button> 
            </div>
            <hr  className='opacity-40' />
            <div className="postBody px-[30px] pb-[70px]">
              <div className="postUser flex my-[15px]">
                  <div className="avatar">
                      <img className='h-[52px] mr-[15px] w-[52px] rounded-full object-cover' src="/avator.jfif" alt="Avator"/>
                  </div>
                  <div className="info">
                    <p className='mt-[12px] text-[14px] font-bold leading-[16.8px]'>Theresa Steward</p>
                    <p className='text-[10px] leading-[15px]'>iOS developer</p>
                  </div>
              </div>
              <p className="text-[14px] leading-[21px]">
              What did the Dursleys care if Harry lost his place on the House Quidditch team because he hadn’t practiced all summer? What was it to the Dursleys if Harry went back to school without any of his homework done? The Dursleys were what wizards called Muggles (not a drop of magical blood in their veins).
              </p> 
            </div> 
          </div>
          <div className="postCard bg-white mt-[35px]">
            <div className="postHeader text-right">
              <button className='p-[15px]'>
                <BiDotsHorizontalRounded />
              </button> 
            </div>
            <hr  className='opacity-40' />
            <div className="postBody px-[30px] pb-[70px]">
              <div className="postUser flex my-[15px]">
                  <div className="avatar">
                      <img className='h-[52px] mr-[15px] w-[52px] rounded-full object-cover' src="/avator2.jfif" alt="Avator"/>
                  </div>
                  <div className="info">
                    <p className='mt-[12px] text-[14px] font-bold leading-[16.8px]'>Kyle Fisher</p>
                    <p className='text-[10px] leading-[15px]'>Product designer at Commandor Corp.</p>
                  </div>
              </div>
              <p className="text-[14px] leading-[21px]">
              How’s your day going, guys?
              </p>
              <div className="postImage mt-[15px]">
                <img className='max-h-[300px] w-full object-cover' src="/post-image.jfif" alt="" />
              </div>
            </div> 
          </div>
          <div className="postCard bg-white mt-[35px]">
            <div className="postHeader text-right">
              <button className='p-[15px]'>
                <BiDotsHorizontalRounded />
              </button> 
            </div>
            <hr  className='opacity-40' />
            <div className="postBody px-[30px] pb-[70px]">
              <div className="postUser flex my-[15px]">
                  <div className="avatar">
                      <img className='h-[52px] mr-[15px] w-[52px] rounded-full object-cover' src="/avator3.jfif" alt="Avator"/>
                  </div>
                  <div className="info">
                    <p className='mt-[12px] text-[14px] font-bold leading-[16.8px]'>Audrey Alexander</p>
                    <p className='text-[10px] leading-[15px]'>Team lead at Google</p>
                  </div>
              </div>
              <p className="text-[14px] leading-[21px]">
              The bun runs along the road and meets a wolf. «Little bun, little bun, I want to eat you!» says the wolf. «I ran away from Grandfather, I ran away from Grandmother, I ran away from the hare. And I can run away from you, grey wolf!» says the bun and runs away.
              </p> 
            </div> 
          </div>
        </div>
        <div className="flex-auto w-[290px]">
          <div className="profile bg-white overflow-hidden shadow-lg">
            <div className="relative mb-[66px]">
              <img className='w-full h-[120px] object-cover' src="/cover.jfif" alt="Cover Photo" />   
              <img className='absolute top-[70px] left-[95px] w-[100px] h-[100px] object-cover rounded-full outline outline-8 outline-white' src="/profile.jfif" alt="Cover Photo" />   
            </div>
            <p className='text-center text-[14px] leading-[16.8px] font-bold mx-[30px]'>Dmitry Kargaev <span className='inline-block'><AiFillLinkedin/></span></p>
            <p className='text-center text-[10px] leading-[15px] ml-[29px] mr-[21px]  mt-[6px] mb-[26px]'>
            Freelance UX/UI designer, 80 projects in web design, mobile apps (iOS & android) and creative projects. Open to offers.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

{/* <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  </div>
</div> */}