import React from 'react';
import SCMheader from '../components/SCMheader';
import Usercredentials from '../components/Usercredentials';
import { ToastContainer, Toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/SCMfooter';

const RegisterUser = () => {
  return (
    <>
      <div className="bg-darkblue min-h-screen">
        <ToastContainer />
        <SCMheader />
        <div class="glassmorphism-form m-auto w-1/4 mt-14 font-main font-semibold">
          <Usercredentials value={'register'} />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default RegisterUser;
