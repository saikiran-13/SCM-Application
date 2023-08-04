import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ product }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Verify Product');
  const buttonRef = useRef(null);
  useEffect(() => {
    buttonRef.current.style.backgroundColor =
      selectedOption === 'Defective'
        ? '#FF0000'
        : selectedOption === 'Verified'
        ? '#02703B'
        : '#171810';
  }, [selectedOption]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    console.log(buttonRef.current);

    setSelectedOption(option);
    if (selectedOption === 'Defective') {
      buttonRef.current.style.backgroundColor = '#FF0000';
    }
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        className="flex bg-lightnavyblue text-white w-48 h-auto px-5 py-1 rounded-lg text-lg  items-center justify-center"
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
