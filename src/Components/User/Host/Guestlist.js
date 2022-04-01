import React, { Component } from 'react'


import {Link,NavLink} from 'react-router-dom';
import NavbarHost from '../../Layout/NavbarHost';
import axios from 'axios';
import { useHistory,useLocation } from 'react-router-dom';
import withRouter from 'react-router-dom';
import Navbar2 from '../../Layout/Navbar2';
export default class Guestlist extends Component {
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


        
        let editevent=localStorage.getItem("editevent");
        console.log(editevent);
        if(editevent==null){
          this.props.history.push('/dashboard2');
        }
        this.state={
            loggedIn,
            token,
            fullname,
            userid,
            email,
            newbookings:[],
            userid:userid,
            editevent,
                     
        }

    }
    componentDidMount(){
      const filldashboard  =async (event)=>{
         let eventid=this.state.editevent   ;
  console.log(eventid);
         axios({
          method: "post",
          url: "http://localhost:5000/api/myevents/guestlist",
          data: {
      eventid:eventid,
      
            },
          headers: { "Content-Type": "application/json" },
            })
       .then(res=>{
           console.log(res);
           console.log(res.data);
                   this.setState({
                      newbookings:res.data,
  
             });
       });
       localStorage.removeItem("editevent");
             }; 
       filldashboard();
  
  
  }
  
  handleView=(eventid)=>{
      localStorage.setItem("editevent",eventid);
      this.props.history.push("/editevent");
   
  }
  
    render() {
        const {fullname,email}=this.state;
        const {newbookings}=this.state;
        let seatavail=0;
        return (
            <>
            
<NavbarHost/>
        
        <div className="" style={{"padding":"50px"}}>
          
        
          <div  className="content">
            <div  className="content-header">
              <div  className="container-fluid">
                <div  className="row mb-2">
                  <div  className="col-sm-4">
                    <h1  className="m-0"> <i class="fa fa-users" aria-hidden="true"></i>  Guest List</h1>   
                    Welcome {fullname}
                  </div><div  className="col-sm-4">
                  
                  </div>
                  <div  className="col-sm-4">
             
                  </div>
                </div>
              </div>
            </div>
   </div>




   
<section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
 


<div className="card">
                      <div className="ribbon-wrapper ribbon-xl">
                        <div className="ribbon bg-danger">
                     Guest List
                        </div>
                      </div>
                                  
                        
                          <table id="example1" className="table table-bordered table-striped">
                  <thead>
                    <tr>
                                      
                    
                      <th> Guest (Name) </th>
                      <th> Email </th>
                      <th> Mobile No </th>
                      <th> Booked on</th>
                      <th> No. of Tickets </th>
                      <th> Amount </th>
                      <th></th>
                   
                    </tr>
                  </thead>
                  <tbody>
                      {/* <tr>
                      <td width="15%">07-Dec-2021 6:00 Am </td>
                      <td  width="20%"> Fun Party </td>  
                      <td width="25%"> ABC ABC ABC ABC</td>
                      <td width="4%"> 02 </td>
                      <td width="4%"> 200 </td>
                      <td width="4%"> 150 </td>
                      <td width="4%"> 50</td>
                      <td><span className="btn btn-info btn-xs">View Details</span> <span className="btn btn-success btn-xs"> Guest List</span></td>
            </tr> */}

                      { newbookings.map((newbookings,index)=>(

                 
                   
<tr key={newbookings.id}>

    <td >  {newbookings.fullname} </td> 
    <td >  {newbookings.email} </td> 
    <td >  {newbookings.mobile} </td> 
    <td >  {newbookings.bookingdate} </td> 
    <td width="10%">  {newbookings.no_tickets} </td> 
    <td width="10%">  {newbookings.booking_amt} </td> 


    <td  width="5%">  </td> 

        
                </tr>
                      ))} 
                   
                  </tbody>
                </table>

                    </div>
                  
    
       




            </div>
        </div>
      </div>
 </section>
        


   </div>       
            List of Hosted Events List 

            GUEST LIST / BOOKED SEATS FOR A PARTICULAR Event
            SHOW AVAILABLE / BOOKED SEATS

            



                
            </>
        )
    }
}
