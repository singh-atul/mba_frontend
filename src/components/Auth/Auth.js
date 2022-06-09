import React, { useEffect, useState } from "react";
import './Auth.css';
import {signIn,signUp} from '../../api/auth'
const Auth = () => {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showSignup, setShowSignup] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false)
    const [authMessage, setAuthMessage] = useState('');
  
    const signinHandler = async () => {

        setAuthMessage('');
        if (!username || !password) {
    
          setAuthMessage('Username and Password are required!!');
          return;
        }
    
        const user = { username, password }
    
        try {
          const response = await signIn(user);
          console.log(response);
          clearState();
          // navigate("/")
    
        } catch (error) {
    
          const { message } = error.response.data;
          setAuthMessage(message)
        }
      }


    const signupHandler = async () => {

        if (!username || !password || !email) {
    
          setAuthMessage('Username, Password, Email are required!!');
          return;
    
        }
        const user = { username, password, email }
    
        try {
    
    
          const response = await signUp(user);
          setAuthMessage(response.data.message);
          clearState();
          setSignupSuccess(true);
          // window.location.href = "/";
          // window.location.href = '/'
          // navigate("/")
    
    
        } catch (error) {
    
          const { message } = error.response.data;
          setAuthMessage(message);
        }
      }

      const clearState = () => {

        setShowSignup(false);
        setusername('');
        setPassword('');
        setEmail('');
        setSignupSuccess(false);
    
      }

      const renderComponent = () => {

        return (
          <>

            <div className="login">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <h2 className="home-title text-center">Welcome to InstaShop</h2>
                    <div className="login-wrapper">
                      <h4 className="text-center">{showSignup ? 'Sign up' : 'Login'}</h4>
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="username" id="username" value={username} onChange={(e) => setusername(e.target.value)} autoComplete="off" autoFocus />
                      </div>
                      <div className="input-group">
                        <input type="password" className="form-control" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
                      </div>
    
                      {showSignup && <div className="input-group">
                        <input type="text" className="form-control" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
                      </div>
                      }
    
                      <div className="input-group">
                        <input type="submit" className="form-control btn btn-primary" value={showSignup ? "Sign Up" : "Log In"} onClick={showSignup ? signupHandler : signinHandler} />
                      </div>
                      <div className="signup-btn" onClick={toggleSignup}>{showSignup ? 'Already have an Account ? Login' : "Don't have an Account? Signup"}
                      </div>
                      <div className={signupSuccess ? "auth-msg text-info text-center" : "auth-msg text-danger text-center"}>{authMessage}</div>
                    </div>
    
                  </div>
                </div>
              </div>
            </div>
          </>
        )
    
      }



return (
    renderComponent()
)
}
export default Auth;