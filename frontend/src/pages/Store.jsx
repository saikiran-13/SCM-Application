import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Storepath from '../assets/Images/Store.png';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Verify from '../assets/Images/verify.png';
import VerifiedProducts from '../components/VerifiedProducts';
import { useContext, useState } from 'react';
import { Appcontext } from '../App';

const Store = () => {
  const { admin, isAdmin } = useContext(Appcontext);
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    // Call the onSearch prop with the current query value
    // onSearch(query);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
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
            onKeyPress={handleKeyPress}
            // startAdornment={
            //   <InputAdornment position="start">
            //     <SearchIcon />
            //   </InputAdornment>
            // }
          />
          {/* <SearchIcon style={{ marginRight: '10px' }} /> */}
        </div>
      )}

      <VerifiedProducts admin={admin} />
      <Footer />
    </div>
  );
};

export default Store;
