import React, { useState } from "react";
import axios from "axios";
import { Send, Clock } from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

const Comment = ({ comment, postId, setComments }) => {
  const [replyingTo, setReplyingTo] = useState(false);
  const [newReply, setNewReply] = useState("");

  const toggleReply = () => {
    setReplyingTo(!replyingTo);
  };

  const handleAddReply = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/comment/${postId}/comments/${comment._id}/reply`,
        { content: newReply },
        { withCredentials: true }
      );
      setComments((prevComments) =>
        prevComments.map((c) => {
          if (c._id === comment._id) {
            return {
              ...c,
              replies: [...c.replies, response.data],
            };
          }
          return c;
        })
      );
      setNewReply("");
      setReplyingTo(false);
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <span className="font-medium text-indigo-700">
          {comment.author.fullName}
        </span>
        <div className="flex items-center text-gray-500 text-sm">
          <Clock size={14} className="mr-1" />
          <span>{formatDate(comment.createdAt)}</span>
        </div>
      </div>
      <p className="text-gray-800 mb-4">{comment.content}</p>
      <button
        onClick={toggleReply}
        className="text-indigo-600 hover:text-indigo-800 transition duration-300"
      >
        Reply
      </button>
      {replyingTo && (
        <div className="mt-4 flex">
          <input
            type="text"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Write a reply..."
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={handleAddReply}
            className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition duration-300"
          >
            <Send size={20} />
          </button>
        </div>
      )}
      {comment.replies &&
        comment.replies.map((reply) => (
          <div key={reply._id} className="ml-8 mt-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium text-sm text-indigo-600">
                {reply.author.fullName}
              </span>
              <div className="flex items-center text-gray-500 text-xs">
                <Clock size={12} className="mr-1" />
                <span>{formatDate(reply.createdAt)}</span>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{reply.content}</p>
          </div>
        ))}
    </div>
  );
};

export default Comment;
