import React, { useEffect, useState, useRef } from 'react';  // Bu yerda useState va useEffect import qilinadi
import AxiosInstance from '../AxiosInstance';
import MenuModalPage from './MenuModalPage';
import { Link } from 'react-router-dom';


const ChatPage = () => {
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  const firstLetter = userProfile?.name?.charAt(0).toUpperCase() || 'U';

  // Modal state
  const [menuModal, setMenuModal] = useState(false);

  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const chatRef = useRef(null);

  const getData = async () => {
    try {
      const response = await AxiosInstance.get('chat');
      setData(response.data);
    } catch (err) {
      alert('Error loading chats!');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const postData = async (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    try {
      // Send the user's name along with the chat message
      await AxiosInstance.post('chat', { chat: trimmedMessage, userName: userProfile.name });
      setMessage('');
      getData();
    } catch (err) {
      alert('Error sending message!');
    }
  };

  return (
    <section className="bg-gray-100 w-full min-h-screen relative">
      {/* Menu Modal */}
      {menuModal && (
        <MenuModalPage onClose={() => setMenuModal(false)} setMenuModal={setMenuModal} />
      )}

      <nav className="w-full h-20 flex justify-between items-center px-4 bg-white shadow-md">
        <img
          onClick={() => setMenuModal(true)}
          className="w-7 cursor-pointer"
          src="/hamburger.png"
          alt="menu"
        />
        <Link to={'/my-profile'}>
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
            {firstLetter}
          </div>
        </Link>
      </nav>

      <div className="w-full py-6 flex justify-center items-start px-2">
        <div className="w-full max-w-3xl h-[80vh] flex flex-col space-y-2">
          <div className="bg-white w-full h-[80%] rounded-lg shadow-inner overflow-y-scroll p-4 space-y-2">
            <div className="w-full h-14 flex justify-center items-center">
              <em className="font-medium text-lg">Chatly 👋🏻</em>
            </div>

            <div className="w-full h-full flex flex-col justify-start items-end gap-4">
              {data.map((item, index) => {
                // Check if userName exists, then get first letter
                const userFirstLetter = item.userName ? item.userName.charAt(0).toUpperCase() : '';

                return (
                  <div key={index} className="flex items-center space-x-3">
                    {/* Display message */}
                    <div className={`px-4 py-2 rounded-xl ${item.userName === userProfile.name ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>
                      <p>{item.chat}</p>
                    </div>
                    {/* Display user's first letter */}
                    <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                      {userFirstLetter}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={postData} className="w-full flex items-center">
            <div className="relative w-full">
              <input
                ref={chatRef}
                type="text"
                placeholder="Type a message..."
                className="w-full h-14 pl-14 pr-14 rounded-full border border-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button type="button" className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <img className="w-6" src="/videocam.png" alt="Video" />
              </button>

              <button
                type="submit"
                disabled={!message.trim()}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 disabled:opacity-40"
              >
                <img className="w-6" src="/send-icons.png" alt="Send" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
