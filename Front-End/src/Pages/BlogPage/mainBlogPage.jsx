import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Layout/Navbar";
import Post from "./Posts";
import CreatePost from "./CreatePost";
import { PlusCircle } from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/get`, {
        withCredentials: true,
      });
      const postsWithComments = response.data.map((post) => ({
        ...post,
        comments: Array.isArray(post.comments) ? post.comments : [],
      }));
      setPosts(postsWithComments);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleCreatePost = async (newPost) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts/add`, newPost, {
        withCredentials: true,
      });
      console.log(response.data);

      setPosts([response.data, ...posts]);
      setShowCreatePost(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen font-sans">
      <Navbar />
      <main className="container mx-auto mt-12 p-6">
        <button
          onClick={() => setShowCreatePost(!showCreatePost)}
          className="mb-8 bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300 shadow-md flex items-center"
        >
          <PlusCircle size={24} className="mr-2" />
          {showCreatePost ? "Cancel" : "Create New Post"}
        </button>
        {showCreatePost && <CreatePost onCreatePost={handleCreatePost} />}
        {Array.isArray(posts) &&
          posts.map((post) => (
            <Post key={post._id} post={post} setPosts={setPosts} />
          ))}
      </main>
    </div>
  );
};

export default BlogPage;
