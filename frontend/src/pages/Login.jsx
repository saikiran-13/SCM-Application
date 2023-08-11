import React from 'react';
import SCMheader from '../components/SCMheader';
import Usercredentials from '../components/Usercredentials';
import Footer from '../components/SCMfooter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  function handleToast() {}
  return (
    <>
      <div className="bg-darkblue min-h-screen">
        <ToastContainer />
        <SCMheader />
        <div class="glassmorphism-form m-auto w-1/4 mt-14 font-main font-semibold">
          <Usercredentials value={'login'} handleToast={handleToast} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
