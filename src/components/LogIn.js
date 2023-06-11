import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function LogIn() {

    const [credential, setcredential] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('auth-token', json.authToken)
            navigate('/')
        }
        else {
            alert("Invalid Credential")
        }
    }

    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credential.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}

export default LogIn