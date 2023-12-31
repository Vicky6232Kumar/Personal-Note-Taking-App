import React from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
    let location = useLocation();
    const navigate = useNavigate()

    const handleLogout = () =>{
        localStorage.removeItem("auth-token")
        navigate("/login")
    }

    React.useEffect(() => {
    }, [location]);
    return (
        <div><nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/'?"active":""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about'?"active":""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem("auth-token")?<div className="d-flex">
                        <Link type="button" className="btn btn-success mx-1" to= "/login">LogIn</Link>
                        <Link type="button" className="btn btn-success" to= "/signin">SignIn</Link>
                    </div> : <button type="button" className="btn btn-success" onClick={handleLogout}>LogOut</button>}
                </div>
            </div>
        </nav></div>
    )
}

export default Navbar