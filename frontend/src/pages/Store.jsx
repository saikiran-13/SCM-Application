import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Storepath from '../assets/Images/Store.png';
import { useContext } from 'react';
import Verify from '../assets/Images/verify.png';
import jwtDecode from 'jwt-decode';
import VerifiedProducts from '../components/VerifiedProducts';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Confetti from 'react-confetti';
import 'react-toastify/dist/ReactToastify.css';
import { Appcontext } from '../App';

const Store = () => {
  const { showConfetti, setShowConfetti } = useContext(Appcontext);
  const token = localStorage.getItem('Storetoken');
  const decodedToken = jwtDecode(token);
  const [admin, isAdmin] = useState(
    decodedToken?.role == 'admin' ? true : false,
  );
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setSearchText(event.target.value);
  };

  const handleStartConfetti = () => {
    console.log('Confetti');
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Duration of confetti effect in milliseconds
  };

  return (
    <div className="overflow-x-hidden">
      <ToastContainer />
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <Header logoPath={Storepath} logo="Store" text="Home" />
      <div className="flex flex-col justify-center font-main ">
        <h1 className="text-8xl font-bold tracking-wider text-primary">
          Welcome to Our Mobile Store
        </h1>
        <span className="text-black tracking-widest text-5xl mt-5  ">
          Discover the Latest Mobiles at Our Store!
        </span>
      </div>
      {admin ? (
        <div className="flex flex-col justify-around items-center font-main tracking-wider mt-10">
          <div className="bg-lightnavyblue px-10 py-2 rounded-full flex gap-3 items-center">
            <img className="h-8 w-8" src={Verify} alt="Img not found"></img>
            <span className="text-xl text-white font-bold ">
              Verified Products
            </span>
          </div>
        </div>
      ) : (
        <div>
          <input
            className="bg-lightblue px-5 py-2 rounded-full mt-10 w-1/3 h-12"
            type="text"
            placeholder="Search Your Products"
            value={query}
            onChange={handleInputChange}
            // onKeyPress={handleKeyPress}
          />
          {/* <SearchIcon style={{ marginRight: '10px' }} /> */}
        </div>
      )}

      <VerifiedProducts
        admin={admin}
        searchText={searchText}
        setSearchText={setSearchText}
        handleStartConfetti={handleStartConfetti}
      />
      <Footer />
    </div>
  );
};

export default Store;
