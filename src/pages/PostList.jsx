import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Sidebar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export default function AllPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      console.log("API response:", res.data);
      setPosts(res.data.posts);
    });
  }, []);

  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete a post.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (error) {
      console.error("Delete failed:", error);
      window.showToast("Failed to delete post.", "error");
    }
  };

  return (
    <div className='flex h-screen '>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <NavBar />
        <div className='p-4 overflow-y-auto flex-1'>
          <div className='flex flex-col space-y-4'>
            {posts.map((post) => (
              <Card
                key={post._id}
                postId={post._id}
                postImage={`http://localhost:5000${post.image}`}
                caption={post.content}
                username={post.user?.username || "Unknown"}
                avatarUrl={`https://i.pravatar.cc/150?img=${Math.floor(
                  Math.random() * 70 + 1
                )}`}
                likes={Math.floor(Math.random() * 1000)}
                // commentsCount={comments.length}
                hashtag={post.title}
                onDelete={() => handleDelete(post._id)}
                onEdit={() => navigate(`/edit/${post._id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
