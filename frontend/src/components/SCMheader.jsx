import React from 'react';
import '../App.css';
import scmlogo from '../assets/Images/scmlogo.png';
import { useNavigate } from 'react-router-dom';

const SCMheader = ({ value }) => {
  const navigateTo = useNavigate();
  return (
    <>
      <div className="flex items-center min-w-screen font-main  p-5 ">
        <div className="flex flex-start items-center px-3 w-full font-bold tracking-widest mt-10">
          <img src={scmlogo} alt="Logo Not found"></img>
          <p className="text-orange text-lg ">
            SUPPLY CHAIN
            <span className="text-white block text-xl tracking-widest">
              MANAGEMENT
            </span>
          </p>
        </div>
        {value == 'homepage' && (
          <div className="w-full flex justify-end gap-20 font-semibold tracking-widest mr-40">
            <button
              onClick={() => {
                navigateTo('/login');
              }}
              className="flex text-black text-md bg-yellow px-5 drop-shadow-md rounded-md py-2"
            >
              LOGIN
            </button>
            <button
              onClick={() => {
                navigateTo('/register');
              }}
              className="flex  drop-shadow-md rounded-md  text-white text-lg px-5 py-2 "
            >
              REGISTER
            </button>
          </div>
        )}
        {value === 'useraccess' && (
          <div>
            <button
              onClick={() => navigateTo('/')}
              className="flex  bg-yellow font-semibold rounded-md  text-black text-md px-5 py-2 mr-24"
            >
              HOME
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SCMheader;
