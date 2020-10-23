import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductImage from "./ProductImage";
import Form from "./Form";
import ConfirmationMsg from "./ConfirmationMsg";
import ErrorMsg from "./ErrorMsg";

import { errorMessages, initialState } from "../settings";

const App = () => {
  const [formData, setFormData] = useState(initialState);
  const [disabled, setDisabled] = useState(true);
  const [subStatus, setSubStatus] = useState("idle");
  const [errMessage, setErrMessage] = useState("");

  // console.log(formData);

  useEffect(() => {
    Object.values(formData).includes("") || formData.order === "undefined"
      ? setDisabled(true)
      : setDisabled(false);
  }, [formData, setDisabled]);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    // setErrMessage("");
  };

  const handleClick = (event) => {
    event.preventDefault();
    setSubStatus("pending");

    fetch("/order", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { status, error } = json;
        // console.log(status, error);
        if (status === "success") {
          console.log("succesful");
          setSubStatus("confirmed");
        } else if (error) {
          console.log(error);
          setSubStatus("error");
          console.log(errorMessages[error]);
          setErrMessage(errorMessages[error]);
        }
      });
  };
  // console.log(errorMessages);
  return (
    <Wrapper>
      {subStatus !== "confirmed" ? (
        <>
          <ProductImage image={formData.order} />
          <Form
            formData={formData}
            handleChange={handleChange}
            handleClick={handleClick}
            disabled={disabled}
            subStatus={subStatus}
          />
          {subStatus === "error" && <ErrorMsg>{errMessage}</ErrorMsg>}
        </>
      ) : (
        <ConfirmationMsg formData={formData} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f6f7fc;
  border-radius: 4px;
  box-shadow: 0 60px 120px rgba(71, 69, 123, 0.24),
    0 15px 35px rgba(71, 69, 123, 0.24);
  width: 340px;
  padding-bottom: 14px;
`;

export default App;
