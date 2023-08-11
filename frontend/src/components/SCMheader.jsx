import React from 'react';
import '../App.css';
import scmlogo from '../assets/Images/scmlogo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

const SCMheader = () => {
  const location = useLocation();
  console.log(location.pathname);
  const navigateTo = useNavigate();

  let btn = {
    name: 'LOGIN',
    path: '/login',
  };
  btn = location.pathname == '/' ? btn : { ...btn, name: 'HOME', path: '/' };

  return (
    <div className="flex items-center min-w-screen font-main p-5 ">
      <div className="flex flex-start items-center px-3 w-full font-bold tracking-widest mt-10">
        <img src={scmlogo} alt="Logo Not found" />
        <p className="text-orange text-lg">
          SUPPLY CHAIN
          <span className="text-white block text-xl tracking-widest">
            MANAGEMENT
          </span>
        </p>
      </div>

      <div className="w-full flex justify-end gap-20 font-semibold tracking-widest mr-40">
        <Button
          onClick={() => navigateTo(`${btn.path}`)}
          variant="contained"
          class="text-black px-5 text-md bg-yellow drop-shadow-md rounded-md py-2"
        >
          {btn.name}
        </Button>
        {location.pathname === '/' && (
          <Button
            onClick={() => navigateTo('/register')}
            variant="contained"
            class="text-white bg-transparent text-lg drop-shadow-md rounded-md py-2"
          >
            REGISTER
          </Button>
        )}
      </div>
    </div>
  );
};

export default SCMheader;
