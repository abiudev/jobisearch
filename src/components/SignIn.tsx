import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../store/slices/authSlice";
import { AppDispatch, RootState } from "../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await dispatch(signin({ email, password })).unwrap();
      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err: any) {
      toast.error(err || "Login failed");
    }
  };

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
                  Sign in
                </h1>
                <p className="text-[16px] font-mukta text-teal-500">
                  Welcome back! Continue your journey
                </p>
              </div>

              <div className="w-full flex-1 mt-8">
                <form onSubmit={handleSubmit} className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-teal-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />

                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-teal-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />

                  <button 
                    type="submit"
                    disabled={loading}
                    className="mt-5 tracking-wide font-semibold bg-teal-500 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    <span className="ml-3">{loading ? "Signing in..." : "Sign In"}</span>
                  </button>

                  <p className="mt-6 font-mukta text-s text-gray-700 text-center">
                    Don't have an account?{" "}
                    <button 
                      type="button"
                      onClick={() => navigate("/signup")}
                      className="text-teal-500 font-semibold"
                    >
                      Sign up
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
