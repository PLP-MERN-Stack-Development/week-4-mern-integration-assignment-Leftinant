import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      navigate("/");
      window.location.reload();

      window.showToast("Login successful!", "success");
      document.getElementById("my_modal_3").close();
    } catch (err) {
      console.error("Login error:", err);
      window.showToast(err.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div>
      <dialog id='my_modal_3' className='modal'>
        <div className='modal-box md:w-110 md:px-20 w-auto px-10 mx-10 rounded-3xl'>
          <form onSubmit={handleSubmit}>
            <button
              type='button'
              className='px-2 absolute text-xl text-gray-500 right-2 top-2 cursor-pointer hover:text-black'
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>
            <div className='w-full justify-items-center'>
              <h2 className='font-bold mb-5 text-2xl'>Login to your account</h2>
            </div>

            <div className='flex flex-col gap-6'>
              <div className='grid'>
                <label htmlFor='email'>Email</label>
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

              <div className='grid'>
                <div className='flex'>
                  <label htmlFor='password'>Password</label>
                  <a
                    href='#'
                    className='ml-auto inline-block font-semibold text-sm underline-offset-4 hover:underline text-blue-700'
                  >
                    Forgot your password?
                  </a>
                </div>
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
              </div>
            </div>

            <button
              type='submit'
              className='w-full bg-black text-white rounded-xl py-2 cursor-pointer font-semibold hover:bg-blue-800 duration-500'
            >
              Login
            </button>
          </form>

          <div className='w-full text-center text-sm font-bold my-2'>OR</div>
          <button className='w-full outline rounded-md py-2 cursor-pointer'>
            Login with Google
          </button>
          <div className='w-full text-center text-sm mt-2'>
            <a href='/register' className='cursor-pointer font-semibold'>
              Don't have an Account? Sign Up
            </a>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
