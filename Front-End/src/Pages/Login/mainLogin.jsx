import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import AddData from "../../components/hooks/post";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./../../Redux/users/userThunk";
import { Logout } from "../../components/hooks/logout";
export default function LoginPage() {
  const { handleLogout } = Logout(); 

  useEffect(() => {
    handleLogout(); 
  }, []);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector(
      (state) => state.user
    );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };
  if (isAuthenticated) {
    navigate("/blogs");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
        BlogVerse
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex">
            <button className="w-1/2 py-4 text-sm font-semibold text-purple-600 border-b-2 border-purple-600 transition-colors">
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="w-1/2 py-4 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
            >
              Sign Up
            </button>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Welcome Back!
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center group"
              >
                Login
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            </form>
          </div>
        </div>

        <p className="mt-8 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-purple-600 font-semibold hover:text-purple-700"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
