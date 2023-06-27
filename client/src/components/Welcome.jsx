import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Robot from "../assets/robot.gif";

export default function Welcome({ currentUser }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  return (
    <>
      <Container>
        <img src={Robot} alt="Robot" />
        <h1>
          Welcome, <span>{currentUserName}</span>
        </h1>
        <h3>Please select a chat to start messaging</h3>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  img {
    height: 15rem;
  }
  span {
    color: #4e00ff;
    text-transform: capitalize;
  }
  h3 {
    margin-top: 0.5rem;
  }
`;
