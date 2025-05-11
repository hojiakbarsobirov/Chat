import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../AxiosInstance';

const ProfileForm = () => {
  const nameRef = useRef('');
  const surnameRef = useRef('');
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = () => {
    const name = nameRef.current.value.trim();
    const surname = surnameRef.current.value.trim();
    setIsDisabled(!(name && surname));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
    };

    try {
      const response = await AxiosInstance.post('newProfile', formData);
      console.log('Profile posted:', response.data);

      localStorage.setItem('userProfile', JSON.stringify(formData));
      navigate('/next-form-page');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <section className="bg-gray-50 w-full h-screen flex justify-center items-center">
      <div className="bg-white w-[300px] h-[45vh] rounded-md shadow-md flex justify-center items-center flex-col py-2">
        <em className="font-medium text-xl">My Profile</em>

        <form
          onSubmit={onSubmit}
          className="w-full h-full flex justify-around items-start flex-col px-2 py-2 space-y-4"
        >
          <input
            ref={nameRef}
            onChange={handleInputChange}
            className="w-full h-10 pl-4 border rounded-md"
            type="text"
            placeholder="Name"
          />
          <input
            ref={surnameRef}
            onChange={handleInputChange}
            className="w-full h-10 pl-4 border rounded-md"
            type="text"
            placeholder="Surname"
          />

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full h-10 text-white font-medium rounded-md transition ${
              isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProfileForm;
