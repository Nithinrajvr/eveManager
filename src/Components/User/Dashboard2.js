import React, { Component } from "react";

import Navbar2 from "../Layout/Navbar2";
import { Link, NavLink } from "react-router-dom";
import NavbarHost from "../Layout/NavbarHost";
import HostedEvent from "./Host/HostedEvents";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import withRouter from "react-router-dom";
import dateFormat from "dateformat";

export default class Dashboard2 extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("token");
    const fullname = localStorage.getItem("fullname");
    const userid = localStorage.getItem("userid");
    const email = localStorage.getItem("email");
    let loggedIn = true;

    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      token,
      fullname,
      userid,
      email,
      newbookings: [],
      hostedmovies: [],
      userid: userid,
    };
  }
  componentDidMount() {
    const filldashboard = async (event) => {
      let userid = this.state.userid;

      axios({
        method: "post",
        url: "http://localhost:5000/api/myevents",
        data: {
          userid: userid,
        },
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({
          newbookings: res.data,
        });
      });
    };
    const fillhostedmovie = async (event) => {
      let userid = this.state.userid;

      axios({
        method: "post",
        url: "http://localhost:5000/api/myevents/movies",
        data: {
          userid: userid,
        },
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({
          hostedmovies: res.data,
        });
      });
    };
    fillhostedmovie();
    filldashboard();
  }

  handleView = (eventid) => {
    localStorage.setItem("editevent", eventid);
    this.props.history.push("/editevent");
  };
  handleGuestlist = (eventid) => {
    localStorage.setItem("editevent", eventid);
    this.props.history.push("/guestlist");
  };
  render() {
    const { fullname, email } = this.state;
    const { newbookings, hostedmovies } = this.state;
    let seatavail = 0;
    return (
      <>
        <NavbarHost />

        <div className="" style={{ padding: "50px" }}>
          <div className="content">
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-4">
                    <h1 className="m-0">
                      {" "}
                      <i className="fa fa-university"></i> Dashboard
                    </h1>
                    Welcome {fullname}
                  </div>
                  <div className="col-sm-4"></div>
                  <div className="col-sm-4">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <a href="#">Home</a>
                      </li>
                      <li className="breadcrumb-item active">Dashboard </li>
                    </ol>
                    <Link to="/addevent">
                      <span className="btn btn-default btn-sm">
                        {" "}
                        + New Event
                      </span>
                    </Link>
                    <Link to="/postmovie">
                      <span className="btn btn-default btn-sm">
                        {" "}
                        + Host a Movie Sow{" "}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-12">
                  <h4> Event Hosted By Me </h4>
                  <div className="card">
                    <div className="ribbon-wrapper ribbon-sm">
                      <div className="ribbon bg-danger">Hosted EVENTS</div>
                    </div>
                    <div className="row">
                      <a
                        href="#"
                        id="csvexp"
                        className="btn btn-secondary"
                        style={{ width: "200px" }}
                      >
                        Export as Excel{" "}
                      </a>
                      <a
                        href="#"
                        id="print"
                        className="btn btn-secondary"
                        style={{ width: "200px" }}
                      >
                        Print{" "}
                      </a>
                    </div>
                    <table
                      id="example1"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th> Date</th>
                          <th> Event </th>
                          <th>Venue </th>
                          <th> Slot(s) </th>
                          <th> Seats(s) </th>
                          <th> Booked </th>
                          <th> Available </th>
                          <th>Action</th>
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

                        {newbookings.map((newbookings, index) => (
                          <tr key={newbookings.id}>
                            <td width="15%">
                              {" "}
                              {dateFormat(newbookings.dfrom, "d-mmm-yyyy")}{" "}
                            </td>
                            <td width="20%"> {newbookings.title} </td>
                            <td width="25%"> {newbookings.venue} </td>
                            <td width="4%"> {newbookings.no_slots} </td>
                            <td width="4%">
                              {" "}
                              <span className="badge badge-info">
                                {" "}
                                {newbookings.seats * newbookings.no_slots}{" "}
                              </span>
                            </td>
                            <td width="4%">
                              {" "}
                              <span className="badge badge-danger">
                                {" "}
                                {newbookings.bookedseats}{" "}
                              </span>{" "}
                            </td>
                            <td width="4%">
                              <span className="badge badge-success">
                                {" "}
                                {newbookings.seats * newbookings.no_slots -
                                  newbookings.bookedseats}
                              </span>{" "}
                            </td>
                            <td>
                              <button
                                className="btn btn-info btn-xs"
                                onClick={() => this.handleView(newbookings.id)}
                              >
                                View{" "}
                              </button>{" "}
                            </td>
                            <td>
                              <button
                                className="btn btn-danger btn-xs"
                                onClick={() =>
                                  this.handleGuestlist(newbookings.id)
                                }
                              >
                                {" "}
                                Guest List
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-12">
                  <h4> Hosted Movies </h4>
                  <div className="card">
                    <div className="ribbon-wrapper ribbon-sm">
                      <div className="ribbon bg-primary">Movies</div>
                    </div>

                    <table
                      id="example1"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th> Date</th>
                          <th> Movie Title </th>
                          <th>Venue </th>
                          <th> Slot(s) </th>
                          <th> Seats(s) </th>
                          <th> Booked </th>
                          <th> Available </th>
                          <th>Action</th>
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

                        {hostedmovies.map((hostedmovies, index) => (
                          <tr key={hostedmovies.id}>
                            <td width="15%">
                              {" "}
                              {dateFormat(
                                hostedmovies.dfrom,
                                "d-mmm-yyyy"
                              )}{" "}
                            </td>
                            <td width="20%"> {hostedmovies.title} </td>
                            <td width="25%"> {hostedmovies.venue} </td>
                            <td width="4%"> {hostedmovies.no_slots} </td>
                            <td width="4%">
                              {" "}
                              <span className="badge badge-info">
                                {" "}
                                {hostedmovies.seats *
                                  hostedmovies.no_slots}{" "}
                              </span>
                            </td>
                            <td width="4%">
                              {" "}
                              <span className="badge badge-danger">
                                {" "}
                                {hostedmovies.bookedseats}{" "}
                              </span>{" "}
                            </td>
                            <td width="4%">
                              <span className="badge badge-success">
                                {" "}
                                {hostedmovies.seats * hostedmovies.no_slots -
                                  hostedmovies.bookedseats}
                              </span>{" "}
                            </td>
                            <td>
                              <button
                                className="btn btn-info btn-xs"
                                onClick={() => this.handleView(hostedmovies.id)}
                              >
                                View{" "}
                              </button>{" "}
                            </td>
                            <td>
                              <button
                                className="btn btn-danger btn-xs"
                                onClick={() =>
                                  this.handleGuestlist(hostedmovies.id)
                                }
                              >
                                {" "}
                                Guest List
                              </button>
                            </td>
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

        <div style={{ display: "none" }}>
          This is DIV and Nothing is visible in it . Its for Printing
          <div id="printableArea">
            <table id="printtable" className="table table-bordered">
              <thead>
                <tr>
                  <th> Date</th>
                  <th> Event </th>
                  <th>Venue </th>
                  <th> Slot(s) </th>
                  <th> Seats(s) </th>
                  <th> Booked </th>
                  <th> Available </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="printbody"></tbody>
            </table>
          </div>
          <div id="printableArea2">
            <table id="printtable2" className="table table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Gatepass No</th>

                  <th>Invoice Amt </th>
                  <th>Rec. Amt</th>
                  <th>Pending Amt</th>
                </tr>
              </thead>
              <tbody id="printbody2"></tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
