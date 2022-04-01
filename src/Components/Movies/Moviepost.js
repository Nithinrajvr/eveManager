import React, { Component } from 'react'
import Navbar2 from '../Layout/Navbar2'

import {Link,NavLink} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import axios from 'axios';
import dateFormat from 'dateformat';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Movieposter from './Movieposter';
import FileUpload from '../Fileupload';


export default class Moviepost extends Component {
    constructor(props){
        super(props)
        
        const token=localStorage.getItem("token")
        const fullname=localStorage.getItem("fullname")
        const userid= localStorage.getItem("userid")
        const email= localStorage.getItem("email")

        let editevent=localStorage.getItem("editevent");
        if(editevent==null){
          editevent=''
        }
    
        let loggedIn=true
        let tseats=0;
        if(token==null){
         loggedIn=false
        }
        this.state={
            loggedIn,
            token,
            fullname,
            userid,
            email,
            etitle:'',
            venue:'',
            datefrom:'',
            dateto:'',
            mobile:'',
            etype:'0',
            edesp:'',
            seats:'',
            price:'',
            tseats:tseats, 
            no_slots:'1',    
            movieposter:'',
            gtype:''
        }
        




    }

    setDatefrom=(date)=>{ this.setState({   datefrom:date }) }
    setDateTo=(date)=>{ this.setState({   dateto:date }) }

    handleChange=(event)=>{
        let name=event.target.name;
        this.setState({
          [name] : event.target.value,
        })
        let seats=0;
        let no_slots=0;

        if(event.target.name=="seats") {
          seats= event.target.value;

        }else{
          seats=this.state.seats;
        }
        if(event.target.name=="no_slots") {
          no_slots= event.target.value;
        }else{
         
          no_slots=this.state.no_slots;
        }
       

        let tseats= no_slots * seats ;
       this.setState({
        tseats:tseats,
       })
         
       
            
    }

    handleSubmit=async event=>{
        event.preventDefault();
    
        const title=this.state.etitle;
        const etype="1";
        const filepath=localStorage.getItem("filepath");
        const filename=localStorage.getItem("filename");
      
       // alert(this.state.etype);
await axios({
    method: "post",
    url: "http://localhost:5000/api/movies",
    data: {
      title :this.state.etitle,
      etype:"1"  ,
      venue:this.state.venue,
        dfrom:dateFormat(this.state.datefrom, "yyyy/m/d"),
      dto: dateFormat(this.state.dateto, "yyyy/m/d"),
      cdetail:this.state.mobile,
      edescp:this.state.edesp,
      seats:this.state.seats,
      price:this.state.price,
      hostby:this.state.userid,
      no_slots:this.state.no_slots,
      tseats:this.state.tseats,
      cname:this.state.cname,
      filepath:filepath,
      filename:filename,

      
      },
    headers: { "Content-Type": "application/json" },
      })
      .then(res=>{
          console.log(res.data);
          if(res.data.inserted=='true'){
            toast("Event Added Successfully");
            this.props.history.push("/dashboard2");
          }else{
            toast("Error");
          }
      })
    }
    render() {
        const {fullname,email,etitle,venue,datefrom,dateto,mobile,edesp,etype,seats,price,no_slots,tseats,cname,gtype}=this.state;
        return (
            <>
<Navbar2/>
<ToastContainer />
   
        <div className="" style={{"padding":"50px"}}>
             Welcome {fullname}
        
          <div  className="content">
            <div  className="content-header">
              <div  className="container-fluid">
                <div  className="row mb-2">
                  <div  className="col-sm-4">
                   
                 
                  </div><div  className="col-sm-4">
                  
                  </div>
                  <div  className="col-sm-4">
                    <ol  className="breadcrumb float-sm-right">
                      <li  className="breadcrumb-item"><a href="#">Home</a></li>
                      <li  className="breadcrumb-item active">Host A Movie </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
   </div>

   







   <div   className="container" style={{"paddingLeft":"150px"}}>
   <h3  className="m-0">Post a Movie Details</h3>   

<hr/>
      {/* <form onSubmit={this.handleSubmit.bind(this)}> */}


  <div class="row">
  <div className="col-8">

            
        <div className="row"  style={{"paddingBottom":"20px"}}>
          
          <div className="col-12">
            
            <label> <i className="fas fa-user"></i> Movie Title </label>
            <input 
                    type="text"
                    name="etitle" className="form-control" initialValue="" placeholder="Enter Movie Name"
                    value={etitle}
                    onChange={this.handleChange}
                    required/>
          </div>
        </div>

        <div className="row"  style={{"paddingBottom":"20px"}}>
           
<FileUpload  />

          </div>


        <div className="row"  style={{"paddingBottom":"20px"}}>
        <div className="col-6">
                  <div style={{"display":"none"}}>
                    
        <label> <i className="fas fa-user"></i> Event Type </label>
            <select name="etype" className="form-control" value={etype}    onChange={this.handleChange} required>
                <option value="1" selected > Movie </option>
              
            </select>

            </div>

            <label> <i className="fas fa-user"></i> Genres  </label>
            <select name="etype" className="form-control" value={gtype}    onChange={this.handleChange} required>
            <option value="0">Action</option>
                            <option value="1">Comedy</option>
                            <option value="2">Romance</option>
                            <option value="3">Horror</option>
              
            </select>

            </div>
            <div className="col-6">


            <label> <i className="fas fa-an"></i> Year of Release</label>
            <select name="year" className="form-control">
                            <option value="2000">2000</option>
                            <option value="2001">2001</option>
                            <option value="2002">2002</option>
                            <option value="2003">2003</option>
                            <option value="2004">2004</option>
                            <option value="2005">2005</option>
                            <option value="2006">2006</option>
                            <option value="2007">2007</option>
                            <option value="2008">2008</option>
                            <option value="2009">2009</option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                            <option value="2012">2012</option>
                            <option value="2013">2013</option>
                            <option value="2014">2014</option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>

                        </select>
         

            </div>


          </div>
 

        <div className="row" style={{"paddingBottom":"20px"}}>
          <div className="col-12">
          <label> <i className="fas fa-mail"></i> Venue </label>
          <textarea 
                    type="text"
                    name="venue" className="form-control" initialValue="" placeholder="Enter venue"
                    value={venue}
                    onChange={this.handleChange}
                    />

            </div>
        </div>


        <hr/>

        <div className="row" style={{"paddingBottom":"20px","display":""}}>
    

          
        </div>

        <div className="row" style={{"paddingBottom":"20px","display":"none"}}>
          <div className="col-6">
            <label> Name of Person</label>
            <input 
                    type="text"
                    name="cname" className="form-control" initialValue="" placeholder="Contact Person Name"
                    value={cname}
                    onChange={this.handleChange}
                    />
          </div>
          <div className="col-6">
            <label> Contact Number / email</label>
            <input 
                    type="text"
                    name="mobile" className="form-control" initialValue="" placeholder="Enter Mobile No"
                    value={mobile}
                    onChange={this.handleChange}
                    />
          </div>
        </div>


        <div className="row">
 
        </div>

        <div className="row">
          <div className="col-12">
            <label> <i className="fas fa-an"></i> Movie Description</label>
            <textarea 
                    type="text"
                    name="edesp" className="form-control" initialValue="" placeholder="Description about Event"
                    value={edesp} style={{"height":"200px"}}
                    onChange={this.handleChange}
                    />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
          <label> <i className=""></i> Date from  </label>
   

   <DatePicker name="datefrom"
                 selectsStart
                 startDate={this.state.datefrom}
                 endDate={this.state.dateto}
                 placeholderText="Select Event date"
                 className="form-control"
                 selected={this.state.datefrom}
                 onChange={date=>this.setDatefrom(date)}
                 minDate={new Date()}
                 value={datefrom}
                 dateFormat="Y/MM/dd"
   //maxDate={new Date().setDate(new Date().getDate()+ 6)}
   //       onCalendarOpen={this.handleCalendarOpen}
   //              onCalendarClose={this.handleCalendarClose}
   
        />
    
          </div>
          <div className="col-4">
            <label> <i className=""></i> Upto </label>

            <DatePicker name="dateto"
                 selectsStart
                 startDate={this.state.datefrom}
                 endDate={this.state.dateto}
                 placeholderText="Select date"
                 className="form-control"
                 selected={this.state.dateto}
                 onChange={date=>this.setDateTo(date)}
                 minDate={new Date()}
                 value={dateto}
                 dateFormat="Y/MM/dd"
   //maxDate={new Date().setDate(new Date().getDate()+ 6)}
   //       onCalendarOpen={this.handleCalendarOpen}
   //              onCalendarClose={this.handleCalendarClose}
   
        />
            </div>
          <div className="col-4">
            <label> <i className="fas fa-an"></i> Price <small>per seats</small></label>
            <input 
                    type="text"
                    name="price" className="form-control" initialValue="" placeholder="Enter price"
                    value={price}
                    onChange={this.handleChange}
                    />
          </div>
          <div className="col-4" style={{"paddingTop":"30px"}}>
            <button  className="btn btn-primary btn-block" onClick={this.handleSubmit}>Add</button>
          </div>
        </div>
        <br/>


        <hr/>

        <div className="row" style={{"display":"none"}}>
        <div className="col-lg-4">
            <label> <i className="fas fa-an"></i> No of Slots</label>
        
            <input 
                    type="text"
                    name="no_slots" className="form-control" initialValue="" placeholder="No of Seats"
                    value="1"
                    onChange={this.handleChange}
               
                    /> 
</div>

<div className="col-lg-2" style={{"paddingTop":"35px","paddingLeft":"30px"}}>
<label> <i className="fas fa-an"></i> </label>
X
</div>
<div className="col-lg-4">
<label> <i className="fas fa-an"></i> Seats (per lot)</label>

        <input 
                type="text"
                name="seats" className="form-control" initialValue="" placeholder="Enter Seat Available"
                value="50"
                onChange={this.handleChange}
               
                />
     
      </div>
      <div className="col-lg-2" style={{"paddingTop":"35px","paddingLeft":"30px"}}>
<label> <i className="fas fa-an"></i> </label>
=
</div>
<div className="col-lg-3" >
<label> <i className="fas fa-an"></i> Total Seats</label><br/>
{tseats}
</div>

        </div>
 <br/>
  

 
   

     
  </div>
  <div className="col-4">
    <div style={{"width":"250px","height":"400px","border":"1px solid #e5e5e5","borderRadius":"1%"}}>
      <img src={this.state.movieposter}/>

    </div>

  </div>
  </div>

       
         
       

            </div>

   </div>        

            </>
        )
    }
}
