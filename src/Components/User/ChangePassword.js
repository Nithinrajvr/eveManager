import React ,{useState} from 'react'
import axios from 'axios'
import { componentDidMount } from 'react-dom'
import { render } from '@testing-library/react';
import Navbar from '../Layout/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router';
import {Link,NavLink} from 'react-router-dom';

export default class ChangePassword extends React.Component {
    constructor(props){
        super(props)

let userid=localStorage.getItem('userid');

        this.state ={
        password:'',
        cpassword:'',
             userid,
              };

    }
  

 
    
  

    handleChange=(event)=>{
        let name=event.target.name;
        this.setState({
          [name] : event.target.value,
        })

            
    }
    handleSubmit=event=>{
        event.preventDefault();

        let pwd= this.state.password;
        let cpwd= this.state.cpassword;
        if (pwd==cpwd){
            var bodyFormData = new FormData();
            bodyFormData.append('password', this.state.password);
            bodyFormData.append('password2', this.state.password);
            bodyFormData.append('id', this.state.userid);
            axios({
                method: "post",
                url: "/index.php/mybike/changepwd",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
              })
                .then(res=>{
                    console.log(res);
                    console.log(res.data);
                    toast(res.data.message);
                    let aa=0;
                    if(res.data.response=="success") {
               alert('Password Changed Successfully ! Please relogin ')
                    this.props.history.push("/logout");
                 
                    }
    
            })
        }else{
            toast("Password Mismatch!! Please enter same password");
        }

    };



render(){
const {fullname,password,cpassword}=this.state;
return (
<div>
    <Navbar/>
    <ToastContainer />
        <div className="container" width="60%" style={{"marginTop":"30px"}}>
            <h3> Change Password  </h3>
            <hr/>
    <div className="row">
                        <div className="col-md-8">
                            <div className="panel panel-default">
                                <div className="panel-heading"></div>


<form onSubmit={this.handleSubmit.bind(this)}>

<div className="row">
    <div className="col-sm-6">
            <div className="form-group">
                <label >Password<span className="requiredmark">*</span></label>
                <input 
                    type="password"
                    name="password" className="form-control" initialValue="" placeholder="Enter Password"
                value={password}
                                    onChange={this.handleChange}
                                  
                    required/>
            </div>
    </div>
    </div>
    <div className="row">
    <div className="col-sm-6">
            <div className="form-group">
                <label >Confirm Password <span className="requiredmark">*</span></label>
                  <input type="password" name="cpassword" className="form-control" placeholder="Confirm Password"
                  value={cpassword}
                                    onChange={this.handleChange}
                  required/>
           </div>
    </div>
    </div>




<br/>
<hr/>




<div className="row">
<div className="col-sm-8"></div>
<div className="col-sm-4">

                                            <button className="btn btn-default" type="reset" >Cancel</button>
                                            <button className="btn btn-primary" name="submit" type="submit">Save Password</button>
                                        </div>
</div>
    </form>
                            </div>
                            </div>
                            <div className="col-4">
                                <h3>Security Options</h3>
                                <ul>
                                    <li> <NavLink to="/profile"> Back to Profile </NavLink></li>
                                    <li><NavLink to="/csecurity">Change Security Question </NavLink></li>


                                </ul>


                            </div>
                    

</div>
    
</div>  </div>
);
}
}
