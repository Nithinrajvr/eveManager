import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import { Redirect } from "react-router";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import "./seats.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dateFormat from "dateformat";
export default class Evdetails extends Component {
  constructor(props) {
    super(props);

    let eventid = localStorage.getItem("eventid");

    const price = localStorage.getItem("price");
    // localStorage.removeItem("eventid");
    // localStorage.removeItem("price");

    let available = 0;

    const token = localStorage.getItem("token");
    const fullname = localStorage.getItem("fullname");
    const userid = localStorage.getItem("userid");
    const email = localStorage.getItem("email");
    let loggedIn = true;
    let bookingStart = false;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      eventid: eventid,
      notickets: 0,
      fullname,
      email,
      userid,
      loggedIn,
      bookingStart,
      amount: 0,
      price: price,
      seats: "",
      title: "",
      evedetails: "",
      bookedcount: "",
      available: "",
    };

    axios({
      method: "post",
      url: "http://localhost:5000/api/ev/event",
      data: {
        eventid: eventid,
      },
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res.data);

      const available = res.data[0]["seats"] - this.state.bookedcount;

      this.setState({
        seats: res.data[0]["seats"],
        title: res.data[0]["title"],
        price: res.data[0]["price"],
        venue: res.data[0]["venue"],
        datefrom: dateFormat(res.data[0]["dfrom"], "dd-mmm-yyyy"),
        evedetails: res.data[0]["edescp"],
        available: res.data[0]["seats"],
      });
    });

    axios({
      method: "post",
      url: "http://localhost:5000/api/ev/tcount",
      data: {
        eventid: eventid,
      },
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res.data);
      let bookedcount = res.data[0]["ticketcount"];

      available = this.state.available;
      available = available - bookedcount;
      this.setState({
        bookedcount: res.data[0]["ticketcount"],
        available: available,
      });
    });
  }

  componentDidMount() {}

  // handleBooking=()=>{

  //   const {notickets,price,amount,userid,eventid,email}=this.state

  //   axios({
  //     method: "post",
  //     url: "http://localhost:5000/api/booking",
  //     data: {
  // eventid:eventid,
  // userid:userid,
  // email:email,
  // etype:'1',
  // no_tickets:notickets,
  // booking_amt:amount,
  // status:'1',

  //       },
  //     headers: { "Content-Type": "application/json" },
  //       })
  //       .then(res=>{
  //           console.log(res.data);
  //           this.setState({
  //             bookedcount:res.data[0]['ticketcount'],
  //                        })

  //       })

  // }

  handleChange = (event) => {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });

    let notickets = this.state.notickets;
    let price = this.state.price;
    let amount = event.target.value * price;
    this.setState({
      amount: amount,
    });
  };

  handleBooking = async () => {
    const { notickets, price, amount, userid, eventid, email, available } =
      this.state;

    const { loggedIn } = this.state;

    if (loggedIn) {
      if (notickets > available) {
        toast("Sorry You can not book more than " + available);
      } else {
        await axios({
          method: "post",
          url: "http://localhost:5000/api/booking",
          data: {
            eventid: eventid,
            userid: userid,
            email: email,
            etype: "1",
            no_tickets: notickets,
            booking_amt: amount,
            status: "1",
          },
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          console.log(res);
          console.log(res.data);

          if (res.data.inserted == true) {
            toast("Booked Successfully");
            //  event.target.reset();
            alert("Booked Successfully .");
            this.props.history.push("/dashboard");
          }
        });
      }
    } else {
      this.setState({
        bookingStart: true,
      });
      localStorage.setItem("bookingStart", this.state.bookingStart);
      this.props.history.push({
        pathname: "/login",
      });
    }
  };

  render() {
    const {
      eventid,
      seats,
      title,
      venue,
      price,
      datefrom,
      evedetails,
      amount,
      notickets,
      bookedcount,
      available,
    } = this.state;
    return (
      <>
        <Navbar />
        <ToastContainer />

        <div className="content-wrapper">
          <section className="content">
            <div
              className="card card-solid"
              style={{ paddingRight: "40px", width: "95%" }}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <h3 className="d-inline-block d-sm-none"></h3>
                    <h3 className="my-3">
                      <small>
                        {" "}
                        <span className="badge btn-danger  btn-xs">
                          {" "}
                          COMEDY SHOW{" "}
                        </span>{" "}
                      </small>
                      <h3> {title}</h3>{" "}
                    </h3>

                    <div className="row">
                      <div className="col-6">
                        <p>
                          <i class="fa fa-list-alt" aria-hidden="true"></i>{" "}
                          Venue: {venue}{" "}
                        </p>
                        <p>
                          <i class="fa fa-calendar" aria-hidden="true"></i>{" "}
                          {datefrom}{" "}
                        </p>
                      </div>
                      <div className="col-6">
                        <p>
                          {" "}
                          <i className="fas fa-chair text-success"></i> Seats:{" "}
                          {seats} Booked : {bookedcount}{" "}
                        </p>
                        <p>
                          {" "}
                          <strong>
                            {" "}
                            <span className="text-danger"> $</span>{" "}
                          </strong>{" "}
                          <strong> {price} </strong> per person
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8"></div>
                      <div className="col-4">Available {available}</div>
                    </div>
                    <hr />

                    <img
                      src="images/eve.png"
                      style={{ width: "450px", height: "300px" }}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <p>
                      {" "}
                      <h4>Event Details</h4>
                      {evedetails}{" "}
                    </p>
                    <br />
                    Disclaimer
                    <hr />
                    <div className="row" style={{ paddingLeft: "20px" }}>
                      <p align="justify">
                        {" "}
                        <i
                          className="fa fa-life-ring  fa-spin"
                          aria-hidden="true"
                        ></i>{" "}
                        The views expressed by the individual artists and
                        performes, either in course of their performance , or on
                        their social media channels , are solely their own and
                        neither do they represent those of eveManager nor are
                        they endorsed in any manner by eveManaer.
                      </p>
                      <p align="justify">
                        {" "}
                        <i
                          className="fa fa-life-ring  fa-spin"
                          aria-hidden="true"
                        ></i>{" "}
                        eveManager shall not be held liable or responsible for
                        any violation of intellectual property rights that may
                        arise out of any Artist performance or Event programme{" "}
                      </p>
                    </div>
                    Terms and Condition
                    <hr />
                    <div className="row" style={{ paddingLeft: "20px" }}>
                      <p align="justify">
                        {" "}
                        <i
                          className="fa fa-life-ring  fa-spin"
                          aria-hidden="true"
                        ></i>{" "}
                        It is complusory to wear masks at alltime. No entry
                        without mask
                      </p>
                      <p align="justify">
                        {" "}
                        <i
                          className="fa fa-life-ring  fa-spin"
                          aria-hidden="true"
                        ></i>{" "}
                        The Organizer does not take reponsibility of Car
                        Parking. Pleace check facilities at venue.
                      </p>
                      <p align="justify">
                        {" "}
                        <i
                          className="fa fa-life-ring  fa-spin"
                          aria-hidden="true"
                        ></i>{" "}
                        Video Recording and flash photography is strictly
                        prohibited for the duration of event.
                      </p>
                    </div>
                    <div className="row">
                      <div
                        className="mt-2"
                        style={{
                          float: "left",
                          paddingTop: "10px",
                          marginRight: "2px",
                        }}
                      >
                        Number of Ticket(s)
                      </div>
                      <div className="mt-2" style={{ paddingLeft: "20px" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.notickets}
                          name="notickets"
                          style={{
                            width: "100px",
                            paddingLeft: "20px",
                            marginLeft: "10px",
                          }}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="mt-2"
                        style={{
                          float: "left",
                          paddingTop: "10px",
                          marginRight: "2px",
                        }}
                      >
                        Amount : <strong>{amount}</strong>
                      </div>
                      <div
                        className="mt-2"
                        style={{ paddingLeft: "20px" }}
                      ></div>
                    </div>
                    <div className="row">
                      {available > 0 ? (
                        <>
                          <div
                            className="mt-2"
                            style={{ float: "right", marginLeft: "20px" }}
                          >
                            <div
                              className="btn btn-danger  btn-flat"
                              onClick={this.handleBooking}
                            >
                              <i class="fa fa-film" aria-hidden="true"></i> Book
                              Now
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className="mt-2"
                            style={{ float: "right", marginLeft: "20px" }}
                          >
                            <div className="btn btn-danger  btn-flat disabled ">
                              <i class="fa fa-film" aria-hidden="true"></i>{" "}
                              Sorry ! Seats Not Available
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div></div>
          </section>
        </div>
      </>
    );
  }
}
