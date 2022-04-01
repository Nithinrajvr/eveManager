import React ,{useState} from 'react'
import axios from 'axios'
import { componentDidMount } from 'react-dom'
import { render } from '@testing-library/react';
import Navbar from '../Layout/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router';
import {Link,NavLink} from 'react-router-dom';

export default class ChangeSecurity extends React.Component {
    constructor(props){
        super(props)

let userid=localStorage.getItem('userid');

        this.state ={
        squestion:'',
        sanswer:'',
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

        let squestion= this.state.squestion;
        let answer= this.state.answer;
        if (answer==""){
            toast("Invalid Answer");
        }else{
          
            var bodyFormData = new FormData();
            bodyFormData.append('squestion', this.state.squestion);
            bodyFormData.append('answer', this.state.answer);
            bodyFormData.append('id', this.state.userid);
            axios({
                method: "post",
                url: "/index.php/mybike/changeque",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
              })
                .then(res=>{
                    console.log(res);
                    console.log(res.data);
                    toast(res.data.message);
                    let aa=0;
                    if(res.data.response=="success") {
               alert('Updated Successfully !  ')
                    this.props.history.push("/profile");
                 
                    }
    
            })
        }

    };



render(){
const {fullname,squestion,answer}=this.state;
return (
<div>
    <Navbar/>
    <ToastContainer />
        <div className="container" width="60%" style={{"marginTop":"30px"}}>
            <h3> Change Security Question  </h3>
            <hr/>
    <div className="row">
                        <div className="col-md-8">
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




<br/>
<hr/>




<div className="row">
<div className="col-sm-8"></div>
<div className="col-sm-4">

                                            <button className="btn btn-default" type="reset" >Cancel</button>
                                            <button className="btn btn-primary" name="submit" type="submit">Update</button>
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
