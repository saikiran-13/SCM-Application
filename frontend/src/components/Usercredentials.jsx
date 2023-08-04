import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Usercredentials = ({ value }) => {
  const navigateTo = useNavigate();
  const [disableDropdown, setDisabledDropdown] = useState(false);
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
            type="text"
            class="rounded-md bg-gray-800 text-black px-4 py-2 focus:outline-none"
          />

          <label class="text-white text-xl">Password:</label>
          <input
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
                    setDisabledDropdown(false);
                  }}
                  class="form-radio bg-orange"
                  name="role"
                />
                <span class="text-black">Admin</span>
                <input
                  type="radio"
                  value="user"
                  onClick={() => {
                    setDisabledDropdown(true);
                  }}
                  class="form-radio text-white"
                  name="role"
                />
                <span class="text-black">User</span>
              </div>

              <label class="text-white text-xl">Organization:</label>
              <select
                class="rounded-md bg-gray-800 text-black px-4 py-2 focus:outline-none"
                disabled={disableDropdown}
              >
                {!disableDropdown && (
                  <>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Factory">Factory</option>
                  </>
                )}
                <option value="Store">Store</option>
              </select>
            </>
          )}
          <button
            type="submit"
            onClick={() => {
              navigateTo('/warehouse');
            }}
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
