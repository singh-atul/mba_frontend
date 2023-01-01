import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from "react-bootstrap";
import {signIn,signUp} from '../../api/auth'
import "../booking/booking.css"
function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const [userType, setValue] = useState("CUSTOMER")
    const [userName, setUserName] = useState("") 
    const [userId, setUserId] = useState("")
    const [password, setUserPassword] = useState("")
    const [userEmail, setUserEmail] = useState("")

    
    
    
    const navigate = useNavigate();

    const redirectUrl = () =>{
      if ( localStorage.getItem("userTypes")=== "CUSTOMER")
          navigate(-1);
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


    const loginFn = async (e) => {
        e.preventDefault();
        
        const data = {
            userId,
            password
        };
        if (! validateData(data))
            return false;

        const result = await signIn(data);
        if(localStorage.getItem('token'))
            redirectUrl()
        else
            setErrorMessage(result.data.message)      
        }
        
       
    

    const signupFn = async (e) => {
        e.preventDefault();
        const data = {
            name: userName,
            userId,
            email:userEmail,
            userType,
            password
        };
        console.log(data)
        if (! validateData(data))
            return false;
        

        const response = await signUp(data);
        if (response.status === 201) {
            setShowSignup(false);
            clearState();
            setMessage("Signed Up successfully");
        }
        else{
            setErrorMessage(response.data.message)
        }
        
                 
    }

    const  updateSignupData =(e)=>{
        if(e.target.id==="username")
            setUserName(e.target.value)
        else if(e.target.id==="userId")
            setUserId(e.target.value)
        else if(e.target.id==="password")
            setUserPassword(e.target.value)
        else if(e.target.id==="email")
            setUserEmail(e.target.value)
        
        setMessage("")
        setErrorMessage("")
    }

    const toggleSignup = () => {
        clearState()
        setShowSignup(!showSignup);
        
    }

    const handleSelect = (e) => {
        setValue(e)

    }

    const validateData = (data) => {
        if(data.userId.length<5 || data.userId.length>10){
            setErrorMessage("User ID should be 5 to 10 character long ");
            return false
        }
        if(data.userId.includes(' ')){
            setErrorMessage("User ID should not contain spaces")
            return false;
        }
        if(data.password.length<6 || data.password.length>10){
            setErrorMessage("Password should be 6 to 10 character long ");
            return false
        }
        if(data.password.includes(' ')){
            setErrorMessage("Password should not contain spaces")
            return false;
        }
        if(data.name){
            if(data.name.length<5 || data.password.length>10){
                setErrorMessage("Username should be 5 to 10 character long ");
                return false
            }
            if(data.password.includes(' ')){
                setErrorMessage("Username should not contain spaces")
                return false;
            }
        }
        

        return true;
    }

    const clearState = (e) =>{
        setMessage("")
        setErrorMessage("")
        setValue("CUSTOMER")
        setUserName("")
        setUserId("")
        setUserPassword("")
        setUserEmail("")


        
    }


    return (

        
        <div id="loginPage">
            <div id="loginPage" className="bg-dark d-flex justify-content-center align-items-center vh-100">

                <div className="card m-5 p-5 bg-dark text-light shadow-lg d-flex align-items-center justify-content-center vh-100 backg"  >
                    <div className="row m-2 ">
                                    <div >
                                        <h4 className="text-center ">{showSignup ? 'Sign up' : 'Login'}</h4>
                                            
                                            <form  onSubmit={showSignup ? signupFn: loginFn}>
                                                <div className="input-group ">
                                                    <input type="text" className="form-control m-1" placeholder="User Id" id="userId" onChange={updateSignupData} value={userId} autoFocus  required />
                                                
                                                </div>
                                                <div className="input-group">
                                                <input type="password" className="form-control m-1" placeholder="Password"  id="password" onChange={updateSignupData} value={password} required/>

                                                </div>
                                                {showSignup && <>
                                                <div className="input-group ">
                                                    <input type="text" className="form-control m-1" placeholder="Username" id="username" onChange={updateSignupData} value={userName} required />
                                                </div>
                                                <div className="input-group ">    
                                                    <input type="text" className="form-control m-1" placeholder="Email" id="email" onChange={updateSignupData} value={userEmail} required/>
                                                </div>    



                                                <div className="row m-1">
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
                                                            <Dropdown.Item eventKey="CLIENT">CLIENT</Dropdown.Item>
                                                        </DropdownButton>
                                                    </div>
                                                </div>
                                                
                                                </>
                                                   }
                                                <div className="input-group">
                                                    <input type="submit" className="form-control btn btn-danger" value={showSignup ? "Sign Up" : "Log In"} />
                                                </div>
                                                <div className="signup-btn text-center pe" onClick={toggleSignup}>{showSignup ? 'Already have an Account ? Login' : "Don't have an Account? Signup"}</div>
                                                
                                                <div className="auth-error-msg text-success text-center">{message}</div>
                                                <div className="auth-error-msg text-danger text-center">{errorMessage}</div>
                                                
                                            </form>
                                    </div>
                                
                    </div>
                </div>
            
            </div>
            
        </div>
        
          
    )
}

export default Login;