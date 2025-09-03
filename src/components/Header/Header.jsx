import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', slug: "/", active: true },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ]

    return (
        <header className='py-3 shadow-md bg-white border-b border-gray-200'>
            <Container>
                <nav className='flex items-center justify-between'>
                    {/* Logo */}
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className='hidden md:flex items-center space-x-2'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink to={item.slug} className={({ isActive }) => `px-4 py-2 duration-200 rounded-lg font-medium ${isActive ? "text-blue-700 bg-blue-50" : "text-gray-700"} hover:bg-gray-200`}>
                                        {item.name}
                                    </NavLink>
                                </li>
                            ) : null
                        )}
                    </ul>

                    {/* Desktop Auth Buttons */}
                    <div className='hidden md:flex items-center space-x-2'>
                        {authStatus ? (
                            <div><LogoutBtn /></div>
                        ) : (
                            <>
                                <Link to="/login"><button className='px-4 py-2 duration-200 rounded-lg font-medium text-gray-700 hover:bg-gray-200'>Log In</button></Link>
                                <Link to="/signup"><button className='px-4 py-2 duration-200 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700'>Sign Up</button></Link>
                            </>
                        )}
                    </div>
                    
                    {/* Mobile Menu Button (Hamburger) */}
                    <div className="md:hidden ml-auto">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
                        </button>
                    </div>
                </nav>
                
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4">
                        <ul className='flex flex-col items-center space-y-4'>
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name} className="w-full">
                                        <NavLink to={item.slug} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block w-full text-center px-4 py-2 duration-200 rounded-lg font-medium ${isActive ? "text-blue-700 bg-blue-50" : "text-gray-700"} hover:bg-gray-200`}>
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ) : null
                            )}
                            <li className='w-full'>
                            {authStatus ? (
                                <div className='text-center'><LogoutBtn /></div>
                            ) : (
                                <div className='flex flex-col space-y-2'>
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}><button className='w-full px-4 py-2 duration-200 rounded-lg font-medium text-gray-700 hover:bg-gray-200'>Log In</button></Link>
                                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}><button className='w-full px-4 py-2 duration-200 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700'>Sign Up</button></Link>
                                </div>
                            )}
                            </li>
                        </ul>
                    </div>
                )}
            </Container>
        </header>
    )
}

export default Header