import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className='navbar bg-base-100 shadow-sm'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>BlogApp</a>
      </div>
      <label className='input md:w-300 w-full mx-5 rounded-md bg-base-300'>
        <svg
          className='h-[1em] opacity-50'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <g
            strokeLinejoin='round'
            strokeLinecap='round'
            strokeWidth='2.5'
            fill='none'
            stroke='currentColor'
          >
            <circle cx='11' cy='11' r='8'></circle>
            <path d='m21 21-4.3-4.3'></path>
          </g>
        </svg>
        <input type='search' className='grow' placeholder='Search' />
      </label>

      {!user ? (
        <>
          <a onClick={() => document.getElementById("my_modal_3").showModal()}>
            <button className='btn btn-neutral mx-3'>Login</button>
          </a>
          <Login />
        </>
      ) : (
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'
          >
            <div className='w-10 rounded-full'>
              <img
                alt='User avatar'
                src={
                  user.avatar ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
          >
            <li>
              <a className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");

                  window.location.reload();
                  navigate("/");
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;
