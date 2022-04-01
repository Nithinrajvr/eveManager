import React, { Component } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import dateFormat from "dateformat";
export default class Mytickets extends Component {
  constructor(props) {
    super(props);
    const userid = this.props.userid;
    let ticketview = false;
    this.state = {
      newbookings: [],
      userid: userid,
      ticketview,
      mybooking: false,
    };
  }
  componentDidMount() {
    const filldashboard = async (event) => {
      let userid = this.state.userid;

      axios({
        method: "post",
        url: "http://localhost:5000/api/users/mytickets",
        data: {
          userid: userid,
        },
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({
          newbookings: res.data,
          mybooking: "true",
        });
      });
    };
    filldashboard();
  }

  handleCancel = (newbookings) => {
    const userid = localStorage.getItem("userid");
    var bookingid = newbookings.newbookings.bookingid;
    var eventid = newbookings.newbookings.eventid;

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure to cancel Booking?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete Booking!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          let result = this.deleterow(bookingid, userid, eventid);

          swalWithBootstrapButtons.fire("Booking Cancelled!", "", "success");
          window.location.reload(false);
          //  this.props.history.push('/dashboard2');
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   '',
          //   'error'
          // )
        }
      });
  };

  deleterow = async (bookingid, userid, eventid) => {
    var deleted = 0;
    await axios({
      method: "post",
      url: "http://localhost:5000/api/booking/del",
      data: {
        bookingid: bookingid,
        userid: userid,
        eventid: eventid,
      },
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res);
      console.log(res.data);
      window.location.reload(false);
      deleted = 1;
    });
    return deleted;
  };

  handleticket = (newbookings) => {
    localStorage.removeItem("bookingid");
    localStorage.removeItem("moviename");
    const userid = localStorage.getItem("userid");

    var bookingid = newbookings.newbookings.id;
    console.log(newbookings);
    localStorage.setItem("bookingid", newbookings.newbookings.id);
    localStorage.setItem("moviename", newbookings.newbookings.title);
    localStorage.setItem("moviedate", newbookings.newbookings.dfrom);
    localStorage.setItem("filepath", newbookings.newbookings.filepath);
    localStorage.setItem("eventid", newbookings.newbookings.eventid);
    localStorage.setItem("userid", userid);

    this.setState({
      ticketview: "true",
    });
  };

  dformat = (date) => {
    return dateFormat(date, "dd-mmm-yy");
  };

  render() {
    const { newbookings } = this.state;
    if (this.state.ticketview == "true") {
      return <Redirect to="/tickets"></Redirect>;
    }
    return (
      <>
        <div className="card">
          <div className="ribbon-wrapper ribbon-lg">
            <div className="ribbon bg-secondary">My Bookings</div>
          </div>
          My Recent Bookings <br />
          <small>Last Few bookings...</small>
          <table className="table">
            <thead>
              <tr>
                <th> Date</th>
                <th> Event </th>
                <th>Venue </th>
                <th>Booked on</th>
                <th>No(s)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.mybooking == "true" ? (
                <>
                  {newbookings.map((newbookings, index) => (
                    <tr key={newbookings.id}>
                      <td> {this.dformat(newbookings.dfrom)} </td>
                      <td> {newbookings.title} </td>
                      <td> {newbookings.venue} </td>
                      <td> {this.dformat(newbookings.bookingdate)} </td>
                      <td> {newbookings.no_tickets} </td>
                      <td>
                        {" "}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => this.handleticket({ newbookings })}
                        >
                          View ticket
                        </button>
                      </td>
                      <td>
                        {" "}
                        <button
                          className="btn btn-danger btn-xs"
                          onClick={() => this.handleCancel({ newbookings })}
                        >
                          {" "}
                          Cancel Tickets{" "}
                        </button>
                      </td>
                      <td></td>
                    </tr>
                  ))}
                </>
              ) : (
                <>No New Booking Found !!</>
              )}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header">
            <h4>
              <span className="badge badge-danger">
                {" "}
                <i className="fa fa-ticket" aria-hidden="true"></i>
                My Bookings{" "}
              </span>
            </h4>
          </div>
          <div className="card-body p-0"></div>
        </div>
      </>
    );
  }
}
