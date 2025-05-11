import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import ProfileForm from './components/ProfileForm'
import AxiosInstance from './AxiosInstance'
import NextFormPage from './components/NextFormPage'
import ChatPage from './components/ChatPage'
import MyProfilePage from './components/MyProfilePage'

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  },[])

  const fetchData = async() => {
    const response = await AxiosInstance.get('newProfile')
    setData(response.data)
  }

  console.log(data)


  return (
    <>
    <Routes>
      <Route path='/' element={<ProfileForm/>}/>
      <Route path='/next-form-page' element={<NextFormPage/>}/>
      <Route path='/chat' element={<ChatPage/>}/>
      <Route path='/my-profile' element={<MyProfilePage/>}/>
    </Routes>
    </>
  )
}

export default App
