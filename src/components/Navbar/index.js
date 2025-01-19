import React from 'react'
import classes from './Navbar.module.css'
import { logOut } from '../../api'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const logoutHandler = () => {
        logOut()
        dispatch(logout())
    }
    return (
        <div className={classes["mainWrapper"]}>
            <h1>Events App</h1>
            <div className={classes["navLinks"]}>
                <span onClick={() => navigate("/")}>Home</span>
                <span onClick={() => navigate("/createEvent")}>Create</span>
                <span onClick={logoutHandler}>Logout</span>
            </div>
        </div>
    )
}

export default Navbar