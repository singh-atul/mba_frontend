import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from "react-bootstrap";
import {signIn,signUp} from '../../api/auth'
function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const [message, setMessage] = useState("");
    const [userType, setValue] = useState("CUSTOMER")
    const [userSignUpData,setUserSignUpData] = useState({})
    const navigate = useNavigate();

    const redirectUrl = () =>{
      if ( localStorage.getItem("userTypes")=== "CUSTOMER")
          navigate('/');
      else if ((localStorage.getItem("userTypes") === "CLIENT"))
          navigate('/client'); 
      else
          navigate('/admin');  
    }
    useEffect(() => {
            if(localStorage.getItem("token")){
              redirectUrl()
                }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    const history = useNavigate();
    const loginFn = async (e) => {
        e.preventDefault();
        const userId = userSignUpData.userId;
        const password = userSignUpData.password


        const data = {
            userId: userId,
            password: password
        };

        const result = await signIn(data);
        redirectUrl()        
        }
        
       
    

    const signupFn = (e) => {
        const username =  userSignUpData.username;
        const userId = userSignUpData.userId;
        const email = userSignUpData.email;
        const password = userSignUpData.password


        const data = {
            name: username,
            userId: userId,
            email: email,
            userType: userType,
            password: password
        };
        e.preventDefault();
        signUp(data).then(function (response) {
                if (response.status === 201) {
                   history(0);
                }
            })
            .catch(function (error) {
                if(error.response.status===400)
                    setMessage(error.response.data.message);
                else
                    console.log(error);
            });
    }

    const  updateSignupData =(e)=>{
        userSignUpData[e.target.id]=e.target.value;
    }

    const toggleSignup = () => {

        setShowSignup(!showSignup);
        if(showSignup){
            setUserSignUpData({});
    }
    }

    const handleSelect = (e) => {
        setValue(e)

    }

    return (

        <div id="loginPage">
            <div id="loginPage" className="bg-primary d-flex justify-content-center align-items-center vh-100">

                <div className="card m-5 p-5 " >
                    <div className="row m-2 ">
                                    <div >
                                        <h4 className="text-center ">{showSignup ? 'Sign up' : 'Login'}</h4>
                                            
                                            <form  onSubmit={showSignup ? signupFn: loginFn}>
                                                <div className="input-group ">
                                                    <input type="text" className="form-control" placeholder="User Id" id="userId" onChange={updateSignupData}  autoFocus required />
                                                
                                                </div>
                                                <input type="password" className="form-control" placeholder="Password"  id="password" onChange={updateSignupData} required/>
                                                {showSignup && <>
                                                <div className="input-group ">
                                                    <input type="text" className="form-control" placeholder="Username" id="username" onChange={updateSignupData} required />
                                                </div>
                                                <div className="input-group ">    
                                                    <input type="text" className="form-control" placeholder="Email" id="email" onChange={updateSignupData} required/>
                                                </div>    
                                                <div className="row">
                                                    <div className="col">
                                                        <span className="mx-1 my-1"> User Type</span>
                                                    </div>
                                                    <div className="col">
                                                        <DropdownButton
                                                            align="end"
                                                            title={userType}
                                                            id="userType"
                                                            onSelect={handleSelect}
                                                        variant="light"
                                                        >
                                                            <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                                            <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                                                        </DropdownButton>
                                                    </div>
                                                </div>
                                                
                                                </>
                                                   }
                                                <div className="input-group">
                                                    <input type="submit" className="form-control btn btn-primary" value={showSignup ? "Sign Up" : "Log In"} />
                                                </div>
                                                <div className="signup-btn text-center" onClick={toggleSignup}>{showSignup ? 'Already have an Account ? Login' : "Don't have an Account? Signup"}</div>
                                                <div className="auth-error-msg text-danger text-center">{message}</div>
                                            </form>
                                    </div>
                                
                    </div>
                </div>
            
            </div>
            <div style={{
                position: "fixed",
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: "white"
                }}>
                <footer className="page-footer">
                    <div className="text-center py-3">© 2022 Copyright:
                        <a href="https://relevel.com">Relevel by Unacademy</a>
                    </div>
                </footer>
            </div>
        </div>
        
          
    )
}

export default Login;