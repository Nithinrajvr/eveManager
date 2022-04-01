import React ,{useState} from 'react'
import axios from 'axios'
import { componentDidMount } from 'react-dom'
import { render } from '@testing-library/react';
import Navbar from '../Layout/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router';
import {Link,NavLink} from 'react-router-dom';

export default class Profile extends React.Component {
    constructor(props){
        super(props)

let fname=localStorage.getItem('fullname');
let email=localStorage.getItem('email');
let address=localStorage.getItem('address');
let ccity=localStorage.getItem('ccity');
let cstate=localStorage.getItem('cstate');
let cpincode=localStorage.getItem('cpincode');
let mobile=localStorage.getItem('mobile');
let userid=localStorage.getItem('userid');

        this.state ={
        fullname:fname,
        email,
        address,
        ccity,
        cstate,
        cpincode,
        mobile,
        userid,
              };

    }
    handleReset =async()=>{
        this.setState ={
          fullname:'',
          email:'',
          address:'',
          ccity:'',
          cstate:'',
          cpincode:'',
          mobile:'',  
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

        var bodyFormData = new FormData();
        bodyFormData.append('fullname', this.state.fullname);
        bodyFormData.append('email', this.state.email);
        bodyFormData.append('address', this.state.address);
        bodyFormData.append('ccity', this.state.ccity);
        bodyFormData.append('cstate', this.state.cstate);
        bodyFormData.append('cpincode', this.state.cpincode);
        bodyFormData.append('mobile', this.state.mobile);
        bodyFormData.append('id', this.state.userid);
        axios({
            method: "post",
            url: "/index.php/mybike/updateuser",
            data: bodyFormData,
            headers: { "Content-Type": "application/json" },
          })
            .then(res=>{
                console.log(res);
                console.log(res.data);
                toast(res.data.message);
                let aa=0;
                if(res.data.response=="success") {
                localStorage.removeItem("fullname");
                localStorage.removeItem("email");
                localStorage.removeItem("address");
                localStorage.removeItem("ccity");
                localStorage.removeItem("cstate");
                localStorage.removeItem("cpincode");
                localStorage.removeItem("mobile");

                localStorage.setItem("fullname",this.state.fullname);
                localStorage.setItem("email",this.state.email);
                localStorage.setItem("address",this.state.address);
                localStorage.setItem("ccity",this.state.ccity);
                localStorage.setItem("cstate",this.state.cstate);
                localStorage.setItem("cpincode",this.state.cpincode);
                localStorage.setItem("mobile",this.state.mobile);
                aa=1;
                if(aa==1){
                this.props.history.push("/dashboard");
                }
                }

        })
    };



render(){
const {fullname,email,address,cstate,ccity,cpincode,mobile}=this.state;
return (
<div>
    <Navbar/>
    <ToastContainer />
        <div className="container" width="60%" style={{"marginTop":"30px"}}>
            <h3> My Profile  </h3>
            <hr/>
    <div className="row">
                        <div className="col-md-8">
                            <div className="panel panel-default">
                                <div className="panel-heading">Basic Info</div>


<form onSubmit={this.handleSubmit.bind(this)}>

<div className="row">
    <div className="col-sm-4">
            <div className="form-group">
                <label >Fullname<span className="requiredmark">*</span></label>
                <input 
                    type="text"
                    name="fullname" className="form-control" initialValue="" placeholder="Enter Full name"
                value={fullname}
                                    onChange={this.handleChange}
                                  
                    required/>
            </div>
    </div>
  
    <div className="col-sm-4">
            <div className="form-group">
                <label >Email <span className="requiredmark">*</span></label>
                  <input type="text" name="email" className="form-control" 
                  value={email}
                                    onChange={this.handleChange}
                  required/>
           </div>
    </div>
    </div>

<div className="row">
    <div className="col-sm-8">
            <div className="form-group">
                <label >Address<span className="requiredmark">*</span></label>
                  <input type="text" name="address" className="form-control"  
                  value={address}
                    onChange={this.handleChange}
                   required/>
           </div>
    </div>
</div>


<div className="row">

  

    <div className="col-sm-4">
            <div className="form-group">
                <label>City <span className="requiredmark">*</span></label>
                <input type="text" name="ccity" className="form-control"  value={ccity}
                  onChange={this.handleChange}
                   required/>
            </div>
    </div>
    <div className="col-sm-4">  
        <label>Pincode<span className="requiredmark">*</span></label>
        <input type="text" name="cpincode" className="form-control"  value={cpincode}
                  onChange={this.handleChange}
                   required/>
    </div> 
    </div>   


<div className="row">
<div className="col-sm-4">
    <label>State<span className="requiredmark">*</span> <small> </small></label>

       <input className="form-control" name="cstate"   defaultValue={cstate}
         onChange={this.handleChange}
       required/>
    </div>

    <div className="col-sm-4">  
    <label>Mobile No<span className="requiredmark">*</span></label>
    <input type="text" name="mobile" className="form-control"   value={mobile}
      onChange={this.handleChange}
    required/>
    </div> 
</div>
<br/>
<hr/>




<div className="row">
<div className="col-sm-8"></div>
<div className="col-sm-4">

                                            <button className="btn btn-default" type="reset" >Cancel</button>
                                            <button className="btn btn-primary" name="submit" type="submit">Save changes</button>
                                        </div>
</div>
    </form>
                            </div>
                            </div>
                            <div className="col-4">
                                <h3>Security Options</h3>
                                <ul>
                                    <li> <NavLink to="/cpassword"> Change Password </NavLink></li>
                                    <li><NavLink to="/csecurity">Change Security Question </NavLink></li>


                                </ul>


                            </div>
                    

</div>
    
</div>  </div>
);
}
}
