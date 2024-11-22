import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import History from './pages/History'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Medicines from './pages/Medicines';
import MedicineDetails from './pages/MedicineDetails'
import Chatbot from './pages/Chatbot'

const App = () => (
  <div className='mx-4 sm:mx-[10%]'>
    <ToastContainer />
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/doctors' element={<Doctors />} />
      <Route path='/doctors/:speciality' element={<Doctors />} />
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/my-profile' element={<MyProfile />} />
      <Route path='/my-appointments' element={<MyAppointments />} />
      <Route path='/appointment/:docId' element={<Appointment />} />
      <Route path='/history' element={<History />} />
      <Route path='/medicines' element={<Medicines />} />
      <Route path="/medicine/:id" element={<MedicineDetails />} />
      <Route path="/chatbot" element={<Chatbot />} />
    </Routes>
    <Footer />
  </div>
)

export default App