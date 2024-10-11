import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPages from "./Pages/Login/mainLogin";
import SignUp from "./Pages/SignUp/mainSignUp";
import BlogPage from "./Pages/BlogPage/mainBlogPage";
import UserProfile from "./Pages/UserProfile/mainUserProfile";
import Error404 from "./Pages/Error404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPages />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Blogs" element={<BlogPage />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
