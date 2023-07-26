// Import express, cors and axios
const express = require("express");
const cors = require("cors");
const axios = require("axios");

//load the environment variables
require("dotenv").config();

//declare a variable named app that is express invoked / an instance of express
const app = express();

// enable the server to respond to preflight requests
app.use(cors());

// Set the PORT
const PORT = process.env.PORT || 8092;

// Set up the endpoint - a response from the home route
app.get("/", (request, response) => {
  response.status(200).json("Ho, Ho, Ho, give me all your money!");
});

// endpoint for /photos
app.get("/photos", async (request, response) => {
  const API = `https://api.unsplash.com/search/photos/?client_id=${process.env.ACCESS_KEY}&query=goat`;
  const res = await axios.get(API);
  // console.log(res.data.results[0].urls.regular);
  // response.status(200).json("hello");
  const photos = res.data.results.map((photo) => {
    return {
      id: photo.id,
      img_url: photo.urls.regular,
      original_image: photo.links.self,
      photographer: photo.user.name,
    };
  });
  response.status(200).json(photos);
});

// Invoke app.listen() function to listen to the connections on the specified PORT.
// set a callback function that will get executed once you app starts listening to the specified port.
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));

// https://api.unsplash.com/search/photos/?client_id=YOUR_ACCESS_KEY
