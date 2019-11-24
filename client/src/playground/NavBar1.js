import React from 'react'
// import Home from './Home'
// import {NavLink} from "react-router-dom"
import "../../bootstrap.css"


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
                <ul class="nav nav-tabs" id="nav-tab" role="tablist">
                    <li class="nav-item">
                        {/* <a class="nav-link active" href="/">Home</a> */}
                        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/tasks">Tasks</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/activities">Activities</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
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

/* <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        {/* <a className="nav-link" href="/" >Home <span className="sr-only">(current)</span></a> */
                        
                    // </li>
                    // <li className="nav-item" >
                    //     {/* <a className="nav-link" href="/tasks" >Tasks</a> */}
                        
                    // </li>
                //     <li className="nav-item">
                //         {/* <a className="nav-link" href="/activities" >Activities</a> */}
                        
                //     </li>
                // </ul> */}