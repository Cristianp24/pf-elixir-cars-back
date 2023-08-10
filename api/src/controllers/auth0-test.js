var request = require("request");
const axios = require("axios");

var options = {
  method: "POST",
  url: "https://dev-edgar-tello.us.auth0.com/api/v2",
  headers: { "content-type": "application/json" },
  body: '{"client_id":"iNhJdqUfBNOTXagOlhKZNWFgbjMoGeWf","client_secret":"V3Ld3EdcEnsjoIhX3XwU2__OkIW3c4rfU6cRgt33F5XRKbu0KF7-W-0eR-7RL4Uo","audience":"https://dev-edgar-tello.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// const optionss = {
//   method: "GET",
//   url: "https://dev-edgar-tello.us.auth0.com/api/v2/",
//   headers: {
//     authorization:
//       "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtiNE13QWJhM3RldDdxNFAyMmROMiJ9.eyJpc3MiOiJodHRwczovL2Rldi1lZGdhci10ZWxsby51cy5hdXRoMC5jb20vIiwic3ViIjoiQ2NYd3ZpUk43SmoyelZiYXhETTZDRDZSQkJ6dmlmRWZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LWVkZ2FyLXRlbGxvLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjkxNDQ2MTY2LCJleHAiOjE2OTE1MzI1NjYsImF6cCI6IkNjWHd2aVJON0pqMnpWYmF4RE02Q0Q2UkJCenZpZkVmIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.MfoAHoQ0HbK1cZyBb8XQwslLh9CF4a6U5G_4uRif7ze3IAbzSbKw2zPftzfnkGTULNpZV1J-nojc6y5M24Gg1yF06qT7jXKZHy7FPySR_VRig6s56u1iQnifJ1ZcjowOe5vPn6hOpTdrLPkA2IlMDlTKiys2AlKCuz6gQjlLUb1dHFPpPKhV-4Ei72VplQA_MWr6ZNTruHRNAibPO1co6tJHdfzr-j2vG0nLs4Yku1_oxinmWSXxTJOlG2uihVjZDFyeovoSaBswvCFnQg5WxsXkZiE3y3zLwfKy8bITit372h555Gs39RetFj9RSQqciOaAj0cx5HqvXqEATWSA8A",
//   },
// };

// axios(optionss)
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
