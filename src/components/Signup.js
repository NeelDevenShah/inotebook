import React from 'react'

const Signup = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Enter your email address to register:</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Enter your new password: </label>
    <input type="password" className="form-control" id="pass1"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Re-Enter your new password: </label>
    <input type="password" className="form-control" id="pass2"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup