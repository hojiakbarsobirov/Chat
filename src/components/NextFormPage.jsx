import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AxiosInstance from '../AxiosInstance'

const NextFormPage = () => {
  const addressRef = useRef('')
  const phoneRef = useRef('')

  const [phone, setPhone] = useState('+998 ') // oraliq qo'shildi
  const [isDisabled, setIsDisabled] = useState(true)

  const navigate = useNavigate()

  const handleInputChange = () => {
    const address = addressRef.current.value.trim()
    const validPhone = phone.trim().length > 5 // +998 bilan oraliq hisobga olinadi
    setIsDisabled(!(address && validPhone))
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value
    // Faqat +998 bilan boshlanadigan qiymatni qabul qilamiz
    if (value.startsWith('+998')) {
      setPhone(value)
      handleInputChange()
    }
  }

  const handleFinish = async () => {
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'))

    if (!storedProfile) {
      alert('User info not found! Please complete the profile first.')
      return
    }

    const fullProfile = {
      ...storedProfile,
      address: addressRef.current.value,
      phone: phone
    }

    try {
      const response = await AxiosInstance.post('newProfile', fullProfile)
      console.log('Full profile posted:', response.data)

      navigate('/chat')
    } catch (error) {
      console.error('Error posting full profile:', error)
    }
  }

  return (
    <section className='bg-gray-50 min-h-screen w-full flex justify-center items-center px-4'>
      <div className='bg-white w-full max-w-md min-h-[60vh] rounded-md shadow-md flex justify-around items-center flex-col px-4 py-6 space-y-4'>
        <input
          ref={addressRef}
          onChange={handleInputChange}
          className='border rounded-md w-full h-10 pl-4'
          type='text'
          placeholder='Address'
        />
        <input
          value={phone}
          onChange={handlePhoneChange}
          ref={phoneRef}
          className='border rounded-md w-full h-10 pl-4'
          type='tel'
          placeholder='+998 XX XXX XX XX'
        />

        <button
          onClick={handleFinish}
          disabled={isDisabled}
          className={`w-full h-10 text-white font-medium rounded-md transition ${
            isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Finish
        </button>
      </div>
    </section>
  )
}

export default NextFormPage
