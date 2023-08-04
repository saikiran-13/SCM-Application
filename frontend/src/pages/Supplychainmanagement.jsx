import React from 'react';
import '../App.css';
import SCMheader from '../components/SCMheader';
import Footer from '../components/SCMfooter';
import sideImage from '../assets/Images/sideImage.png';

const Supplychainmanagement = () => {
  return (
    <>
      <div className="bg-darkblue h-screen ">
        <SCMheader value={'homepage'} />
        <div className="flex justify-between p-10">
          <div className="flex flex-col w-fit font-main tracking-widest">
            <div className="headline text-7xl font-bold py-5 text-left text-white ">
              <h1>Streamline Your Business with</h1>
              <h1>
                Efficient{' '}
                <span className="text-yellow">Supply Chain Management</span>
              </h1>
              <h1>Solutions</h1>
            </div>
            <div className="subheadline pt-24 text-left  text-white ">
              <p className="text-3xl tracking-widest">
                Become an Active Participant to unlock
              </p>
              <p className="text-3xl tracking-widest">
                Possibilities & Delivering Excellence
              </p>
              <div>
                <button className="bg-yellow  font-roboto rounded-md text-black font-bold text-md mt-10 px-10 py-4">
                  GET STARTED
                </button>
              </div>
            </div>
          </div>

          <div className="sideimage flex justify-end items-center">
            <img
              src={sideImage}
              width={800}
              height={300}
              alt="SideImage not found"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Supplychainmanagement;
