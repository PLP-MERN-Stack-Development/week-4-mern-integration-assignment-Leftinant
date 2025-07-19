import { useState } from "react";
import Toast from "./Toast";

let toastId = 0;

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = toastId++;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  window.showToast = addToast;

  return (
    <div className='toast toast-top toast-center z-50 fixed top-4 left-1/2 transform -translate-x-1/2 space-y-2'>
      {toasts.map(({ id, message, type }) => (
        <Toast
          key={id}
          message={message}
          type={type}
          onClose={() => removeToast(id)}
        />
      ))}
    </div>
  );
};
