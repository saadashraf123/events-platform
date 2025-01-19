import React from 'react'
import classes from './Navbar.module.css'
import { logOut } from '../../api'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className={classes["mainWrapper"]}>
            <h1>Events App</h1>
            <div className={classes["navLinks"]}>
                <span onClick={() => navigate("/")}>Home</span>
                <span onClick={() => navigate("/createEvent")}>Create</span>
                <span onClick={logOut}>Logout</span>
            </div>
        </div>
    )
}

export default Navbar