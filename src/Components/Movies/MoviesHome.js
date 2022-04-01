import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import { Link, NavLink } from "react-router-dom";
import "./Movies.css";
import axios, { post } from "axios";
import { Redirect } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Movieposter from "./Movieposter";
import FileUpload from "../Fileupload";

export default class MoviesHome extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("token");
    const fullname = localStorage.getItem("fullname");
    const userid = localStorage.getItem("userid");
    let book = false;

    this.state = {
      token,
      fullname,
      userid,
      movies: [],
      book: book,
    };
    this.fillmovies();
  }

  handleBooking = (movies) => {
    const movieid = movies.movies.id;

    localStorage.setItem("movie", movies.movies);
    localStorage.setItem("movieid", movieid);
    localStorage.setItem("price", movies.movies.price);
    //console.log(movies);
    //this.props.history.push('/bookmovie');
    this.setState({
      book: "true",
    });
  };

  componentDidMount() {}
  fillmovies = async (event) => {
    await axios({
      method: "GET",
      url: "http://localhost:5000/api/movies/latest",
      data: {},
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res);
      console.log(res.data);
      this.setState({
        movies: res.data.ev,
      });
    });
  };
  render() {
    const { movies } = this.state;
    if (this.state.book == "true") {
      return <Redirect to="/bookmovie"></Redirect>;
    }

    return (
      <>
        <div
          style={{ paddingLeft: "80px", paddingTop: "40px", textAlign: "left" }}
        >
          <h3>Movies </h3>{" "}
          <h6>
            {" "}
            <small>
              <span className="text-danger"> Latest Movies</span>{" "}
            </small>{" "}
          </h6>
          <div className="row">
            {movies.map((movies, index) => (
              <>
                <div
                  className="movies-card2"
                  style={{ marginLeft: "20px", marginBottom: "90px" }}
                >
                  <div style={{ width: "100%", height: "100%" }}>
                    {movies.filepath ? (
                      <>
                        {" "}
                        <img
                          src={"http://localhost:5000/" + movies.filepath}
                          style={{
                            width: "100%",
                            height: "100%",
                            maxHeight: "450px",
                            maxWidth: "500px",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        {" "}
                        <img
                          src="images/pcorn2.png"
                          style={{
                            width: "350px",
                            height: "250px",
                            align: "center",
                          }}
                        />
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
              </>
            ))}
          </div>
          {/* row end */}
          <h4 style={{ float: "right", paddingRight: "150px" }}>
            {" "}
            <small>
              <span className="text-danger"> Explore all Movies</span>{" "}
            </small>{" "}
          </h4>
        </div>
      </>
    );
  }
}
