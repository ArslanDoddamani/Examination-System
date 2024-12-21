import React, { useState } from 'react'
import BecLogo from './assets/BecLogo.png'
import { Link, useLocation } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const location = useLocation();

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setIsNavOpen(false);
  };

  const getTitle = () => {
    switch (location.pathname) {
      case '':
        return 'Profile';
      case '/semester-details':
        return 'SemesterDetails';
      case '/result':
        return 'Result';
      case '/payment-history':
        return 'Payment History';
      case '/registration':
        return 'Sub Registration';
      default:
        return 'Login';
    }
  };

  const menuItems = [
    { path: '', label: 'Profile' },
    { path: '/semester-details', label: 'SemesterDetails' },
    { path: '/result', label: 'Result' },
    { path: '/payment-history', label: 'Payment history' },
    { path: '/registration', label: 'SubRegistration' },
    { path: '/logout', label: 'Logout' },
  ];

  return (
    <div className='w-full  p-2 py-5'>
        <div className='w-full  flex items-center px-8'>
            <img src={BecLogo} alt="becLogo" className='w-10 md:w-16 lg:w-20' />
            <div className='ml-5'>
                <h1 className='font-semibold text-xs md:text-lg xl:text-xl'>B.V.V SANGHA'S</h1>
                <h1 className='font-semibold text-sm md:text-2xl xl:text-4xl'>BASAVESHWAR ENGINEERING COLLEGE, BAGALKOT-587103</h1>
            </div>
        </div>
        <div className='sm:hidden w-full  mt-4 flex justify-between items-center px-4'>
            <h1>{getTitle()}</h1>
            <button onClick={() => setIsNavOpen(!isNavOpen)} className='text-white'>
                {!isNavOpen ? <FaBars /> : <IoCloseSharp />}
            </button>
        </div>
        
        {isNavOpen && (
                <>
                    <hr />
                    <div className='flex flex-col justify-end items-start px-4 w-full bg-black'>
                        {menuItems.map(({ path, label }) => (
                            <Link 
                                key={path} 
                                to={path} 
                                className={`text-white text-sm ${selectedMenu === path ? 'hidden' : ''}`} 
                                onClick={() => handleMenuClick(path)}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </>
            )}
        <div className='hidden sm:block w-full mt-4'>
            <nav className='flex justify-between items-center px-8 md:px-16 lg:px-24 xl:px-32'>
                {menuItems.map(({ path, label }) => (
                    <Link 
                        key={path} 
                        to={path} 
                        className='text-white text-sm md:text-base lg:text-lg xl:text-xl'
                    >
                        {label}
                    </Link>
                ))}
            </nav>
        </div>
    </div>
  )
}

export default Navbar