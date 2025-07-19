import { useEffect, useState } from "react";
import axios from "axios";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };

    if (postId) fetchComments();
  }, [postId]);

  return (
    <div className='mx-6 my-3 max-w-100'>
      <div>
        <h4 className='font-semibold mb-2'>Comments</h4>
      </div>
      <div className='mt-4 space-y-4'>
        {comments.map((comment) => (
          <div key={comment._id} className='flex gap-2 '>
            <div className='w-8 h-8  flex-shrink-0'>
              <img
                src={`https://i.pravatar.cc/150?img=${Math.floor(
                  Math.random() * 70 + 1
                )}`}
                alt='avatar'
                className='rounded-full'
              />
            </div>
            <div className='bg-base-300 rounded-4xl p-3 w-full'>
              <p className='text-sm font-bold'>
                {comment.author?.username || "Unknown"}
              </p>
              <p className='text-sm text-base-800'>{comment.text}</p>
              <div className='text-xs text-gray-500 mt-1'>
                {new Date(comment.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
