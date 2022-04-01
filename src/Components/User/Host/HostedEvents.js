import React, { Component } from 'react'
import { Link,NavLink } from 'react-router-dom'
import axios from 'axios';
import { useHistory,useLocation } from 'react-router-dom';
import withRouter from 'react-router-dom';
export default class HostedEvent extends Component {
    constructor(props){
super(props)

const userid= localStorage.getItem("userid")
this.state={
    newbookings:[],
    userid:userid,
}


    }
componentDidMount(){
    const filldashboard  =async (event)=>{
       let userid=this.state.userid;

       axios({
        method: "post",
        url: "http://localhost:5000/api/myevents",
        data: {
    userid:userid,
    
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

           }; 
     filldashboard();


}

handleView=(eventid)=>{
    localStorage.setItem("editevent",eventid);
    this.props.history.push("/addevent");

}

    render() {
        const {newbookings}=this.state;
        let seatavail=0;
        return (
            <>







<div className="card">
                      <div className="ribbon-wrapper ribbon-xl">
                        <div className="ribbon bg-danger">
                     Hosted EVENTS
                        </div>
                      </div>
                                  
                        
                          <table id="example1" className="table table-bordered table-striped">
                  <thead>
                    <tr>
                                      
                      <th> Date</th>
                      <th> Event </th>
                      <th>Venue </th>
                      <th> Slot(s) </th>
                      <th> Seats(s) </th>
                      <th> Booked </th>
                      <th> Available </th>
                        <th >Action</th>
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

    <td width="15%">  {newbookings.dfrom} </td> 
    <td width="20%">  {newbookings.title} </td> 
    <td width="25%">  {newbookings.venue} </td> 
    <td width="4%">  {newbookings.no_slots} </td> 
    <td width="4%"> <span className="badge badge-info">  {newbookings.seats * newbookings.no_slots } </span></td> 
    <td width="4%"> <span className="badge badge-danger"> {newbookings.bookedseats} </span> </td> 
     <td width="4%"><span className="badge badge-success"> {newbookings.seats * newbookings.no_slots -newbookings.bookedseats}</span> </td> 
    <td><span className="btn btn-info btn-xs"  onClick={() => this.handleView(newbookings.id)}>View Details</span> <span className="btn btn-success btn-xs"> Guest List</span></td>



        
                </tr>
                      ))} 
                   
                  </tbody>
                </table>

                    </div>
                  
    
          
                
            </>
        )
    }
}
