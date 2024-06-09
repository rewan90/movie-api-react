import React, { useState } from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

export default function Login({saveUserData}) {
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const [errList, setErrList] = useState([]);
  let navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function getUserData(eventInfo) {
    let myUser = { ...user };
    myUser[eventInfo.target.name] = eventInfo.target.value;
    setUser(myUser);
  }

  async function sendLoginData() {
    let { data } = await axios.post(
      `https://route-egypt-api.herokuapp.com/signin`,
      user
    );
    setLoading(false);
    if (data.message === "success") {
      setError("Login Successful");
      localStorage.setItem("userToken", data.token);
      saveUserData();
      navigate("/");
    } else {
      setError(data.message);
    }
  }

  function submitLoginForm(e) {
    e.preventDefault();
    setLoading(true);
    let validation = validateLogination();
    if (validation.error) {
      setLoading(false);
      setErrList(validation.error.details);
      console.log(errList);
    } else {
      sendLoginData();
    }}
    function validateLogination() {
      let scheme = Joi.object({
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

        {Error.length > 0 ? (
          <div className="alert alert-danger my-2">{Error}</div>
        ) : (
          ""
        )}
        <form onSubmit={submitLoginForm}>
       
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
            {errList.filter((err) => err.context.label === "email")[0] ? (
              <div className="text-danger ">
                {
                  errList.filter((err) => err.context.label ==="email")[0]
                    ?.message
                }
              </div>
            ) : null}
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
            {errList.filter((err) => err.context.label === "password")[0] ? (
              <div className="text-danger ">
                Password is invalid. minimum eight characters, at least one
                letter and one number
              </div>
            ) : null}
          </div>
          <button className="btn btn-secondary w-100 p-2">
            {loading === true ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </>
    );
  }

