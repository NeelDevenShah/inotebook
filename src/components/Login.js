import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Context from '../Context';

const Login = () => {
    
    const context=useContext(Context);
    const {showAlert}=context;

    const [credentials, setCredentials]=useState({email:"", password:""})
    let navigate=useNavigate();

    const handleSubmit=async(event)=>{
        try{
            event.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json=await response.json();
          console.log(json);
          if(json.success){
            //The following auth code will be stored in the local machine's browser
            localStorage.setItem('token', json.authtoken);
            navigate("/")
            showAlert("Login Successful","success");
        }
          else{
            event.preventDefault();
            showAlert("The invalid credentials entered", "danger")
          }
        }
        catch(error){
            event.preventDefault();
            showAlert("The invalid credentials entered", "danger")
        }
    }
    
    const onChange=(event)=>{
        setCredentials({...credentials, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Enter your Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" aria-describedby="emailHelp" name='email' onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Enter your password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-secondary">Submit</button>
            </form>
        </div>
    )
}

export default Login
