import Form from "./Form";
import axios from "axios";
import React, { Component, useEffect, useState, setState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Swal = require("sweetalert2");

class ManageApp extends Component {
  constructor(props) {
    super(props);
    
    // Here we initialize our components state
    this.state = {
      showForm: false,
      FirstName: "",
      Email: "",
      Password: "",
      admin: "2",
      LicenceNumber: "",
      Gender: "",
      Category: "",
      status: "Available",
      files: [],
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    // On click we change our state – this will trigger our `render` method
    this.setState({ showForm: true });
  }

  renderForm() {
    const handleOnchange = (name, e) => {
      if (name === "files") {
        console.log(e.target.files);
        this.setState({
          [name]: e.target.files,
        });
      } else {
        this.setState({
          [name]: e.target.value,
        });
      }
    };

    const Hsubmit = (e) => {
      e.preventDefault();
      
      const PostData = {
        FirstName: this.state.FirstName,
        Email: this.state.Email,
        Password: this.state.Password,
        Gender: this.state.Gender,
        // Address: this.state.Address,
        Number: this.state.Number,
        Specialist: this.state.Category,
        status: this.state.status,
        image: this.state.files[0],
        LicenceNumber: this.state.LicenceNumber,
        admin: this.state.admin,
      };

      const SignUpURL = `http://localhost:5000/signup`;

      axios
        .post(SignUpURL, PostData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.success === true) {
            window.location.href=window.location.href
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            // navigate("/login");
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "warning",
            title: err.response.data.message,
            showConfirmButton: true,
          });
        });
    };

    return (
      <div className="card p-3 ms-auto me-auto col-4">
        <form onSubmit={Hsubmit}>
          <input
            onChange={(e) => handleOnchange("FirstName", e)}
            value={this.state.FirstName}
            type="name"
            className="form-control"
            placeholder="Doctor Name"
          />
          <input
            type="email"
            className="form-control mt-3"
            placeholder="Doctor Email"
            value={this.state.Email}
            onChange={(e) => handleOnchange("Email", e)}
          />
          <input
            type="password"
            className="form-control mt-3"
            placeholder="Doctor Password"
            value={this.state.Password}
            onChange={(e) => handleOnchange("Password", e)}
          />
          <input
            type="number"
            className="form-control mt-3"
            placeholder="Number"
            value={this.state.Number}
            onChange={(e) => handleOnchange("Number", e)}
          />

          <select
            className="form-control mt-3"
            value={this.state.Category}
            onChange={(e) => handleOnchange("Category", e)}>
            <option value="">Select Any One</option>

            <option value="General Dentist">General Dentist</option>

            <option value="Orthodontist">Orthodontist</option>

            <option value="Prosthodontist">Prosthodontist</option>
          </select>
          <input
            className="form-control mt-3 mb-3"
            type="text"
            placeholder="Licence Number"
            value={this.state.LicenceNumber}
            onChange={(e) => handleOnchange("LicenceNumber", e)}
          />
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleOnchange("files", e)}
            multiple
          />
          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value={this.state.Gender}
              onChange={(e) => handleOnchange("Gender", e)}
            />
            <label className="form-check-label" for="flexRadioDefault1">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value={this.state.Gender}
              onChange={(e) => handleOnchange("Gender", e)}
            />
            <label className="form-check-label" for="flexRadioDefault2">
              Female
            </label>
          </div>
          <button type="submit" className="mt-3 btn btn-primary">
            {" "}
            Add Doctor
          </button>
        </form>
      </div>
    );
  }

  render() {
    const { showForm } = this.state;
    if (localStorage.getItem("admin") == "1") {
      return (
        <div className="manage-app">
          <h1>Add Doctor</h1>
          <button className="btn btn-primary" onClick={this.onClick}>
            Add New Doctor
          </button>

          {showForm && this.renderForm()}
        </div>
      );
    }
  }
}

export default ManageApp;
