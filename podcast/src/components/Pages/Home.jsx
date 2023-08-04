import React from 'react';
import backgroundImg from '../images/pod.jpg'; // Update the path to your background image

function Home() {
  return (
    <div className="homeImg" style={{ backgroundImage: `url(${backgroundImg})` }}>
     
      {/* Your content goes here */}
    </div>
  );
}

export default Home;

//w-full h-auto flex flex-col items-center justify-center bg-primarry