import React from 'react';
import SCMheader from '../components/SCMheader';
import Usercredentials from '../components/Usercredentials';
import Footer from '../components/SCMfooter';

const Login = () => {
  return (
    <>
      <div className="bg-darkblue min-h-screen">
        <SCMheader value={'useraccess'} />
        <div class="glassmorphism-form m-auto w-1/4 mt-14 font-main font-semibold">
          <Usercredentials value={'login'} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
