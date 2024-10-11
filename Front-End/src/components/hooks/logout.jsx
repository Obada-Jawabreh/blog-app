import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Logout  = () => {
//   const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/user/logout",
        {},
        { withCredentials: true }
      );
    //   navigate("/");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return { handleLogout  };
};
