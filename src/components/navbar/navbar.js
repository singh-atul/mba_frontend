import { CButton } from '@coreui/react';
import SuggestionInputSearch from "suggestion-react-input-search";
import {signIn,signUp,signOut} from '../../api/auth'
import { useNavigate } from 'react-router-dom';
const Navbar = (props) => {
    const navigate = useNavigate();

    const logout = () =>{
        signOut();
        navigate("/");
    }

    return (
        <>
            <div className="bg-dark px-2">
                <div className="row text-center">
                    <div className="col-lg-2 col-sm-12">
                        <div className="display-6 text-danger py-1">MBA</div>
                    </div>
                    <div className="col-lg-8 col-sm-8 py-2 ">
                        
                            {/* <SuggestionInputSearch
                                onSubmitFunction={props.onMovieSelect}
                                recentSearches={props.movies}
                                placeholder="Seach for movie ..."
                                inputPosition="center"
                                inputClass="form-control"
                            /> */}
                    </div>
                    <div className="col-lg-2 p-2 col-sm-4 ">
                        {
                            !localStorage.getItem('token') ? (
                                <CButton type="submit" color="danger" className='px-3' onClick={()=>{window.location.href='/login'}} >
                                    Login
                                </CButton>
                            ):
                            <CButton type="submit" color="danger" className='px-3' onClick={logout} >
                                Logout
                            </CButton>
                        }
                    </div>
                </div>
            </div>
            
        </>
    )
}


export default Navbar;