import React from 'react';
import Factory from '../assets/Images/Factory.png';
import { pathMap } from '../utils/constants/pathmap';
import { useNavigate } from 'react-router-dom';
const Header = ({ logoPath, logo, text }) => {
  const navigateTo = useNavigate();
  console.log(logo, text);
  return (
    <>
      <div className="flex items-center min-w-screen font-main  p-5 ">
        <div className="flex flex-start items-center px-3 w-full font-bold ">
          <img src={logoPath} alt="Logo Not found"></img>
        </div>

        <div>
          <button
            onClick={() => navigateTo(pathMap[logo]?.[text])}
            className="flex w-max bg-black font-semibold rounded-full  text-white tracking-widest text-md px-5 py-2 mr-24"
          >
            &nbsp;{text}
          </button>
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default Header;
