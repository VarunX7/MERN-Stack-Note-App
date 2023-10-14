import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [creds, setCreds] = useState({ name: "", email: "", password: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
            const response = await fetch(`http://localhost:8000/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(creds)
            })

            const data = await response.json()
            console.log(data)
            if (data.success) {
                localStorage.setItem('token', data.token)
                navigate("/")
            }
            else {
                alert(data.message)
            }
    }

    const handleChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <div className="w-50 p-5 mt-5 m-auto border rounded" >
                <h2 className='text-center'>Log In</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleChange} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
