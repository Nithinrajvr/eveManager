import React, { Component } from 'react'
import { Link,NavLink } from 'react-router-dom'
export default class Navbar2 extends Component {
  constructor(props){
    super(props)
    
    const token=localStorage.getItem("token")
    const fullname=localStorage.getItem("fullname")
    const userid= localStorage.getItem("userid")

    let loggedIn=true

    if(token==null){
     loggedIn=false
    }
    this.state={
        loggedIn,
        token,
        fullname,
        userid
    }
    
}
    render() {
        return (
            <>
            <div style={{"textAlign":"left","paddingLeft":"100px","marginTop":"20px","marginBottom":"20px"}}>
<h2  > <i   className="fa fa-calendar" aria-hidden="true"></i><strong> eve</strong>MANAGER</h2>
  </div>
                     <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{"background-color":"transparent"}}>
  <div className="container-fluid" style={{"paddingLeft":"50px"}}>


  <ul className="navbar-nav">
  <li className="nav-item">
          <Link to="/" className="nav-link" aria-current="page" ><i className="fa fa-home"> </i> Home</Link>
        </li>

        <li className="nav-item">
                      <Link to="/movies" className="nav-link" aria-current="page" >Movies</Link>
        </li>
        <li className="nav-item">
                      <Link to="/fmovies" className="nav-link" aria-current="page" ><img src="images/fandango-icon.png" style={{"width":"30px"}}/>
 Fandango Movies</Link>
        </li>
        <li className="nav-item">
          <Link to="/events" className="nav-link"  >Events</Link>
        </li>
      
        <li className="nav-item">
          <Link to="/plays" className="nav-link"  >Plays</Link>
        </li>


        <li className="nav-item">
          <Link to="/corporate" className="nav-link"  >Corporate</Link>
        </li>
        <li className="nav-item">
          <Link to="/personal" className="nav-link"  >Personal</Link>
        </li>


      </ul>
  
      {(this.state.loggedIn ===true) ? (
        <>
        <div style={{"float":"right"}}>
        <Link to="/dashboard2" > <span className="btn btn-danger btn-xs"> <i className="fa fa-list"></i> Switch to Hosting Dashboard </span></Link>
            <Link to="/logout" > <span className="btn btn-default btn-xs"> <i className="fa fa-user"></i>Log Out </span></Link>
            </div>
          </>
          ) : (
          <Link to="/login" className="nav-link"> <span className="btn btn-danger btn-sm"> Login/Register </span></Link>
          )} 
      
    




     
         
</div>

</nav>
            </>
        )
    }
}
