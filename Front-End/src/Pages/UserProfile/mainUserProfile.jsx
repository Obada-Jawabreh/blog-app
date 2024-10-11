import React, { useEffect } from "react";
import axios from "axios";
import { Mail, Calendar, Clock, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Redux/users/userThunk";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

const UserProfile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user, posts } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${API_BASE_URL}/posts/${postId}`, {
        withCredentials: true,
      });
      dispatch(fetchUser());
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!user) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-indigo-600 h-32"></div>
          <div className="px-4 py-5 sm:p-6 -mt-16">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {user.fullName}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  User Profile
                </p>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-200 pt-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-indigo-500" />
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-indigo-500" />
                    Joined
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {format(new Date(user.createdAt), "MMMM d, yyyy")}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">
            Your Posts
          </h2>

          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-md rounded-lg p-6 mb-4"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {post.title}
                  </h3>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <p className="text-gray-600 mt-2">{post.content}</p>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>
                    {format(new Date(post.createdAt), "MMMM d, yyyy")}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 mt-4">You don't have any posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
