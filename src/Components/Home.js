import React, { Component } from 'react'
import { Link,NavLink } from 'react-router-dom'
import Navbar from './Layout/Navbar'
import MoviesHome from './Movies/MoviesHome'
import'./Home.css'
import EventHome from './Events/EventHome'
export default class Home extends Component {

    constructor(props){
        super(props)
        let loggedIn =true;
        const token=localStorage.getItem("token")
        if(token==null){
          loggedIn=false
         }
        this.state={
          email:'',
          password:'',
          loggedIn,
       
        }

    
      }




    render() {
        return (
            <>
              
             
<Navbar/>
<section id="banner"   className="banner" style={{"text-align":"Center","backgroundColor":""}}>

<div style={{"backgroundColor":"#faf6be","width":"100%","height":"100px","paddingTop":""}}>
<div style={{"float":"left"}}>
  <img src="images/pcorn3.png" style={{"width":"50%"}}/>
</div>
<div style={{"float":"right" ,"paddingTop":"50px","paddingRight":"30px"}}>
<h1> Movie Tickets, Plays, Sports, Events & Cinemas ...</h1>

  <h5> <i>

Check out the List of latest movies running in nearby theatres and multiplexes, for you to watch ....</i> </h5>
<h3 className='text-danger' >
<img src="images/fandango.png" style={{"width":"20%"}}/> <span style={{"paddingTop":"50px"}}> Movies , Hosted Movies , Corporate & Personal Events...</span></h3>
</div> 


</div>
<br/>
<br/>
<div className="row" style={{"width":"100%"}}> 

</div>
<div style={{"backgroundColor":"#fff","height":"100%","wdith":"50%","marginLeft":"5%","marginRight":"5%"}}>


<MoviesHome/>
<br/>


<EventHome/>
</div>
</section>

            </>
        )
    }
}
