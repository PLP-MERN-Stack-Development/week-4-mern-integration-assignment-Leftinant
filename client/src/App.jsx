import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostForm from "./pages/PostForm";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import { ToastContainer } from "./components/ToastContainer";
import PostList from "./pages/PostList";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<PostForm />} />
        <Route path='/edit/:id' element={<PostForm />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/explore' element={<PostList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
