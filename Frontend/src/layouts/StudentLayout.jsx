import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/NavBar/Navbar'

const StudentLayout = () => {
  return (
    <>
        <Navbar/>
        <Outlet />
    </>
  )
}

export default StudentLayout