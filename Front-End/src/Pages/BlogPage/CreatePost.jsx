import React, { useState } from "react";

const CreatePost = ({ onCreatePost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreatePost({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl mb-12 p-8">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800">
        Create a New Post
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content..."
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          rows="4"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;