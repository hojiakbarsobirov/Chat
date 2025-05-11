import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MenuModalPage = ({ setMenuModal }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  const name = userProfile?.name || 'User';
  const email = userProfile?.email?.toLowerCase() || 'example@email.com';
  const firstLetter = name.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <section className="bg-black bg-opacity-50 z-50 w-full h-full fixed top-0 left-0 flex justify-start items-center">
      <div className="bg-white w-[80%] max-w-xs h-full p-5 animate-slideInLeft relative shadow-lg transition-transform duration-300">
        <div className="absolute top-4 right-4">
          <img
            onClick={() => setMenuModal(false)}
            className="w-6 cursor-pointer hover:scale-110 transition"
            src="/close-icons.png"
            alt="Close"
          />
        </div>

        <div className="flex flex-col items-center mt-10 mb-6">
          <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold">
            {firstLetter}
          </div>
          <h2 className="mt-2 text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <button className="text-left w-full px-4 py-3 bg-gray-100 rounded hover:bg-purple-100 transition">
            🗨️ Chats
          </button>
          <button className="text-left w-full px-4 py-3 bg-gray-100 rounded hover:bg-purple-100 transition">
            ⚙️ Settings
          </button>
          <button
            onClick={() => {
              setMenuModal(false);
              navigate('/my-profile');
            }}
            className="text-left w-full px-4 py-3 bg-gray-100 rounded hover:bg-purple-100 transition"
          >
            <Link to={'/my-profile'}>
            👤 Profile
            </Link>
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="text-left w-full px-4 py-3 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
          >
            🚪 Log Out
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to log out?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MenuModalPage;
