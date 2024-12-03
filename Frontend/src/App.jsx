import React from 'react'
import Navbar from './components/NavBar/Navbar'
import SiteRoutes from './Router/SiteRoutes'

const App = () => {
  return (
    <>
      <Navbar />
      <hr />
      <SiteRoutes/>
    </>
  )
}

export default App