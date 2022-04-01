import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import { Redirect } from "react-router";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import "./seats.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dateFormat from "dateformat";

export default class Bookingmovie extends Component {
  constructor(props) {
    super(props);

    let eventid = localStorage.getItem("movieid");

    var price = localStorage.getItem("price");

    // if(price>0){
    // }else{
    //   price=0;
    // }

    let available = 0;

    const token = localStorage.getItem("token");
    const fullname = localStorage.getItem("fullname");
    const userid = localStorage.getItem("userid");
    const email = localStorage.getItem("email");

    localStorage.removeItem("selectedSeats");
    localStorage.removeItem("selectedSeats");
    localStorage.removeItem("seatcount");
    localStorage.removeItem("totalamt");

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
      pathname: "",
      seatindex: "",
      seatoccupied: [],
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
      console.log(res.data[0]);
      const available = res.data[0]["seats"] - this.state.bookedcount;
      this.setState({
        seats: res.data[0]["seats"],
        title: res.data[0]["title"],
        price: res.data[0]["price"],
        venue: res.data[0]["venue"],
        datefrom: dateFormat(res.data[0]["dfrom"], "dd-mmm-yyyy"),
        evedetails: res.data[0]["edescp"],
        available: res.data[0]["seats"],
        pathname: res.data[0]["filepath"],
      });
    });
    localStorage.removeItem("price");
    localStorage.setItem("price", this.state.price);
    axios({
      method: "post",
      url: "http://localhost:5000/api/ev/ticketscount",
      data: {
        eventid: eventid,
      },
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res.data);
      var ticketcount = res.data.length;
      var seatoccupied = res.data;
      let bookedcount = ticketcount;

      available = this.state.available;
      available = available - bookedcount;
      this.setState({
        bookedcount: ticketcount,
        available: available,
        seatoccupied: seatoccupied,
      });
    });
  }

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "http://localhost/movie/ss.js";
    script.async = true;

    document.body.appendChild(script);
  }

  handleChange = (event) => {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value,
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
        const selseats = localStorage.getItem("selectedSeats");
        const totalamt = localStorage.getItem("totalamt");
        const seatcount = localStorage.getItem("seatcount");
        this.setState({
          notickets: seatcount,
          amount: totalamt,
        });
        await axios({
          method: "post",
          url: "http://localhost:5000/api/booking",
          data: {
            eventid: eventid,
            userid: userid,
            email: email,
            etype: "1",
            no_tickets: seatcount,
            booking_amt: totalamt,
            status: "1",
            seats: selseats,
          },
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          console.log(res);
          console.log(res.data);

          if (res.data.inserted == true) {
            toast("Booked Successfully");
            //  event.target.reset();
            localStorage.removeItem("movieid");
            localStorage.removeItem("price");
            localStorage.removeItem("selectedSeats");
            localStorage.removeItem("selectedSeats");
            localStorage.removeItem("seatcount");
            localStorage.removeItem("totalamt");
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
  rowfill = (seatno) => {
    const seats = document.querySelectorAll(".row .seat");

    // const seatsoccupied = JSON.parse( this.state.seatoccupied);
    var seatsoccupied = this.state.seatoccupied;

    if (seatsoccupied !== null && seatsoccupied.length > 0) {
      seats.forEach((seat, index) => {
        console.log(index);
        var seatstatus = 0;
        for (let i = 0; i < seatsoccupied.length; i++) {
          if (index - 1 == seatsoccupied[i].seatno) {
            console.log("thisone");
            seatstatus = "1";
            seat.classList.add("occupied");
          }
        }

        if (seatstatus == "1") {
          //    seat.classList.add('occupied');
          seatstatus = "0";
          //alert(index);
        }
      });
    }

    // var seatstatus=0;

    // for (let i = 0; i < seatsoccupied.length; i++) {
    //   if(seatno==seatsoccupied[i].seatno){
    //     seatstatus=1;
    //   }
    //   // if(seatstatus==0){
    //   //   return(<> <div className="seat"></div></> );
    //   // }else{
    //   //   return(<><div className="seat occupied"></div></>);
    //   // }
    //   return(seatstatus);
    // }

    // var rows = [], i = 0, len = 10;
    // var cols=[],j=0,collen=8;
    // while (++i <= len) rows.push(i);
    // while(++j <=collen) cols.push(j);
    // return (
    //   <>
    //     {
    //       cols.map(function(j){
    //         return
    //         <>
    //         <div key={j}  className='row'>;
    //         {
    //     rows.map(function (i) {
    //       return <div key={i} index={i}  className='seat'></div>;
    //     }) }
    //     </div> </>
    //   })
    //     }
    //   </>
    // );
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
      pathname,
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
                  <div className="col-sm-6">
                    <h3 className="d-inline-block d-sm-none"></h3>

                    <img
                      src={"http://localhost:5000/" + pathname}
                      style={{ width: "450px", height: "500px" }}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <p>
                      <h3 className="my-3">
                        <small>
                          {" "}
                          <span className="badge btn-danger  btn-xs">
                            {" "}
                            Movie Tickets{" "}
                          </span>{" "}
                        </small>
                        <h3>
                          <i
                            className="fa fa-life-ring  fa-spin"
                            aria-hidden="true"
                          ></i>{" "}
                          {title}
                        </h3>{" "}
                      </h3>
                    </p>
                    <hr />
                    <div className="row">
                      <div className="col-6">
                        <p>
                          <i className="fa fa-list-alt" aria-hidden="true"></i>{" "}
                          Venue: {venue}{" "}
                        </p>
                        <p>
                          <i className="fa fa-calendar" aria-hidden="true"></i>{" "}
                          {datefrom}{" "}
                        </p>
                      </div>
                      <div className="col-6">
                        <p>
                          {" "}
                          <i className="fas fa-chair text-success"></i> Booked :{" "}
                          {bookedcount} [Available {available}]
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
                      <div className="col-4"></div>
                    </div>
                    <hr />
                    <div className="row" style={{ paddingLeft: "20px" }}>
                      <p align="justify"> {evedetails}.</p>
                    </div>
                    Select Seats
                    <hr />
                    <div
                      className="movie-container"
                      style={{ display: "none" }}
                    >
                      <label>Pick a movie:</label>
                      <select id="movie">
                        <option value={price} selected>
                          {title}({"$" + price})
                        </option>
                        {/* <option value="10">Avengers: Endgame ($10)</option>
        
        <option value="8">Toy Story 4 ($8)</option>
        <option value="9">The Lion King ($9)</option> */}
                      </select>
                    </div>
                    <ul className="showcase">
                      <li>
                        <div className="seat1"></div>
                        <small>N/A</small>
                      </li>
                      <li>
                        <div className="seat1 selected2"></div>
                        <small>Selected</small>
                      </li>
                      <li>
                        <div className="seat1 occupied"></div>
                        <small>Occupied</small>
                      </li>
                    </ul>
                    <p className="text">
                      You have selected <span id="count">0</span> seats for a
                      price of $<span id="total">0</span>
                    </p>
                    <div className="container">
                      <div className="screen"></div>

                      <div className="row" style={{ display: "none" }}>
                        <div className="seat"></div>
                      </div>

                      <div className="row">
                        <div className="seat" id="1"></div>
                        <div className="seat" id="2"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                      </div>
                      <div className="row">
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                      </div>
                      <div className="row">
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                      </div>
                      <div className="row">
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                      </div>
                      <div className="row">
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                      </div>
                      <div className="row">
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                      </div>
                    </div>
                    {this.rowfill()}
                    Seat(s):
                    <div id="seatNumbers"> </div>
                    <input
                      type="hidden"
                      name="seatindex"
                      id="seatindex"
                      onChange={this.handleChange}
                    />
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
                          id="tktcount"
                          className="form-control"
                          value={this.state.notickets}
                          name="notickets"
                          style={{
                            width: "100px",
                            paddingLeft: "20px",
                            marginLeft: "10px",
                          }}
                          onChange={this.handleChange}
                          disabled
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
                        Amount :{" "}
                        <input
                          type=""
                          id="totalamt"
                          name="amount"
                          className="form-control"
                          value={amount}
                          onChange={this.handleChange}
                          disabled
                        />
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
                              <i className="fa fa-film" aria-hidden="true"></i>{" "}
                              Book Now
                            </div>
                          </div>
                          Seats Available{" "}
                        </>
                      ) : (
                        <>
                          <div
                            className="mt-2"
                            style={{ float: "right", marginLeft: "20px" }}
                          >
                            <div className="btn btn-danger  btn-flat disabled ">
                              <i className="fa fa-film" aria-hidden="true"></i>{" "}
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
