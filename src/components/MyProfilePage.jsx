import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile)); // Agar profil mavjud bo'lsa, uni o'qish
    }
  }, []);

  if (!userProfile) {
    return <p>Loading...</p>; // Profil ma'lumotlari kutilmoqda
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-purple-700">My Profile</h1>

      {/* Orqaga qaytish tugmasi */}
      <button
        onClick={() => navigate(-1)} // Bu kod orqaga qaytishni ta'minlaydi
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
      >
        Go Back
      </button>

      {/* Ism va familiya bo'limi */}
      {userProfile.name && (
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Full Name:</label>
          <p className="text-gray-800">{userProfile.name} {userProfile.surname}</p>
        </div>
      )}

      {/* Email bo'limi */}
      {userProfile.email && (
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Email:</label>
          <p className="text-gray-800 lowercase">{userProfile.email}</p>
        </div>
      )}

      {/* Telefon raqami bo'limi */}
      {userProfile.phone && (
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Phone Number:</label>
          <p className="text-gray-800">{userProfile.phone}</p>
        </div>
      )}

      {/* Manzil bo'limi */}
      {userProfile.address && (
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Address:</label>
          <p className="text-gray-800">{userProfile.address}</p>
        </div>
      )}
    </div>
  );
};

export default MyProfilePage;
