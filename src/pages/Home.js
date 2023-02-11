import React, { useEffect } from 'react'
import { useSelector } from "react-redux";


function Home() {

  let data = useSelector((state) => state);

  useEffect(() => {
    console.log(data.userInfo.loginUser);
  });

  return (
    <div>Work Ongoing</div>
  )
}

export default Home