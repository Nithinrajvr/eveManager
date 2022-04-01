import React, { Component } from 'react'
import Navbar2 from '../Layout/Navbar2'
import {Link,NavLink} from 'react-router-dom';
import Mytickets from './Mytickets';
export default class Dashboard extends Component {
    constructor(props){
        super(props)
        
        const token=localStorage.getItem("token")
        const fullname=localStorage.getItem("fullname")
        const userid= localStorage.getItem("userid")
        const email= localStorage.getItem("email")
        let loggedIn=true

        if(token==null){
         loggedIn=false
        }
        this.state={
            loggedIn,
            token,
            fullname,
            userid,
            email,
                     
        }

    }
    render() {
        const {fullname,email}=this.state;
        return (
            <>
<Navbar2/>



        
        <div className="" style={{"padding":"50px"}}>
          
        
          <div  className="content">
            <div  className="content-header">
              <div  className="container-fluid">
                <div  className="row mb-2">
                  <div  className="col-sm-4">
                    <h1  className="m-0">My Dashboard</h1>   
                    Welcome {fullname}
                  </div><div  className="col-sm-4">
                  
                  </div>
                  <div  className="col-sm-4">
                    <ol  className="breadcrumb float-sm-right">
                      <li  className="breadcrumb-item"><a href="#">Home</a></li>
                      <li  className="breadcrumb-item active">Dashboard </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
   </div>




   
<section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-10">
          <Mytickets userid={this.state.userid}/>
            </div>
        </div>
      </div>
 </section>
        


   </div>        

            </>
        )
    }
}
