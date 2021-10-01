import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import logo from '../Navbar/big-logo.png'

const Navbar = () => {

    const [active, setActive] = useState(false)

    const showBar = () => {
        // console.log(window.scrollY)
        if (window.scrollY > 175) {
            setActive(true)
        } else {
            setActive(false)
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', () => showBar())
        return (document.removeEventListener('scroll', () => showBar()))
    }, [])

 return (
     <div className={`${active ? `navbar active` : `navbar`}`}>
         <div className="container">
            <img src={logo} className='logo' alt="" />
         </div>
     </div>
 )
}

export default Navbar