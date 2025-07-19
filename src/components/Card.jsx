import { useState, useEffect } from "react";
import axios from "axios";
import CommentSection from "./commentSection";

import {
  FaHeart,
  FaRegComment,
  FaPaperPlane,
  FaBookmark,
  FaEllipsisH,
} from "react-icons/fa";

export default function Card({
  avatarUrl,
  username,
  postImage,
  likes,
  caption,
  hashtag,
  onEdit,
  onDelete,
  postId,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => setShowOptions((prev) => !prev);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUsername = currentUser?.username;
  const isOwner = loggedInUsername === username;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (showComments && postId) {
          const res = await axios.get(`/api/comments/${postId}`);
          setComments(res.data);
        }
      } catch (err) {
        console.error("Failed to load comments:", err);
      }
    };
    fetchComments();
  }, [showComments, postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        `/api/comments/${postId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([...comments, res.data]);
      setText("");
    } catch (err) {
      console.error("Failed to post comment", err);
      window.showToast("Failed to post comment", "error");
    }
  };

  return (
    <div className='w-80 md:w-300 mx-auto rounded-xl shadow-md overflow-hidden border'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-2'>
        <div className='flex items-center space-x-2'>
          <img
            src={avatarUrl || "https://i.pravatar.cc/40"}
            alt='avatar'
            className='w-8 h-8 rounded-full'
          />
          <span className='font-semibold text-sm'>
            {username || "User Name"}
          </span>
        </div>
        {isOwner && (
          <div className='relative'>
            <FaEllipsisH
              className='text-gray-500 cursor-pointer'
              onClick={toggleOptions}
            />
            {showOptions && (
              <div className='absolute right-0 mt-2 w-40 bg-base-100 rounded shadow-md z-10'>
                <button
                  onClick={() => {
                    toggleOptions();
                    onEdit?.();
                  }}
                  className='block w-full text-left pr-10 pl-4 py-4 hover:bg-gray-200 hover:text-black text-sm text-base-900 cursor-pointer'
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    toggleOptions();
                    onDelete?.();
                  }}
                  className='block w-full text-left pr-10 pl-4 py-4 hover:bg-gray-200 text-sm text-red-600 cursor-pointer'
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Image */}
      <div className='h-auto w-full'>
        {postImage ? (
          <img
            src={postImage}
            alt='Post'
            className='w-full h-auto object-cover'
          />
        ) : (
          <div className='w-full h-auto  grid place-items-center text-gray-400'>
            Image
          </div>
        )}
      </div>

      {/* Actions */}
      <div className='flex items-center justify-between px-4 pt-2'>
        <div className='flex space-x-4 text-xl text-gray-700'>
          <FaHeart className='text-red-500 cursor-pointer' />
          <FaRegComment className='cursor-pointer' />
          <FaPaperPlane className='cursor-pointer' />
        </div>
        <FaBookmark className='cursor-pointer text-xl' />
      </div>

      {/* Likes */}
      {likes && (
        <div className='px-4 py-1 text-sm font-semibold'>{likes} likes</div>
      )}

      {/* Caption */}
      {caption && (
        <div className='px-4 text-sm'>
          <span className='font-semibold'>{username || "User"}</span>{" "}
          <span className='text-gray-700'>
            {caption}{" "}
            {hashtag && <span className='text-blue-600'>{hashtag}</span>}
          </span>
        </div>
      )}

      {/* Comments */}
      <form onSubmit={handleSubmit} className='flex gap-2 mt-3 mx-5'>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Add a comment...'
          className='flex-1 p-2 border rounded-3xl text-sm bg-base-300'
        />
        <button
          type='submit'
          className='btn btn-dash btn-success  rounded-lg px-3'
        >
          Send
        </button>
      </form>
      <p
        className='text-blue-600 cursor-pointer text-sm hover:underline mx-5 my-3'
        onClick={() => setShowComments((prev) => !prev)}
      >
        {showComments
          ? "Hide comments"
          : `View all ${comments.length} comments`}
      </p>

      {showComments && <CommentSection postId={postId} />}
    </div>
  );
}
