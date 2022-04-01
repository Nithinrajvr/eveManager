import React, { Component } from 'react'
import { Link,NavLink, Redirect } from 'react-router-dom'

import axios from 'axios';
import './ticket.css';
export default class ticket extends Component {
    constructor(props){
        super(props)
       const moviename=localStorage.getItem("moviename");
       const filepath=localStorage.getItem("filepath")
       const userid=localStorage.getItem("userid");
       const eventid=localStorage.getItem("eventid");
	   const moviedate=localStorage.getItem("moviedate");

        let ticketview=false;
        this.state={
            movie:moviename,
            filepath:"http://localhost:5000/"+filepath,
            seats:[],
			moviedate:moviedate,
        }
        
            }
        componentDidMount(){
            const filldashboard  =async (event)=>{
               let userid=localStorage.getItem("userid");
               let eventid=localStorage.getItem("eventid");
               
               console.log(eventid);
               axios({
                method: "post",
                url: "http://localhost:5000/api/booking/myseats",
                data: {
            userid:userid,
            eventid:eventid,
            
                  },
                headers: { "Content-Type": "application/json" },
                  })
             .then(res=>{
                 console.log(res);
                 console.log(res.data);
                         this.setState({
                           seats:res.data.seats,
        
                   });
             });
        
                   }; 
             filldashboard();
        
        
        }
        
    render() {
        const {movie,filepath,seats}=this.state;
        return (
            <>


<div className="ticket">
	<div className="holes-top"></div>
	<div className="title">
		<p className="cinema"> CINEMA PRESENTS</p>
		<p className="movie-title">{movie}</p>
	</div>
	<div className="poster" align="center">
		<img src= {filepath} alt="Movie: Only God Forgives" />
	</div>
	<div className="info">
	<table>
		<tr>
			<th>SCREEN</th>
			<th>ROW</th>
			<th>SEAT</th>
		</tr>
		<tr>
			<td className="bigger">Seats</td>

			
			<td className="">
         </td>
		</tr>
		<tr>

			<td> <h3> {seats.map((seats,index)=>(
              <>
              {seats.seatno} ,
              
              
              </>
			
          ) ) }   </h3></td>
		</tr>
	</table>
	<table>
		<tr>
			<th></th>
			<th>DATE</th>
			<th>TIME</th>
		</tr>
		<tr>
			<td></td>
			<td>{this.state.moviedate}</td>
			<td></td>
		</tr>
	</table>
	</div>
	<div className="holes-lower"></div>
	<div className="serial">
		<table className="barcode"><tr></tr></table>
		<table className="numbers">
			<tr>
				<td>9</td>
				<td>1</td>
				<td>7</td>
				<td>3</td>
				<td>7</td>
				<td>5</td>
				<td>4</td>
				<td>4</td>
				<td>4</td>
				<td>5</td>
				<td>4</td>
				<td>1</td>
				<td>4</td>
				<td>7</td>
				<td>8</td>
				<td>7</td>
				<td>3</td>
				<td>4</td>
				<td>1</td>
				<td>4</td>
				<td>5</td>
				<td>2</td>
			</tr>
		</table>
	</div>
</div>
            </>
        )
    }
}
