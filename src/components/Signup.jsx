import { useState } from "react";
import Login from "./Login";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      window.showToast("Passwords do not match!", "info");
      return;
    }

    try {
      const res = await axios.post("/api/auth/register", {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      console.log("Registration successful");
      window.showToast("Account created!", "success");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      document.getElementById("my_modal_3").showModal();
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error);
      window.showToast("Something went wrong", "error");
    }
  };

  return (
    <>
      <div className='max-w-screen-2xl container mx-auto  fixed top-0 left-0 right-0 z-99'>
        <div className='navbar shadow-sm '>
          <div className='navbar-start'>
            <Link to='/'>
              <Home className='w-6 h-6 text-base-content hover:text-primary cursor-pointer mx-3' />
            </Link>
          </div>
        </div>
      </div>
      <div className=' flex h-screen items-center justify-center'>
        <div className='max-w-md  mx-auto p-6 rounded-xl shadow-md'>
          <div className='relative'>
            <h2 className='text-2xl font-bold mb-4'>Create an Account</h2>
            <span className='absolute font-bold top-0 right-0 text-'>
              or{" "}
              <a
                className='text-blue-700 cursor-pointer'
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Login
              </a>
            </span>
            <Login />
          </div>
          <div className='mx-10'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='form-control'>
                <label className='text-sm'>Name</label>

                <label className='input validator rounded-2xl'>
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
                      <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'></path>
                      <circle cx='12' cy='7' r='4'></circle>
                    </g>
                  </svg>
                  <input
                    type='text'
                    name='name'
                    required
                    placeholder='Username'
                    pattern='[A-Za-z][A-Za-z0-9\-]*'
                    minlength='3'
                    maxlength='30'
                    title='Only letters, numbers or dash'
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className='form-control'>
                <label className='text-sm'>Email</label>

                <label className='input validator rounded-2xl'>
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
                      <rect width='20' height='16' x='2' y='4' rx='2'></rect>
                      <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'></path>
                    </g>
                  </svg>
                  <input
                    type='email'
                    name='email'
                    placeholder='mail@site.com'
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className='form-control'>
                <label className='text-sm'>Password</label>
                <label className='input validator rounded-2xl'>
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
                      <path d='M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z'></path>
                      <circle
                        cx='16.5'
                        cy='7.5'
                        r='.5'
                        fill='currentColor'
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type='password'
                    name='password'
                    required
                    placeholder='Password'
                    minLength='8'
                    pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                    title='Must be more than 8 characters, including number, lowercase letter, uppercase letter'
                    value={formData.password}
                    onChange={handleChange}
                  />
                </label>
                <p className='w-full text-xs pl-2 pt-2 text-gray-700'>
                  8 or more characters, including numbers, lower and uppercase
                  letters
                </p>
              </div>

              <div className='form-control'>
                <label className='text-sm'>Confirm Password</label>
                <label className='input validator rounded-2xl mb-5'>
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
                      <path d='M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z'></path>
                      <circle
                        cx='16.5'
                        cy='7.5'
                        r='.5'
                        fill='currentColor'
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type='password'
                    name='confirmPassword'
                    required
                    placeholder='Confirm'
                    minLength='8'
                    pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                    title='Must be more than 8 characters, including number, lowercase letter, uppercase letter'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className='form-control'>
                <button
                  type='submit'
                  className=' w-full rounded-2xl bg-black hover:bg-blue-800 duration-500 text-white py-2 font-bold mt-2'
                >
                  Sign Up
                </button>
              </div>
              <div className='w-full text-center'>
                <p className='text-xs text-gray-700'>
                  By continuing, you agree to our{" "}
                  <span className='underline cursor-pointer'>
                    Terms and conditions
                  </span>{" "}
                  and acknowledge you've read our{" "}
                  <span className='underline cursor-pointer'>
                    Privacy Policy
                  </span>{" "}
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
