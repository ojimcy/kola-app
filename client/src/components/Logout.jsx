import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
    <Button>
        <span onClick={handleClick}>Logout</span>
    </Button>
    </>
  )
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  span {
    font-size: 1rem;
    color: #ebe77f;
    background-color: transparent;
  }
`;
