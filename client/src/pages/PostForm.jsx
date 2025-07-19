import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/SideBar";
import { Upload } from "lucide-react";
import NavBar from "../components/NavBar";

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/posts/${id}`).then((res) => {
        setPost(res.data);
        if (res.data.image) {
          setPreview(`http://localhost:5000${res.data.image}`);
        }
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting...");

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    if (file) formData.append("image", file); // the field name must match the backend: 'image'

    try {
      if (id) {
        await axios.put(`/api/posts/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post("/api/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // ✅ REQUIRED
          },
        });
      }
      console.log(
        "Form Data being submitted:",
        formData.get("title"),
        formData.get("content"),
        formData.get("image")
      );
      window.showToast("Post created", "success");

      navigate("/explore");
    } catch (err) {
      console.error("Failed to submit post:", err);
      window.showToast("Failed to create post", "error");
    }
  };

  return (
    <div className='flex h-screen '>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <NavBar />
        <div className='p-4 overflow-y-auto flex-1'>
          <h2 className='text-2xl font-semibold mb-4 ml-3'>Create Post</h2>
          <form
            onSubmit={handleSubmit}
            className='max-w-4xl mx-auto p-6 w-full justify-items-center'
          >
            {/* Upload Area */}
            <div className='w-full md:w-1/2 bg-base-300 border-dashed border-2 border-gray-300 rounded-2xl h-80 flex items-center justify-center flex-col text-gray-500 text-sm relative'>
              {file || post.image ? (
                <div className='relative w-auto h-full'>
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : `http://localhost:5000${post.image}`
                    }
                    alt='Preview'
                    className='object-center w-full h-full rounded-2xl'
                  />
                  {/* Close button */}
                  <button
                    type='button'
                    onClick={() => {
                      setFile(null);
                      setPost((prev) => ({ ...prev, image: "" }));
                    }}
                    className='absolute top-2 right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600'
                    title='Remove image'
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label
                  htmlFor='fileUpload'
                  className='cursor-pointer flex flex-col items-center'
                >
                  <Upload className='w-6 h-6 mb-2' />
                  <span>Choose a file or drag and drop it here</span>
                  <p className='absolute bottom-4 text-xs text-center w-full text-gray-400 px-4'>
                    We recommend using high-quality .jpg files less than 20MB or
                    .mp4 files less than 200MB.
                  </p>
                  <input
                    key={Date.now()} // 👈 FORCE input re-render each time it's removed
                    id='fileUpload'
                    type='file'
                    accept='image/*,video/mp4'
                    onChange={handleFileChange}
                    className='hidden'
                  />
                </label>
              )}
            </div>

            {/* Caption */}
            <textarea
              name='content'
              value={post.content}
              onChange={handleChange}
              placeholder='Say something about this...'
              rows={4}
              className='my-6 w-full border border-gray-300 p-3 rounded-2xl outline-none text-sm'
            />

            {/* Title */}
            <input
              name='title'
              value={post.title}
              onChange={handleChange}
              type='text'
              placeholder='hashtag'
              className='mb-6 w-full border border-gray-300 p-3 rounded-2xl  outline-none text-sm '
            />

            {/* Submit */}
            <button
              type='submit'
              className=' py-2 bg-black text-white px-6 rounded-xl cursor-pointer'
            >
              {id ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
