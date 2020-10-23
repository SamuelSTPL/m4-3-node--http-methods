import React from "react";
import styled from "styled-components";

const ConfirmationMsg = ({ formData }) => {
  console.log(formData);
  return (
    <Wrapper>
      <p>
        Thanks for ordering with us, <Bold>{formData.givenName}</Bold>
      </p>
      <p>
        Your order of <Bold>{formData.order}</Bold> will be sent to your home in{" "}
        <Bold>{formData.province}</Bold>, Canada.
      </p>
      <p>Thank you for participating!</p>
    </Wrapper>
  );
};

const Bold = styled.span`
  font-weight: bolder;
  font-style: italic;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  /* font-weight: 700; */
  z-index: 4;
`;

export default ConfirmationMsg;
