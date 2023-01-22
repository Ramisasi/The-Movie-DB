import React from 'react'
import {NavLink,Link} from 'react-router-dom'
export default function NaveBar({userToken,logOut}) {
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid">
          <Link className="navbar-brand" to="home">Navbar</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken != null ?             
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({isActive}) => isActive? "nav-link active" : "nav-link"} to='home'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive}) => isActive? "nav-link active" : "nav-link"} to='About'>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive}) => isActive? "nav-link active" : "nav-link"} to='Movies'>Movies</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive}) => isActive? "nav-link active" : "nav-link"} to='NetWorkes'>NetWorkes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive}) => isActive? "nav-link active" : "nav-link"} to='People'>People</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive}) => isActive? "nav-link active" : "nav-link"} to='Tv'>Tv</NavLink>
            </li>
            <li className="nav-item">
              <span className={ "nav-link" } onClick={logOut}>logOut</span>
            </li>
          </ul>
            :
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className='fa-brands fa-facebook mx-2'></i>
              <i className='fa-brands fa-youtube mx-2'></i>
              <i className='fa-brands fa-twitter mx-2'></i>
              <i className='fa-brands fa-linkedin mx-2'></i>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive}) => isActive? "nav-link active" : "nav-link"} to='Login'>Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive}) => isActive? "nav-link active" : "nav-link"} to='Register'>Register</NavLink>
            </li>
          </ul>
            }
           
           
          </div>
        </div>
      </nav>
    </div>
  )
}
