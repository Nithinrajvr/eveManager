import React ,{useState} from 'react'
import axios from 'axios'
import { componentDidMount } from 'react-dom'
import { render } from '@testing-library/react';
import Navbar from '../Layout/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router';
import {Link,NavLink} from 'react-router-dom';

export default class Resetpassword extends React.Component {
    constructor(props){
        super(props)

let userid=localStorage.getItem('userid');

        this.state ={
        squestion:'',
        sanswer:'',
        email:'',
        password:'',
        cpassword:'',
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

        let squestion= this.state.squestion;
        let answer= this.state.answer;
        let password=this.state.password;
        let cpassword=this.state.cpassword;

        
        
        if (answer==""){
            toast("Invalid Answer");
        }else{ 
            if(password==cpassword){
          
            var bodyFormData = new FormData();
            bodyFormData.append('squestion', this.state.squestion);
            bodyFormData.append('answer', this.state.answer);
            bodyFormData.append('email', this.state.email);
            bodyFormData.append('password', this.state.password);
            axios({
                method: "post",
                url: "/index.php/user/resetpassword",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
              })
                .then(res=>{
                    console.log(res);
                    console.log(res.data);
                    alert(res.data.message);
                  
                    if(res.data.response=="success") {
                 this.props.history.push("/login");
                 
                    }
    
            })
        }else{
            alert("Password - NOT MATCH");
        }
        }

    };



render(){
const {email,squestion,answer,password,cpassword}=this.state;
return (
<div>
    <Navbar/>
    <ToastContainer />
        <div className="container" width="60%" style={{"marginTop":"30px"}}>
            <h3> Reset Password  </h3>
            <hr/>
            <small> Select Security Question </small>
    <div className="row">
                        <div className="col-md-6">
                            <div className="panel panel-default">
                                <div className="panel-heading"></div>


<form onSubmit={this.handleSubmit.bind(this)}>

<div className="row">
    <div className="col-sm-10">
            <div className="form-group">
                <label >Security Question<span className="requiredmark">*</span></label>
                <select name="squestion" className="form-control" value={squestion}    onChange={this.handleChange}>
              
              <option value="What was your favorite school teacher’s name?" selected>What was your favorite school teacher’s name? </option>
              <option value="What was the make and model of your first car?">What was the make and model of your first car?

</option>
<option value="In what city or town did your parents meet?">In what city or town did your parents meet?

</option>
<option value="What was your favorite place to visit as a child?">What was your favorite place to visit as a child?
</option>
<option value="What is the name of the first school you attended?">What is the name of the first school you attended?

</option>
<option value="What was the make and model of your first car?">What was the make and model of your first car?
</option>
<option value="What is your favorite TV program?">What is your favorite TV program?
</option>
<option value="What was the last name of your favorite teacher?">What was the last name of your favorite teacher?
</option>

          </select>
            </div>
    </div>
    </div>
    <div className="row">
    <div className="col-sm-10">
            <div className="form-group">
                <label >Answer <span className="requiredmark">*</span></label>
                  <input type="text" name="answer" className="form-control" placeholder="Enter Answer"
                  value={answer}
                                    onChange={this.handleChange}
                  required/>
           </div>
    </div>
    </div>

    <div className="row">
    <div className="col-sm-10">
            <div className="form-group">
                <label >email / Username <span className="requiredmark">*</span></label>
                  <input type="text" name="email" className="form-control" placeholder="Enter Answer"
                  value={email}
                                    onChange={this.handleChange}
                  required/>
           </div>
    </div>
    </div>


<br/>
<hr/>

<div className="row">
    <div className="col-sm-5">
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
  
    <div className="col-sm-5">
            <div className="form-group">
                <label >Confirm Password <span className="requiredmark">*</span></label>
                  <input type="password" name="cpassword" className="form-control" placeholder="Confirm Password"
                  value={cpassword}
                                    onChange={this.handleChange}
                  required/>
           </div>
    </div>
    </div>

<hr/>



<div className="row">
<div className="col-sm-8"></div>
<div className="col-sm-4">

<Link to="/login"><span className="btn btn-default">Cancel </span></Link>
                                            <button className="btn btn-primary" name="submit" type="submit">Reset</button>
                                        </div>
</div>
    </form>
                            </div>
                            </div>
                            <div className="col-6">
                            <div   className="widget_heading">
             
             </div>
             <div   className="banner_content" style={{"paddingTop":"20px","paddingLeft":"20px"}}>
               <br/>
               <h3 style={{color:"#000","paddingLeft":"200px"}}> Forgot Your Password</h3>
               <p style={{color:"#000","paddingLeft":"200px"}}> Don't worry ! <strong>Just fill in your details</strong> and we'll reset your password.
               <br/> <br/>
               <p className="text-danger"> If problem in accessing Mail <span className="text-success"> Answer Your Security Question to Reset Password</span></p>
 
             
               </p>
               </div>
 

                            </div>
                    

</div>
    
</div>  </div>
);
}
}
