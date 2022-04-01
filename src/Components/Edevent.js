import React, { Component } from "react";
import Navbar2 from "./Layout/Navbar2";
import { Link, NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import axios from "axios";
import dateFormat from "dateformat";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUpload from "./Fileupload";

export default class Edevent extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("token");
    const fullname = localStorage.getItem("fullname");
    const userid = localStorage.getItem("userid");
    const email = localStorage.getItem("email");

    let editevent = localStorage.getItem("editevent");
    if (editevent == null) {
      //   this.props.history.push('/addevent');
    }

    let loggedIn = true;
    let tseats = 0;
    if (token == null) {
      loggedIn = false;
    }

    this.state = {
      loggedIn,
      token,
      fullname,
      userid,
      email,
      etitle: "",
      venue: "",
      datefrom: "",
      dateto: "",
      mobile: "",
      etype: "0",
      edesp: "",
      seats: "",
      price: "",
      tseats: tseats,
      no_slots: "1",
      editevent: editevent,
      eventid: "",
      filepath: "",
      filename: "",
    };
  }

  cancelBooking = (event, id) => {
    event.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure to Reject Hosting?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete Event!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          let result = this.deleterow(id);

          swalWithBootstrapButtons.fire("Event Cancelled!", "", "success");
          this.props.history.push("/dashboard2");
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

  deleterow = async (rowid) => {
    var deleted = 0;

    await axios({
      method: "post",
      url: "http://localhost:5000/api/ev/delete",
      data: {
        eventid: rowid,
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

  componentDidMount() {
    const fillevent = async () => {
      let editevent = this.state.editevent;

      if (editevent > 0) {
        localStorage.removeItem("editevent");
        axios({
          method: "post",
          url: "http://localhost:5000/api/ev/event",
          data: {
            eventid: editevent,
          },
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          console.log(res.data);
          let title = res.data[0]["title"];
          this.setState({
            eventid: editevent,
            etitle: res.data[0]["title"],
            venue: res.data[0]["venue"],
            etype: res.data[0]["etype"],
            mobile: res.data[0]["cdetail"],
            edesp: res.data[0]["edescp"],
            seats: res.data[0]["seats"],
            price: res.data[0]["price"],
            hostby: res.data[0]["userid"],
            no_slots: res.data[0]["no_slots"],
            cname: res.data[0]["cname"],
            tseats: res.data[0]["no_slots"] * res.data[0]["seats"],
            filepath: res.data[0]["filepath"],

            filename: res.data[0]["filename"],
            // datefrom:res.data[0]['dfrom'],
          });
          localStorage.removeItem("filepath");
          localStorage.removeItem("filename");
          localStorage.setItem("filepath", res.data[0]["filepath"]);
          localStorage.setItem("filename", res.data[0]["filename"]);

          console.log("ET" + this.state.etitle);
        });
      }
    };
    fillevent();
  }
  setDatefrom = (date) => {
    this.setState({ datefrom: date });
  };
  handleDelete = (event, eventid) => {
    event.preventDefault();
  };

  handleChange = (event) => {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
    console.log(event.target.value);
    let seats = 0;
    let no_slots = 0;

    if (event.target.name == "seats") {
      seats = event.target.value;
    } else {
      seats = this.state.seats;
    }
    if (event.target.name == "no_slots") {
      no_slots = event.target.value;
    } else {
      no_slots = this.state.no_slots;
    }

    let tseats = no_slots * seats;
    this.setState({
      tseats: tseats,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();

    const title = this.state.etitle;
    const etype = this.state.etype;
    const filepath = localStorage.getItem("filepath");
    const filename = localStorage.getItem("filename");
    // alert(this.state.etype);
    await axios({
      method: "post",
      url: "http://localhost:5000/api/ev/update",
      data: {
        title: this.state.etitle,
        etype: this.state.etype,
        venue: this.state.venue,
        dfrom: dateFormat(this.state.datefrom, "yyyy/m/d"),
        dto: dateFormat(this.state.datefrom, "yyyy/m/d"),
        cdetail: this.state.mobile,
        edescp: this.state.edesp,
        seats: this.state.seats,
        price: this.state.price,
        hostby: this.state.userid,
        no_slots: this.state.no_slots,
        tseats: this.state.tseats,
        cname: this.state.cname,
        eventid: this.state.eventid,
        filepath: filepath,
        filename: filename,
      },
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res.data);
      if (res.data.inserted == "true") {
        toast("Updated Successfully");
        this.props.history.push("/dashboard2");
      } else {
        toast("Error");
      }
    });
  };
  render() {
    const {
      fullname,
      email,
      etitle,
      venue,
      datefrom,
      dateto,
      mobile,
      edesp,
      etype,
      seats,
      price,
      no_slots,
      tseats,
      cname,
      eventid,
    } = this.state;
    return (
      <>
        <Navbar2 />
        <ToastContainer />

        <div className="" style={{ padding: "50px" }}>
          Welcome {fullname}
          <div className="content">
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-4"></div>
                  <div className="col-sm-4"></div>
                  <div className="col-sm-4">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <a href="#">Home</a>
                      </li>
                      <li className="breadcrumb-item active">Update Event </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container" style={{ paddingLeft: "150px" }}>
            <h3 className="m-0">Edit Event</h3>

            <hr />
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="row" style={{ paddingBottom: "20px" }}>
                <div className="col-8">
                  <label>
                    {" "}
                    <i className="fas fa-user"></i> Event Title{" "}
                  </label>
                  <input
                    type="text"
                    name="etitle"
                    className="form-control"
                    initialValue=""
                    placeholder="Enter Event Name"
                    value={etitle}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row" style={{ paddingBottom: "20px" }}>
                <div className="col-4">
                  <label>
                    {" "}
                    <i className="fas fa-user"></i> Event Type{" "}
                  </label>
                  <select
                    name="etype"
                    className="form-control"
                    value={etype}
                    onChange={this.handleChange}
                    required
                  >
                    <option value="0" selected disabled>
                      {" "}
                      Select Event type{" "}
                    </option>
                    <option value="2">Event </option>
                    <option value="3">Play </option>
                    <option value="4">Corporate Events </option>
                    <option value="5">Personal Events </option>
                  </select>
                </div>
                <div className="col-4">
                  <label>
                    {" "}
                    <i className=""></i> Date{" "}
                  </label>

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
                    dateFormat="Y/MM/dd"
                    //maxDate={new Date().setDate(new Date().getDate()+ 6)}
                    //       onCalendarOpen={this.handleCalendarOpen}
                    //              onCalendarClose={this.handleCalendarClose}
                  />
                </div>
              </div>

              <FileUpload
                filepath={this.state.filepath}
                filename={this.state.filename}
              />

              <div className="row" style={{ paddingBottom: "20px" }}>
                <div className="col-8">
                  <label>
                    {" "}
                    <i className="fas fa-mail"></i> Venue{" "}
                  </label>
                  <textarea
                    type="text"
                    name="venue"
                    className="form-control"
                    initialValue=""
                    placeholder="Enter venue"
                    value={venue}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <h6> Contact Person Details </h6>
              <hr />

              <div
                className="row"
                style={{ paddingBottom: "20px", display: "none" }}
              >
                <div className="col-4">
                  <label>
                    {" "}
                    <i className=""></i> Upto{" "}
                  </label>

                  <input
                    type="text"
                    name="dateto"
                    className="form-control"
                    initialValue=""
                    placeholder="Date"
                    value={dateto}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="row" style={{ paddingBottom: "20px" }}>
                <div className="col-4">
                  <label> Name of Person</label>
                  <input
                    type="text"
                    name="cname"
                    className="form-control"
                    initialValue=""
                    placeholder="Contact Person Name"
                    value={cname}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-4">
                  <label> Contact Number / email</label>
                  <input
                    type="text"
                    name="mobile"
                    className="form-control"
                    initialValue=""
                    placeholder="Enter Mobile No"
                    value={mobile}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="row"></div>

              <div className="row">
                <div className="col-8">
                  <label>
                    {" "}
                    <i className="fas fa-an"></i> Event Description
                  </label>
                  <textarea
                    type="text"
                    name="edesp"
                    className="form-control"
                    initialValue=""
                    placeholder="Description about Event"
                    value={edesp}
                    style={{ height: "200px" }}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <br />

              <h6> Availablity Details </h6>
              <hr />

              <div className="row">
                <div className="col-lg-2">
                  <label>
                    {" "}
                    <i className="fas fa-an"></i> No of Slots
                  </label>

                  <input
                    type="text"
                    name="no_slots"
                    className="form-control"
                    initialValue=""
                    placeholder="No of Seats"
                    value={no_slots}
                    onChange={this.handleChange}
                  />
                </div>
                <div
                  className="col-lg-1"
                  style={{ paddingTop: "35px", paddingLeft: "30px" }}
                >
                  <label>
                    {" "}
                    <i className="fas fa-an"></i>{" "}
                  </label>
                  X
                </div>
                <div className="col-lg-2">
                  <label>
                    {" "}
                    <i className="fas fa-an"></i> Seats (per lot)
                  </label>

                  <input
                    type="text"
                    name="seats"
                    className="form-control"
                    initialValue=""
                    placeholder="Enter Seat Available"
                    value={seats}
                    onChange={this.handleChange}
                  />
                </div>
                <div
                  className="col-lg-1"
                  style={{ paddingTop: "35px", paddingLeft: "30px" }}
                >
                  <label>
                    {" "}
                    <i className="fas fa-an"></i>{" "}
                  </label>
                  =
                </div>
                <div className="col-lg-2">
                  <label>
                    {" "}
                    <i className="fas fa-an"></i> Total Seats
                  </label>
                  <br />
                  {tseats}
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-2">
                  <label>
                    {" "}
                    <i className="fas fa-an"></i> Price <small>per seats</small>
                  </label>
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    initialValue=""
                    placeholder="Enter price"
                    value={price}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-4"></div>
                <div className="col-2">
                  <button
                    className="btn btn-danger btn-block"
                    onClick={(event) => this.cancelBooking(event, eventid)}
                  >
                    Cancel Event{" "}
                  </button>
                </div>
                <div className="col-2">
                  <button type="submit" className="btn btn-primary btn-block">
                    Update
                  </button>
                </div>

                <div className="col-4"></div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
