import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logout } from "../hooks/logout";
import { fetchUser } from "../../Redux/users/userThunk";
import { Home, BookOpen, User, LogOut } from "lucide-react";

const Navbar = () => {
  const { handleLogout } = Logout();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  console.log(user);
  
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);




  const clickLogout = async () => {
    await handleLogout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer">
            <h1 className="text-2xl font-bold tracking-tight">BlogHub</h1>
          </div>
          
          <div className="flex space-x-4">
 
            <NavButton 
              icon={<BookOpen size={20} />}
              text="Blogs"
              onClick={() => navigate("/blogs")}
            />
            {isAuthenticated && (
              <NavButton 
                icon={<User size={20} />}
                text="Profile"
                onClick={() => navigate("/UserProfile")}
              />
            )}
          </div>

          <div className="flex-shrink-0">
            {loading ? (
              <div className="animate-pulse bg-indigo-500 rounded-full h-8 w-20"></div>
            ) : isAuthenticated ? (
              <button
                onClick={clickLogout}
                className="flex items-center px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 transition duration-300 text-sm font-medium"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/")}
                className="flex items-center px-4 py-2 rounded-full bg-white text-indigo-600 hover:bg-indigo-100 transition duration-300 text-sm font-medium"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavButton = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-500 transition duration-300 text-sm font-medium"
  >
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);

export default Navbar;