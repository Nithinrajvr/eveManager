import React, { Component } from "react";
import "./Event.css";

import {
  Link,
  NavLink,
  useLocation,
  useState,
  Redirect,
} from "react-router-dom";
import axios from "axios";

export default class EventHome extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("token");
    const fullname = localStorage.getItem("fullname");
    const userid = localStorage.getItem("userid");

    this.state = {
      token,
      fullname,
      userid,
      movies: [],
      eventid: "",
      eveshow: "false",
    };
    this.fillmovies();
  }
  componentDidMount() {}
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
  fillmovies = async (event) => {
    await axios({
      method: "GET",
      url: "http://localhost:5000/api/ev/latest",
      data: {},
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res);
      console.log(res.data);
      this.setState({
        movies: res.data.ev,
        eveshow: "true",
      });
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
        <div
          style={{ paddingLeft: "80px", paddingTop: "40px", textAlign: "left" }}
        >
          <h3> Events </h3>{" "}
          <h6>
            {" "}
            <small>
              <span className="text-danger"> Latest Events</span>{" "}
            </small>{" "}
          </h6>
          <div className="row">
            {movies.map((movies, index) => (
              <>
                <a href={movies.movieurl}>
                  <div
                    className="event-card"
                    style={{ marginLeft: "10px", marginBottom: "90px" }}
                  >
                    <div
                      className="card-body"
                      align="center"
                      style={{
                        height: "85%",
                        backgroundImage:
                          "url(http://localhost:5000/" +
                          <> {movies.filepath} </> +
                          ")",
                      }}
                    >
                      {movies.filepath ? (
                        <>
                          {" "}
                          <img
                            src={"http://localhost:5000/" + movies.filepath}
                            style={{ width: "95%", height: "100%" }}
                          />
                        </>
                      ) : (
                        <>
                          {" "}
                          <img src="images/eve.png" />
                        </>
                      )}
                    </div>

                    <div
                      className="card-footer"
                      style={{ backgroundColor: "#faf6be" }}
                    >
                      <div style={{ float: "left" }}>{movies.title}</div>

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
                </a>
              </>
            ))}
          </div>
          {/* row end */}
          <h4 style={{ float: "right", paddingRight: "150px" }}>
            {" "}
            <small>
              <span className="text-danger"> Explore all Events</span>{" "}
            </small>{" "}
          </h4>
        </div>
      </>
    );
  }
}
