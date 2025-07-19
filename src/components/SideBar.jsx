import { Home, Compass, Plus, Bell, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className='h-screen w-10 md:w-16 bg-base-200 flex flex-col items-center py-6 space-y-8'>
      <Link to='/'>
        <Home className='w-6 h-6 text-base-content hover:text-primary cursor-pointer' />
      </Link>

      {isLoggedIn && (
        <>
          <Link to='/explore'>
            <Compass className='w-6 h-6 text-base-content hover:text-primary cursor-pointer' />
          </Link>
          <Link to='/new'>
            <Plus className='w-6 h-6 text-base-content hover:text-primary cursor-pointer' />
          </Link>
          <Bell className='w-6 h-6 text-base-content hover:text-primary cursor-pointer' />
          <MessageCircle className='w-6 h-6 text-base-content hover:text-primary cursor-pointer' />
        </>
      )}
    </div>
  );
}
