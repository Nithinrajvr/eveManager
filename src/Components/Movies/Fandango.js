import React, { Component } from 'react'
import Navbar from '../Layout/Navbar'
import {Link,NavLink} from 'react-router-dom';
import './Moviesf.css';
import axios from 'axios';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class Movies extends Component {
    constructor(props){
        super(props)
        
        const token=localStorage.getItem("token")
        const fullname=localStorage.getItem("fullname")
        const userid= localStorage.getItem("userid")
        const email= localStorage.getItem("email")
        let loggedIn=true

  
        this.state={
            loggedIn,
            token,
            fullname,
            userid,
            email,
            movies:[],
            loading:' Please wait...Fetching Movie.....'
        }

    }
    

    componentDidMount() {
        const fillmovies  =async (event)=>{
                 var bodyFormData = new FormData();
          bodyFormData.append('userid', this.state.userid);
                
          await axios({
             method: "GET",
              url: "http://localhost:5000/api/moviescrape",
              data: bodyFormData,
              headers: { "Content-Type": "application/json" },
            })
              .then(res=>{
                  console.log(res);
                  console.log(res.data);
                          this.setState({
                     movies:res.data,
                     loading:''
   
                    });
              });
        
                    }; 
                    fillmovies();
  
      }
    render() {
        const { movies} = this.state;
        return (
            <>
            <Navbar/>

            <div className="row">
                <div className="col-4">
                <img src="images/movbanner4.jpg" style={{"width":"350px"}}/>
                </div>
                <div className="col-8" style={{"textAlign":"right"}}>
                <img src="images/fandango.png" />
 </div>
            </div>
            <hr/>



           
          
                
            <div className="wrapper" style={{"paddingLeft":"200px"}}>

<section className="content">
<div className="container-fluid">
<h3 className="text-info"></h3>
<div className="row">

<h1>{ this.state.loading}</h1>
{(this.state.loading)?(<> <img src="images/loading.gif" /></>):(<> </>)}

{

movies.map((movies,index)=>(

    <>
    <a href={movies.movieurl}>
          <div className="movies-card2"style={{"marginLeft":"40px","marginBottom":"90px"}}>

          <div className="card-body"  align="center" style={{"height":"90%","backgroundImage":'url('+<> { movies.imgurl} </> +')' }}>
          <img src= {movies.imgurl} style={{"width":"90%","height":"90%"}} />
         </div>
         {(movies.releasedate)? (<>
         <div className="card-footer" style={{"color":"#fff","backgroundColor":"#000"}}>
         {movies.releasedate}
            <div style={{"float":"right"}}>
    
            </div>
         </div>
         </>):(<>
            <div className="card-footer">
      
            <div style={{"float":"right"}}>

            </div>
         </div>
         
         </>)}
         <p> {movies.title} </p>
     </div>
     </a>


  
</>


  ))}





</div>



    </div>


</section></div> 
            </>
        )
    }
}
