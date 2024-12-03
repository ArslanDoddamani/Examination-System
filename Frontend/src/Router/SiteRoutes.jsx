import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Profile from '../components/Profile/Profile'
import NotFound from '../components/NotFound/NotFound'
import Login from '../components/Login/Login'
import SemesterDetails from '../components/SemesterDetails/SemesterDetails'
import Result from '../components/Result/Result'
import PaymentHistory from '../components/PaymentHistory/PaymentHistory'
import Registration from '../components/SubjectRegistration/Registration'

const SiteRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/semester-details' element={<SemesterDetails />}/>
            <Route path='/result' element={<Result />}/>
            <Route path='/payment-history' element={<PaymentHistory />}/>
            <Route path='/registration' element={<Registration />}/>
            <Route path='/registration/:type' element={<Registration />}/>
            


            <Route path='/*' element={<NotFound/>} />
        </Routes>
    </>
  )
}

export default SiteRoutes