import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
  }

  const [errors, setErrors] = useState<FormErrors>({});

  return (
    <>
      <div className="h-[100vh] flex items-center justify-center px-5 lg:px-0">
        <div
          className="max-w-screen-lg flex justify-center flex-1 
          bg-gray-100 shadow-lg rounded-lg 
          md:bg-white md:shadow-lg md:rounded-none md:border-2 md:border-teal-500"
        >
          <div className="hidden md:flex flex-1 bg-teal-100 text-center">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/signup.svg')`,
              }}
            ></div>
          </div>

          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex flex-col items-center">
              <div className="text-center">
                <h1 className="font-roboto-condensed text-3xl xl:text-4xl font-extrabold text-teal-600">
                  Sign up
                </h1>
                <p className="text-[16px] font-mukta text-teal-500">
                  Your Career Journey Starts Here!
                </p>
              </div>

              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-teal-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}

                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-teal-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}

                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-teal-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )}

                  <button className="mt-5 tracking-wide font-semibold bg-teal-500 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Sign Up</span>
                  </button>

                  <p className="mt-6 font-mukta text-s text-gray-700 text-center">
                    Already have an account?{" "}
                    <button className="text-teal-500 font-semibold">
                      Sign in
                    </button>
                  </p>

                  <div className="flex justify-center items-center space-x-4">
                    <button className="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg">
                      <img
                        className="w-6 h-6"
                        loading="lazy"
                        src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                        alt="Google"
                      />
                    </button>
                    <button className="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg">
                      <img
                        className="w-6 h-6"
                        loading="lazy"
                        src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                        alt="Facebook"
                      />
                    </button>
                    <button className="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg">
                      <img
                        className="w-6 h-6"
                        loading="lazy"
                        src="https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/"
                        alt="Twitter"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
