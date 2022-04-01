import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import {
  Link,
  NavLink,
  useLocation,
  useState,
  Redirect,
} from "react-router-dom";
import "./Event.css";
import axios from "axios";
import { useRoutes } from "react-router-dom";
import { Navigate, NavigationType } from "react-router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import dateFormat from "dateformat";

export default class Ev extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("token");
    const fullname = localStorage.getItem("fullname");
    const userid = localStorage.getItem("userid");
    const email = localStorage.getItem("email");
    let loggedIn = true;
    localStorage.removeItem("eventid");
    const today = new Date();
    this.state = {
      loggedIn,
      token,
      fullname,
      userid,
      email,
      movies: [],
      eventid: "",
      datefrom: today,
      datefrom2: "",
      etype: "",
      price: "",
    };
  }
  handleChange = (event) => {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  handlesearch = () => {
    let etype = this.state.etype;
    let datefrom = this.state.datefrom2;
    let price1 = "";
    let price2 = "";
    let price = this.state.price;
    if (price) {
      if (price == "1") {
        price1 = 0;
        price2 = 50;
      } else if (price == "2") {
        price1 = 50;
        price2 = 100;
      } else if (price == "3") {
        price1 = 100;
        price2 = 200;
      } else if (price == "4") {
        price1 = 200;
        price2 = 200000;
      }
    }
    let date2 = "";
    if (this.state.datefrom2) {
      date2 = dateFormat(this.state.datefrom2, "yyyy/m/d");
    }
    const today = dateFormat(this.state.datefrom, "yyyy/m/d");

    axios({
      method: "post",
      url: "http://localhost:5000/api/ev/search",
      data: {
        etype: etype,
        price: price,
        price1: price1,
        price2: price2,
        datefrom: date2,
        today: today,
      },
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res);
      console.log(res.data.movies);
      this.setState({
        movies: res.data.movies,
        loadmovies: res.data.response,
      });
    });
  };
  componentDidMount() {
    const fillmovies = async (event) => {
      var bodyFormData = new FormData();
      bodyFormData.append("userid", this.state.userid);

      await axios({
        method: "GET",
        url: "http://localhost:5000/api/ev",
        data: bodyFormData,
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({
          movies: res.data.ev,
        });
      });
    };
    this.handlesearch();
  }

  handleBooking = (movies) => {
    const eventid = movies.movies.id;
    console.log(movies);
    console.log(movies.movies.id);
    localStorage.setItem("eventid", movies.movies.id);
    localStorage.setItem("price", movies.movies.price);
    this.setState({
      eventid: movies.movies.id,
      rate: movies.movies.rate,
    });
  };

  setDatefrom = (date) => {
    this.setState({ datefrom2: date });
  };

  render() {
    const { movies, eventid } = this.state;

    if (this.state.eventid) {
      return (
        <Redirect
          to={{
            pathname: "/evedetails",
            state: { eventid: this.state.eventid },
          }}
        ></Redirect>
      );
    }

    return (
      <>
        <Navbar />

        <div className="row">
          <div className="col-4">
            <img src="images/eve.png" style={{ width: "200px" }} />
          </div>
          <div className="col-8" style={{ textAlign: "right" }}>
            <h1
              className="text-info"
              style={{ paddingRight: "150px", paddingTop: "50px" }}
            >
              {" "}
              Events{" "}
            </h1>{" "}
            <span style={{ paddingRight: "30px" }}>
              {" "}
              Explore Movies, Cinemas & Live Shows
            </span>{" "}
          </div>
        </div>
        <hr />

        {/* <div style={{"width":"100%","height":"100px","backgroundColor":"#fff","paddingLeft":"300px"}}>
                <small>Select Language </small> <br/>
          <span className="btn btn-primary btn-xs"> English </span>  <span className="btn btn-default btn-xs"> Spanish </span>  <span className="btn btn-default btn-xs"> French </span>
            </div> */}

        <div className="wrapper" style={{ marginLeft: "30px" }}>
          {/* <Link to="/movieposter"><span className="btn btn-default btn-sm"> + New Event</span></Link> */}

          <div
            className="row"
            style={{ border: "0px solid", width: "100%", paddingRight: "0px" }}
          >
            <div
              className="col-lg-2 border-right"
              style={{ align: "left", paddingRight: "20px" }}
            >
              Search Events(s)
              <div className="row">
                <label>Event Type</label>
                <select
                  name="etype"
                  className="form-control"
                  value={this.state.etype}
                  onChange={this.handleChange}
                >
                  <option value="" selected>
                    All
                  </option>
                  <option value="2">Events</option>
                  <option value="3">Play</option>
                  <option value="4">Corporate</option>
                  <option value="3">Personal</option>
                </select>
              </div>
              <div
                className="row"
                style={{ align: "right", marginTop: "20px" }}
              >
                <label>Date</label>

                <DatePicker
                  name="datefrom"
                  selectsStart
                  startDate={this.state.datefrom2}
                  endDate={this.state.dateto}
                  placeholderText="Select Event date"
                  className="form-control"
                  selected={this.state.datefrom2}
                  onChange={(date) => this.setDatefrom(date)}
                  minDate={new Date()}
                  value={this.state.datefrom2}
                  dateFormat="dd-MMM-Y"
                  //maxDate={new Date().setDate(new Date().getDate()+ 6)}
                  //       onCalendarOpen={this.handleCalendarOpen}
                  //              onCalendarClose={this.handleCalendarClose}
                />
              </div>
              <div className="row">
                <label>Price</label>
                <select
                  name="price"
                  className="form-control"
                  value={this.state.price}
                  onChange={this.handleChange}
                >
                  <option value="" selected>
                    {" "}
                    Select Price
                  </option>
                  <option value="1"> Less than 50</option>
                  <option value="2"> 50-100</option>
                  <option value="3"> 101-200</option>
                  <option value="4"> More than 200 </option>
                </select>
              </div>
              <div
                className="row"
                style={{ align: "right", marginTop: "20px" }}
              >
                <div style={{ float: "right", right: "0px" }}>
                  <button className="btn btn-info" onClick={this.handlesearch}>
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="col-10">
              <section className="content">
                <div className="container-fluid">
                  <div className="row">
                    {this.state.loadmovies == "success" ? (
                      movies.map((movies, index) => (
                        <div className="col-4">
                          <div
                            className="movies-card2"
                            style={{ marginLeft: "5px", marginBottom: "30px" }}
                          >
                            <div
                              className=""
                              style={{
                                position: "absolute",
                                marginTop: "20px",
                              }}
                            ></div>
                            <div
                              className="card-body"
                              align="center"
                              style={{ height: "90%", align: "center" }}
                            >
                              <h3> {movies.title} </h3>

                              <div
                                className="text-danger"
                                style={{ float: "right", position: "absolute" }}
                              >
                                Price: {movies.price}
                              </div>
                              {movies.filepath ? (
                                <>
                                  {" "}
                                  <img
                                    src={
                                      "http://localhost:5000/" + movies.filepath
                                    }
                                    style={{ width: "70%", height: "80%" }}
                                  />
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <img
                                    src="images/eve.png"
                                    style={{ width: "80%", height: "80%" }}
                                  />
                                </>
                              )}
                            </div>
                            <div
                              className="card-footer"
                              style={{
                                color: "#fff",
                                backgroundColor: "#000",
                                zIndex: "-200",
                              }}
                            >
                              - Date {dateFormat(movies.dfrom, "d/mmm/yyyy")}
                              <div style={{ float: "left" }}>
                                {movies.venue}
                              </div>
                              <div style={{ float: "right" }}>
                                <button
                                  className="btn-danger btn-xs"
                                  style={{ marginLeft: "5px" }}
                                  onClick={() => this.handleBooking({ movies })}
                                >
                                  Book Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        {" "}
                        <img src="images/loading.gif" />{" "}
                        <p align="center">No Event found.... </p>
                      </>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </>
    );
  }
}
