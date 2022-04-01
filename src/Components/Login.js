import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    let loggedIn = true;
    const token = localStorage.getItem("token");
    let bookingStart = false;
    bookingStart = localStorage.getItem("bookingStart");

    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      email: "",
      password: "",
      loggedIn,
      msg: "",
      bookingStart,
    };
    this.onChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange = (event) => {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();

    const { email, password, msg } = this.state;
    //logic Magic
    toast("Please wait....checking credentials");
    console.log(this.state.email);
    var bodyFormData = new FormData();
    bodyFormData.append("email", this.state.email);
    bodyFormData.append("password", this.state.password);

    await axios({
      method: "post",
      url: "http://localhost:5000/api/users/login",
      data: {
        email: this.state.email,
        password: this.state.password,
      },
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res);
      console.log(res.data);

      if (res.data.loggedin == true) {
        console.log(res.data.user[0]["fullname"]);
        localStorage.removeItem("userid");

        localStorage.setItem("token", this.generate_token(20));
        localStorage.setItem("fullname", res.data.user[0]["fullname"]);
        localStorage.setItem("userid", res.data.user[0]["id"]);
        localStorage.setItem("email", res.data.user[0]["email"]);
        // localStorage.setItem("address",res.data.address)
        // localStorage.setItem("ccity",res.data.ccity)
        // localStorage.setItem("cstate",res.data.cstate)
        // localStorage.setItem("cpincode",res.data.cpincode)
        // localStorage.setItem("mobile",res.data.mobile)

        this.setState({
          loggedIn: true,
          msg: "Login successfully",
        });
        toast("Login Successfully");
        this.props.history.push("/dashboard");

        // if (this.state.bookingStart) {
        //   this.props.history.push("/evedetails");
        // } else {
        //   this.props.history.push("/dashboard");
        // }
      } else {
        toast("Invalid Username/Password");
      }
    });
  };

  generate_token(length) {
    //edit the token allowed characters
    var a =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
        ""
      );
    var b = [];
    for (var i = 0; i < length; i++) {
      var j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join("");
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/dashboard"></Redirect>;
    }

    return (
      <>
        <Navbar />
        <ToastContainer />

        <section id="banner" className="banner-section">
          <div className="container">
            <div className="row">
              <div className="col-4">
                <p>
                  {" "}
                  <i class="fa fa-lock text-danger" aria-hidden="true">
                    {" "}
                  </i>{" "}
                  Sign in to start your session
                </p>
                <h1> </h1>
                <form onSubmit={this.submitForm}>
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={this.state.email}
                      name="email"
                      onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope"></span>
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock"></span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6"></div>

                    <div className="col-2"> </div>
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-danger btn-block"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                  <br />
                  <h6>
                    {" "}
                    <Link to="/forgot" className="text-danger">
                      Forgot Password ?
                    </Link>{" "}
                    <Link to="/register" style={{ float: "right" }}>
                      {" "}
                      New User ?{" "}
                    </Link>
                  </h6>{" "}
                  Sign up/In here to Start using Services
                </form>
              </div>
              <div className="col-2"></div>
              <div className="col-6">
                <div className="widget_heading"></div>
                <div
                  className="banner_content"
                  style={{
                    paddingTop: "0px",
                    paddingLeft: "20px",
                    align: "right",
                  }}
                >
                  <h1 style={{ color: "#000", paddingLeft: "200px" }}>
                    List Your Show
                  </h1>
                  <p style={{ color: "#000", paddingLeft: "200px" }}>
                    {" "}
                    Got a{" "}
                    <strong>
                      Show,Event,Activity or a Great Experience?
                    </strong>{" "}
                    <br /> Partner with us & get Listed on eveManager
                    <br />
                    <a href="#" className="btn">
                      Read More{" "}
                      <span className="angle_arrow">
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                      </span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
