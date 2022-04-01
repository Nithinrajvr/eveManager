import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import { Link, NavLink } from "react-router-dom";
import "./Movies.css";
import axios, { post } from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Movieposter from "./Movieposter";
import FileUpload from "../Fileupload";
import dateFormat from "dateformat";

export default class Movies extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("token");
    const fullname = localStorage.getItem("fullname");
    const userid = localStorage.getItem("userid");
    const email = localStorage.getItem("email");
    let loggedIn = true;

    this.state = {
      loggedIn,
      token,
      fullname,
      userid,
      email,
      movies: [],
      loadmovies: "",
      movieid: "",
      datefrom: "",
    };
  }

  handleBooking = (movies) => {
    const movieid = movies.movies.id;

    localStorage.setItem("movie", movies.movies);
    localStorage.setItem("movieid", movieid);
    localStorage.setItem("price", movies.movies.price);
    //console.log(movies);
    this.props.history.push("/bookmovie");
  };

  handleChange = (event) => {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  handlesearch = () => {
    let gtype = this.state.gtype;
    let ryear = this.state.ryear;
    let datefrom = this.state.datefrom;

    axios({
      method: "post",
      url: "http://localhost:5000/api/movies/search",
      data: {
        gtype: gtype,
        ryear: ryear,
        datefrom: dateFormat(this.state.datefrom, "yyyy/m/d"),
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
        url: "http://localhost:5000/api/movies",
        data: bodyFormData,
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
    fillmovies();
  }
  setDatefrom = (date) => {
    this.setState({ datefrom: date });
  };

  render() {
    const { movies, gtype, ryear, datefrom } = this.state;
    return (
      <>
        <Navbar />

        <div className="row">
          <div className="col-4">
            <img src="images/movbanner4.jpg" style={{ width: "350px" }} />
          </div>
          <div className="col-8" style={{ textAlign: "right" }}>
            <h1
              className="text-info"
              style={{ paddingRight: "150px", paddingTop: "50px" }}
            >
              {" "}
              MOVIES{" "}
            </h1>{" "}
            <span style={{ paddingRight: "30px" }}>
              {" "}
              Explore Movies, Cinemas & Live Shows
            </span>{" "}
          </div>
        </div>
        <hr />

        <div className="wrapper" style={{ paddingLeft: "20px" }}>
          {/* <Link to="/movieposter"><span className="btn btn-default btn-sm"> + New Event</span></Link> */}

          <div
            className="row"
            style={{ border: "0px solid", width: "98%", paddingRight: "15px" }}
          >
            <div
              className="col-lg-2 border-right"
              style={{ align: "left", paddingRight: "20px" }}
            >
              Search Movie(s)
              <div className="row">
                <label>Genres Type</label>
                <select
                  name="gtype"
                  className="form-control"
                  value={gtype}
                  onChange={this.handleChange}
                >
                  <option value="" selected>
                    All
                  </option>
                  <option value="0">Action</option>
                  <option value="1">Comedy</option>
                  <option value="2">Romance</option>
                  <option value="3">Horror</option>
                </select>
              </div>
              <div className="row">
                <label>Year Release</label>
                <select
                  name="ryear"
                  className="form-control"
                  value={ryear}
                  onChange={this.handleChange}
                >
                  <option value="">Any</option>
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                  <option value="2002">2002</option>
                  <option value="2003">2003</option>
                  <option value="2004">2004</option>
                  <option value="2005">2005</option>
                  <option value="2006">2006</option>
                  <option value="2007">2007</option>
                  <option value="2008">2008</option>
                  <option value="2009">2009</option>
                  <option value="2010">2010</option>
                  <option value="2011">2011</option>
                  <option value="2012">2012</option>
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
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
                  startDate={this.state.datefrom}
                  endDate={this.state.dateto}
                  placeholderText="Select Event date"
                  className="form-control"
                  selected={this.state.datefrom}
                  onChange={(date) => this.setDatefrom(date)}
                  minDate={new Date()}
                  value={datefrom}
                  dateFormat="dd-MMM-Y"
                  //maxDate={new Date().setDate(new Date().getDate()+ 6)}
                  //       onCalendarOpen={this.handleCalendarOpen}
                  //              onCalendarClose={this.handleCalendarClose}
                />
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
                  <h3 className="text-info"></h3>

                  <div className="row">
                    {this.state.loadmovies == "success" ? (
                      movies.map((movies, index) => (
                        <>
                          <div
                            className="movies-card2"
                            style={{ marginLeft: "40px", marginBottom: "90px" }}
                          >
                            <div
                              className="card-body"
                              align="center"
                              style={{
                                height: "100%",
                                width: "100%",
                                align: "center",
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
                                    src={
                                      "http://localhost:5000/" + movies.filepath
                                    }
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

                            <div className="card-footer">
                              <div style={{ float: "left" }}>
                                {movies.title}
                              </div>
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
                      ))
                    ) : (
                      <>
                        {" "}
                        <img src="images/loading.gif" />{" "}
                        <p align="center">No Movies found.... </p>
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
