import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import {
  Link,
  NavLink,
  useLocation,
  useState,
  Redirect,
} from "react-router-dom";
import "./Personal.css";
import axios from "axios";
import { useRoutes } from "react-router-dom";
import { Navigate, NavigationType } from "react-router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Personal extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("token");
    const fullname = localStorage.getItem("fullname");
    const userid = localStorage.getItem("userid");
    const email = localStorage.getItem("email");
    let loggedIn = true;
    localStorage.removeItem("eventid");

    this.state = {
      loggedIn,
      token,
      fullname,
      userid,
      email,
      movies: [],
      eventid: "",
    };
  }

  componentDidMount() {
    const fillmovies = async (event) => {
      var bodyFormData = new FormData();
      bodyFormData.append("userid", this.state.userid);

      await axios({
        method: "GET",
        url: "http://localhost:5000/api/ev/personal",
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
    fillmovies();
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
            <img src="images/personal.png" style={{ width: "200px" }} />
          </div>
          <div className="col-8" style={{ textAlign: "right" }}>
            <h1
              className="text-info"
              style={{ paddingRight: "150px", paddingTop: "50px" }}
            >
              {" "}
              Personal Events{" "}
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

        <div className="wrapper" style={{ paddingLeft: "100px" }}>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                {movies.map((movies, index) => (
                  <div
                    className="movies-card2"
                    style={{ marginLeft: "5px", marginBottom: "30px" }}
                  >
                    <div
                      className=""
                      style={{ position: "absolute", marginTop: "20px" }}
                    ></div>
                    <div
                      className="card-body"
                      align="center"
                      style={{ height: "90%", align: "center" }}
                    >
                      <h3> {movies.title} </h3>

                      {movies.filepath ? (
                        <>
                          {" "}
                          <img
                            src={"http://localhost:5000/" + movies.filepath}
                            style={{ width: "70%", height: "80%" }}
                          />
                        </>
                      ) : (
                        <>
                          {" "}
                          <img
                            src="images/personal.png"
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
                      <div style={{ float: "left" }}>{movies.venue}</div>
                      <div style={{ float: "right" }}>
                        <button
                          className="btn-danger btn-xs"
                          onClick={() => this.handleBooking({ movies })}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}
