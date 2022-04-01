import React, { useState } from "react";
import axios from "axios";
import { componentDidMount } from "react-dom";
import { render } from "@testing-library/react";
import { Link, NavLink } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import withRouter from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router";

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: "",
      email: "",
      mobile: "",
      inserted: "",
      password: "",
      password2: "",
      squestion: "What was your favorite school teacher’s name?",
      answer: "",
    };
  }
  handleReset = async () => {
    this.setState = {
      fullname: "",
      email: "",
      mobile: "",
      password: "",
      password2: "",
      squestion: "What was your favorite school teacher’s name?",
      answer: "",
    };
  };

  handleChange = (event) => {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    let password = this.state.password;
    let password2 = this.state.password2;
    if (password == password2) {
      toast("Please wait....");
      var bodyFormData = new FormData();
      bodyFormData.append("fullname", this.state.fullname);
      bodyFormData.append("email", this.state.email);
      bodyFormData.append("mobile", this.state.mobile);
      bodyFormData.append("password", this.state.password);
      bodyFormData.append("squestion", this.state.squestion);
      bodyFormData.append("answer", this.state.answer);
      await axios({
        method: "post",
        url: "http://localhost:5000/api/users",
        data: {
          fullname: this.state.fullname,
          email: this.state.email,
          password: this.state.password,
          mobile: this.state.mobile,
          squestion: this.state.squestion,
          answer: this.state.answer,
        },
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        console.log(res);
        console.log(res.data);

        if (res.data.inserted == "true") {
          this.setState({
            inserted: "true",
          });
          //  event.target.reset();
          alert("Registered Successfully .");
        }
      });
    } else {
      toast("Password Not Matched.....");
    }
  };

  render() {
    if (this.state.inserted == "true") {
      alert(
        "Registered Successfully!! Please check your email for Login Credentials...."
      );

      return <Redirect to="/login" />;
    }

    const { fullname, email, squestion, mobile, answer, password, password2 } =
      this.state;
    return (
      <>
        <ToastContainer />

        <nav
          className="navbar navbar-expand-lg navbar-light bg-light"
          style={{ backgroundColor: "transparent" }}
        >
          <div className="container-fluid" style={{ paddingLeft: "200px" }}>
            <a className="navbar-brand" href="#">
              {" "}
              <i className="fa fa-motorcycle" aria-hidden="true"></i>
              <strong> Bike</strong>SHARE
            </a>

            <div style={{ paddingLeft: "60%" }}></div>
          </div>
        </nav>

        <section id="banner" className="banner-section">
          <div className="container">
            <p>
              {" "}
              <i class="fa fa-lock text-danger" aria-hidden="true">
                {" "}
              </i>{" "}
              Register to Share/Book Ride
            </p>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="row">
                <div className="col-6">
                  <div className="row">
                    <div className="col-8">
                      <label>
                        {" "}
                        <i className="fas fa-user"></i> Full Name{" "}
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        className="form-control"
                        initialValue=""
                        placeholder="Enter Full name"
                        value={fullname}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-8">
                      <label>
                        {" "}
                        <i className="fas fa-mail"></i> Email{" "}
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        initialValue=""
                        placeholder="Enter email address"
                        value={email}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4">
                      <label>
                        {" "}
                        <i className=""></i> Password{" "}
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        initialValue=""
                        placeholder="Enter password"
                        value={password}
                        onChange={this.handleChange}
                        required
                      />
                    </div>

                    <div className="col-4">
                      <label>
                        {" "}
                        <i className=""></i> Confirm Password{" "}
                      </label>

                      <input
                        type="password"
                        name="password2"
                        className="form-control"
                        initialValue=""
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-8">
                      <label> Contact Details</label>
                      <input
                        type="text"
                        name="mobile"
                        className="form-control"
                        initialValue=""
                        placeholder="Enter Mobile No"
                        value={mobile}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label>
                    {" "}
                    <i className="fas fa-secure"></i> Security Question
                  </label>
                  <div className="row">
                    <div className="col-8">
                      <select
                        name="squestion"
                        className="form-control"
                        value={squestion}
                        onChange={this.handleChange}
                      >
                        <option
                          value="What was your favorite school teacher’s name?"
                          selected
                        >
                          What was your favorite school teacher’s name?{" "}
                        </option>
                        <option value="What was the make and model of your first car?">
                          What was the make and model of your first car?
                        </option>
                        <option value="In what city or town did your parents meet?">
                          In what city or town did your parents meet?
                        </option>
                        <option value="What was your favorite place to visit as a child?">
                          What was your favorite place to visit as a child?
                        </option>
                        <option value="What is the name of the first school you attended?">
                          What is the name of the first school you attended?
                        </option>
                        <option value="What was the make and model of your first car?">
                          What was the make and model of your first car?
                        </option>
                        <option value="What is your favorite TV program?">
                          What is your favorite TV program?
                        </option>
                        <option value="What was the last name of your favorite teacher?">
                          What was the last name of your favorite teacher?
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-8">
                      <label>
                        {" "}
                        <i className="fas fa-an"></i> Your answer
                      </label>
                      <input
                        type="text"
                        name="answer"
                        className="form-control"
                        initialValue=""
                        placeholder="Enter Answer"
                        value={answer}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row" style={{ paddingTop: "50px" }}>
                    <div className="col-4"></div>

                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Register
                      </button>
                    </div>
                  </div>

                  <NavLink to="/login" className="text-center">
                    I already have a membership
                  </NavLink>
                </div>

                <div className="col-6">
                  <div className="widget_heading"></div>
                  <div
                    className="banner_content"
                    style={{ paddingTop: "40px", paddingLeft: "20px" }}
                  >
                    <h1 align="center">B I K E R S</h1>
                    <br />
                    <h3 style={{ color: "#000", paddingLeft: "200px" }}>
                      It was never so easy before..
                    </h3>
                    <p style={{ color: "#000", paddingLeft: "200px" }}>
                      {" "}
                      Discover how to <strong>Bike</strong>SHARE, safety tips,
                      prices, and more.
                      <br />
                      <a href="#" className="btn">
                        Read More{" "}
                        <span className="angle_arrow">
                          <i
                            className="fa fa-angle-right"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  }
}
