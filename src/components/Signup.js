import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../Context'
const Signup = () => {


  const [credentials, setCredentials] = useState({ name: "aa", email: "", password: "", password1: "" })
  const context=useContext(Context)
  const {showAlert}=context
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (credentials.password === credentials.password1) {
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      console.log(json);
      if (json.success === true) {
        localStorage.setItem('token', json.authtoken);
        navigate("/")
        showAlert("Sign Up Successful","success")
      }
      else {
        showAlert("The entered email already exists, Goto login or enter another email","danger");
        event.preventDefault();
      }
    }
    else {
      showAlert("Please re-check both the password, One of them is in-correct","danger");
      event.preventDefault();
    }
  }
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Enter your name to register:</label>
          <input type="text" className="form-control" id="name" placeholder='Minimum 3 characters' onChange={onChange} name="name" required minLength={3} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Enter your email address to register:</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} placeholder='Enter an valid email' name="email" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Enter your new password: </label>
          <input type="password" className="form-control" id="pass1" onChange={onChange} placeholder='Enter an secure password' name="password" required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Re-Enter your new password: </label>
          <input type="password" className="form-control" onChange={onChange} id="pass2" placeholder='Enter your password same as that of the first one' name="password1" required minLength={5} />
        </div>
        <button type="submit" className="btn btn-secondary">Submit</button>
      </form>
    </div>
  )
}

export default Signup