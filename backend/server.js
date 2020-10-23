"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const { stock, customers } = require("./data/inventory");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))
  // .use(express.urlencoded({ extended: true }))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .post("/order", (req, res) => {
    // console.log(req.body);

    let status = undefined;
    let error = undefined;
    console.log(req.body.size);
    console.log(stock.shirt[req.body.size]);
    const findStuff = (customer) => {
      if (
        req.body.givenName === customer.givenName ||
        req.body.email === customer.email
      ) {
        return true;
      }
    };
    if (customers.find(findStuff)) {
      status = "error";
      error = "repeat-customer";
    } else if (!req.body.email.includes("@")) {
      status = "error";
      error = "missing-data";
    } else if (req.body.country !== "Canada") {
      status = "error";
      error = "undeliverable";
    } else if (stock.shirt[req.body.size] === "0") {
      status = "error";
      error = "unavailable";
    } else {
      status = "success";
    }

    console.log(status);

    res.status(200).json({ status: status, error: error });
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
