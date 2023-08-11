import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { toastify } from '../utils/toastify';

const Usercredentials = ({ value }) => {
  const navigateTo = useNavigate();
  const [disableDropdown, setDisabledDropdown] = useState(false);

  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const orgRef = useRef(null);
  const roleRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const userCredentials = {
      username: nameRef?.current?.value,
      password: passwordRef?.current?.value,
      organization: orgRef?.current?.value,
      role: roleRef?.current,
    };
    console.log(userCredentials);

    const response = await fetch(`http://localhost:5000/${value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    });

    if (response.status == 200) {
      if (userCredentials.organization) {
        const jwttoken = await response.json();
        localStorage.setItem(
          `${userCredentials.organization}token`,
          jwttoken.JWTtoken,
        );
        toastify('success', 'Login Successful');
        setTimeout(() => {
          navigateTo(`/${userCredentials.organization.toLowerCase()}`);
        }, 1000);
      } else {
        console.log('registration');

        toastify('success', 'Registration Successful');
      }
    } else {
      toastify('error', 'Invalid Credentials');
    }
  }

  return (
    <div class="flex justify-center items-center p-4">
      <div
        class={`flex justify-center m-auto rounded-3xl  w-full ${
          value === 'login' ? 'h-96' : 'h-64'
        } gap-5 p-5`}
      >
        <form class="flex flex-col gap-3 text-left w-full">
          <label class="text-white text-xl">Username:</label>
          <input
            required
            ref={nameRef}
            type="text"
            class="rounded-md bg-gray-800 text-black px-4 py-2 focus:outline-none"
          />

          <label class="text-white text-xl">Password:</label>
          <input
            ref={passwordRef}
            type="password"
            class="rounded-md bg-gray-800 text-black px-4 py-2 focus:outline-none"
          />

          {value === 'login' && (
            <>
              <div class="flex items-center gap-4">
                <label class="text-white text-xl">Role:</label>
                <input
                  type="radio"
                  value="admin"
                  onClick={() => {
                    roleRef.current = 'admin';

                    setDisabledDropdown(false);
                  }}
                  className="form-radio accent-yellow "
                  name="role"
                />
                <span class="text-black">Admin</span>
                <input
                  required
                  type="radio"
                  value="user"
                  onClick={() => {
                    roleRef.current = 'user';

                    setDisabledDropdown(true);
                  }}
                  className="form-radio text-white accent-yellow"
                  name="role"
                />

                <span class="text-black">User</span>
              </div>

              <label class="text-white text-xl">Organization:</label>
              <select
                ref={orgRef}
                class="rounded-md bg-gray-800 text-black px-4 py-2 focus:outline-none"
                disabled={disableDropdown}
              >
                {!disableDropdown && (
                  <>
                    <option value="WareHouse">WareHouse</option>
                    <option value="Factory">Factory</option>
                  </>
                )}
                <option value="Store">Store</option>
              </select>
            </>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            class="bg-yellow font-main text-black rounded-md px-4 py-2 font-bold hover:bg-yellow-500 transition-colors"
          >
            {value === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Usercredentials;
