import React, { Component ,useState} from 'react'
import {Link, Redirect} from 'react-router-dom'

export default class Logout extends Component {
    constructor(props){
        super(props)
        let loggedIn=false
        localStorage.removeItem("token")
        localStorage.removeItem("userid")
        localStorage.removeItem("fullname")
        localStorage.removeItem("email")
        localStorage.removeItem("address")
        localStorage.removeItem("ccity")
        localStorage.removeItem("cstate")
        localStorage.removeItem("mobile")
        localStorage.removeItem("cpincode")
        this.state={
            loggedIn,
            userid:'',
            fullname:'',
        }
    }
    render() {
        if(this.state.loggedIn==false){

            return <Redirect to="/"/>
        }
        return ( 
            <>
            You have been logged 
            <Link to="/login"> Login Again</Link>
            </>
        )
    }
}
