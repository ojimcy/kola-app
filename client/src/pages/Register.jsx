import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";

import axios from "axios";

import Logo from "../assets/icon 2.png";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "top-right",
    autoClose: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.message);
      }
      if (data.status === true) {
        localStorage.setItem("app-user", JSON.stringify(data.user));
      }

      navigate("/");
    }
  };
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (password !== confirmPassword) {
      toast.error("Password and confirm password must be the same!", {
        toastOptions,
      });
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", {
        toastOptions,
      });
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be greater than 8 characters", {
        toastOptions,
      });
      return false;
    } else if (email === "") {
      toast.error("Email is required", {
        toastOptions,
      });
      return false;
    } else if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        toastOptions,
      });
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>Kola</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #fff;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #8eac50;
      border-radius: 0.4rem;
      color: #fff;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #bacf8f;
      color: #fff;
      border: none;
      border-radius: 0.4rem;
      padding: 1rem 2rem;
      font-weight: bold;
      cursor: pointer;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #8eac50;
      }
    }
    span {
      color: #fff;
      a {
        color: #4e0eff;
        text-decoration: none;
      }
    }
  }
`;

export default Register;
