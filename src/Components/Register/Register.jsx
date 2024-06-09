import React, { useState } from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const [errList, setErrList] = useState([]);
  let navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
  });

  function getUserData(eventInfo) {
    let myUser = { ...user };
    myUser[eventInfo.target.name] = eventInfo.target.value;
    setUser(myUser);
  }

  async function sendRegisterData() {
    let { data } = await axios.post(
      `https://route-egypt-api.herokuapp.com/signup`,
      user
    );
    if (data.message === "success") {
      setLoading(false);
      navigate("/login");
    } else {
      setError(data.message);
    }
    setLoading(false);

    console.log(data);
  }
  function submitRegisterForm(e) {
    e.preventDefault();
    setLoading(true);
    let validation = validateRegisteration();
    if (validation.error) {
      setLoading(false);
      setErrList(validation.error.details);
      console.log(errList);
    } else {
      sendRegisterData();
    }
  }
  function validateRegisteration() {
    let scheme = Joi.object({
      first_name: Joi.string().min(3).max(20).required(),
      last_name: Joi.string().min(3).max(20).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/)
        .required(),
    });

    return scheme.validate(user, { abortEarly: false });
  }

  return (
    <>
      {errList.map((err, index) => (
        <div key={index} className="alert alert-danger my-2">
          {err.message}
        </div>
      ))}

      {Error.length > 0 ? (
        <div className="alert alert-danger my-2">{Error}</div>
      ) : (
        ""
      )}
      <form onSubmit={submitRegisterForm}>
        <div className="d-flex mb-3">
          <div className="w-50 pe-2">
            <label htmlFor="first_name" className="form-label">
              Name
            </label>
            <input
              onChange={getUserData}
              type="text"
              placeholder="First Name"
              name="first_name"
              className="p-2 w-100 rounded"
              id="first_name"
            />
          </div>
          <div className="w-50 ps-2">
            <label htmlFor="last_name" className="form-label">
              last Name
            </label>

            <input
              onChange={getUserData}
              type="text"
              placeholder="Last Name"
              className="p-2 w-100 rounded"
              name="last_name"
              id="last_name"
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>

          <input
            onChange={getUserData}
            type="email"
            placeholder="Email Address "
            className="d-block w-100 p-2 rounded"
            name="email"
            id="email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Age" className="form-label">
            Age
          </label>

          <input
            onChange={getUserData}
            type="number"
            placeholder="Age"
            name="age"
            className="d-block w-100 p-2  rounded"
            id="Age"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password
          </label>

          <input
            onChange={getUserData}
            type="password"
            placeholder="Password"
            className="d-block w-100 p-2  rounded"
            name="password"
            id="password"
          />
        </div>
        <button className="btn btn-secondary w-100 p-2">
          {loading === true ? (
            <i className="fa fa-spinner fa-spin"></i>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </>
  );
}
