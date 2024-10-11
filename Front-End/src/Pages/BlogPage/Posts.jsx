import React, { useState ,useEffect} from "react";
import axios from "axios";
import {
  Heart,
  MessageCircle,
  ThumbsUp,
  Laugh,
  ChevronDown,
  ChevronUp,
  Send,
  Clock,
  Calendar,
} from "lucide-react";
import Comment from "./CommentSection";

const API_BASE_URL = "http://localhost:5000/api";

const Post = ({ post, setPosts }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/comment/posts/${post._id}/comments`, {
        withCredentials: true,
      });
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  };

  const formattedDateTime = post.createdAt ? formatDate(post.createdAt) : null;

  const handleReaction = async (postId, reactionType) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/posts/${postId}`,
        { type: reactionType },
        { withCredentials: true }
      );
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === postId ? response.data : p))
      );
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/comment/${post._id}/comments`,
        { content: newComment },
        { withCredentials: true }
      );
      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl mb-12 overflow-hidden transform hover:scale-102 transition duration-300">
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-bold text-indigo-800">
            {post.title}
          </h2>
          {formattedDateTime && (
            <div className="flex flex-col items-end text-gray-600">
              <div className="flex items-center mb-1">
                <Clock size={16} className="mr-1" />
                <span className="text-sm font-medium">{formattedDateTime.time}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span className="text-sm">{formattedDateTime.date}</span>
              </div>
            </div>
          )}
        </div>
        <p className="bg-blue-100 text-blue-800 font-semibold py-2 px-4 rounded-2xl inline-block shadow-md mb-4">
          By {post.author.fullName}
        </p>
        <p className="text-gray-800 mb-6 leading-relaxed">{post.content}</p>
        <div className="flex items-center space-x-6">
          <button
            onClick={() => handleReaction(post._id, "like")}
            className={`flex items-center text-gray-600 hover:text-blue-500 transition duration-300 ${
              post.userReaction === "like" ? "text-[#1965FA]" : ""
            }`}
          >
            <ThumbsUp size={24} className="mr-2" />
            {post.reactions.filter((r) => r.type === "like").length}
          </button>
          <button
            onClick={() => handleReaction(post._id, "love")}
            className={`flex items-center text-gray-600 hover:text-red-500 transition duration-300 ${
              post.userReaction === "love" ? "text-red-500" : ""
            }`}
          >
            <Heart size={24} className="mr-2" />
            {post.reactions.filter((r) => r.type === "love").length}
          </button>
          <button
            onClick={() => handleReaction(post._id, "laugh")}
            className={`flex items-center text-gray-600 hover:text-yellow-500 transition duration-300 ${
              post.userReaction === "laugh" ? "text-yellow-500" : ""
            }`}
          >
            <Laugh size={24} className="mr-2" />
            {post.reactions.filter((r) => r.type === "laugh").length}
          </button>
          <button
            onClick={toggleComments}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-300"
          >
            <MessageCircle size={24} className="mr-2" />
            {showComments ? "Hide Comments" : "Show Comments"}
            {showComments ? (
              <ChevronUp size={20} className="ml-1" />
            ) : (
              <ChevronDown size={20} className="ml-1" />
            )}
          </button>
        </div>
      </div>
      {showComments && (
        <div className="bg-indigo-50 p-8">
          <h3 className="text-2xl font-semibold mb-6 text-indigo-800">
            Comments
          </h3>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              postId={post._id}
              setComments={setComments}
            />
          ))}
          <div className="mt-6">
            <textarea
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              rows="3"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              onClick={handleAddComment}
              className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md flex items-center justify-center"
            >
              <Send size={20} className="mr-2" />
              Post Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;