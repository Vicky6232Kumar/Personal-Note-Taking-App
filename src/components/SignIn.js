
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    const [credential, setcredential] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
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
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" name="name" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>

                </div>
                <div className="mb-3">

                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}

export default SignIn