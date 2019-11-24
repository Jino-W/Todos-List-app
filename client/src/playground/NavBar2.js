import React from 'react'
// import Home from './Home'
import {NavLink} from "react-router-dom"


class NavBar extends React.Component{


render(){
    return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href={null}><i className="fa fa-book mr-1" aria-hidden="true"></i>ToDo</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        {/* <a className="nav-link" href="/" >Home <span className="sr-only">(current)</span></a> */}
                        <NavLink className="nav-link" to="/" 
                            activeClassName="selectedLink" 
                            // activeStyle={{background:'red',color:'white'}}
                            isActive={(match, location) => {
                                if (!match) {
                                return false;
                            }}} >Home <span className="sr-only">(current)</span>
                        </NavLink>
                    </li>
                    <li className="nav-item" >
                        {/* <a className="nav-link" href="/tasks" >Tasks</a> */}
                        <NavLink className="nav-link" to="/tasks" 
                            activeClassName="selectedLink" 
                            // activeStyle={{background:'red',color:'white'}}
                            isActive={(match, location) => {
                                if (!match) {
                                return false;
                            }}}
                            // className={isActive ? "active" : ""}
                            >Tasks <span className="sr-only">(current)</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        {/* <a className="nav-link" href="/activities" >Activities</a> */}
                        <NavLink className="nav-link" to="/activities" 
                            activeClassName="selectedLink" 
                            // activeStyle={{background:'red',color:'white'}}
                            isActive={(match, location) => {
                                if (!match) {
                                return false;
                            }}} >Activities <span className="sr-only">(current)</span>
                        </NavLink>
                    </li>
                    {/* <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li> */}
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    </div>
    )
}
}

export default NavBar