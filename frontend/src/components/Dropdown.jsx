import React, { useState, useRef, useEffect } from 'react';
import { useContext } from 'react';
import { Appcontext } from '../App';
const Dropdown = ({ product }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Verify Product');
  const [status, setStatus] = useState('');
  const buttonRef = useRef(null);
  const { loading, setLoading } = useContext(Appcontext);
  useEffect(() => {
    buttonRef.current.style.backgroundColor =
      selectedOption === 'Defective'
        ? '#FF0000'
        : selectedOption === 'Verified'
        ? '#02703B'
        : '#171810';
  }, [selectedOption]);

  useEffect(() => {
    async function verifyProduct() {
      console.log(product?.id, status);
      const productOptions = {
        id: product?.id,
        status,
        operation: 'verify',
      };

      const token = localStorage.getItem('WareHousetoken');
      const checkedProduct = await fetch(
        'http://localhost:5000/verifyAndTransferProduct',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${token}`,
          },
          body: JSON.stringify(productOptions),
        },
      );
      console.log('hi');
      setLoading(false);
    }
    verifyProduct();
  }, [status]);

  async function handleClick(status) {
    setStatus(status);
  }

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setLoading(true);
    console.log(buttonRef.current);
    setSelectedOption(option);
    if (selectedOption === 'Defective') {
      buttonRef.current.style.backgroundColor = '#FF0000';
    }
    handleClick(option);
    setDropdownOpen(false);
  };

  return (
    <div className={`relative inline-block`}>
      <button
        ref={buttonRef}
        className={
          'flex bg-lightnavyblue text-white w-48 h-auto px-5 py-1 rounded-lg text-lg  items-center justify-center'
        }
        onClick={toggleDropdown}
      >
        {selectedOption}&nbsp;&#9660;
      </button>
      {isDropdownOpen && (
        <ul className="flex flex-col grow bg-white rounded-lg shadow-md py-1 mt-1 w-48">
          <li
            className={`cursor-pointer px-4 py-1 hover:text-black hover:bg-gray`}
            onClick={() => handleOptionSelect('Defective')}
          >
            Defective
          </li>
          <li
            className="cursor-pointer px-4 py-1  hover:bg-gray "
            onClick={() => handleOptionSelect('Verified')}
          >
            Verified
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
