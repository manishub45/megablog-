import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import {Container} from '../index'

function Footer() {
    return (
        <footer className="py-10 bg-gray-100 border-t-2 border-gray-200">
            <Container>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    {/* Left Side: Logo and Copyright */}
                    <div className="mb-8 md:mb-0 text-center md:text-left">
                        <div className="mb-4 inline-block">
                            <Logo width="100px" />
                        </div>
                        <p className="text-sm text-gray-500">
                            &copy; Copyright 2023. All Rights Reserved.
                        </p>
                    </div>

                    {/* Right Side: Links */}
                    <div className="flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-8">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
                            <ul>
                                <li className="mb-2"><Link to="/" className="text-gray-600 hover:text-gray-900">Features</Link></li>
                                <li className="mb-2"><Link to="/" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                            <ul>
                                <li className="mb-2"><Link to="/" className="text-gray-600 hover:text-gray-900">Help</Link></li>
                                <li className="mb-2"><Link to="/" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Legals</h3>
                            <ul>
                                <li className="mb-2"><Link to="/" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                                <li className="mb-2"><Link to="/" className="text-gray-600 hover:text-gray-900">Terms & Conditions</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer