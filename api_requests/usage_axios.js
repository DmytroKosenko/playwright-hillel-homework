const axios = require("axios");
const { expect } = require("chai");

describe("Actions for dummy website", async () => {
  let baseUrl = "https://dummyjson.com";
  let userId;
  let userName;
  let userPassword;
  let token;

  //Create
  it.skip("Create user", async () => {
    const createUser = await axios.post(
      "https://dummyjson.com/users/add",
      {
        firstName: "Muhammad",
        lastName: "Ovi",
        age: 250,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(createUser.data);
    userId = createUser.data.id;
  });

  //Get data
  it("Get user by ID", async () => {
    const getUser = await axios.get(`${baseUrl}/users/1`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    //console.log(getUser.data);
    userName = getUser.data.username;
    userPassword = getUser.data.password;
  });

  //Get auth token
  it("Receive auth token", async () => {
    const getToken = await axios.post(
      `${baseUrl}/auth/login`,
      {
        username: userName,
        password: userPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //console.log(getToken.data);
    token = getToken.data.token;
  });

  //Create product
  it("Create product", async () => {
    const createProduct = await axios.post(
      `${baseUrl}/products/add`,
      {
        title: "New product",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(createProduct.data);
    expect(createProduct.status).equal(200);
  });

  //Update
  it.skip("Update user data", async () => {
    const updateUserData = await axios.patch(
      `${baseUrl}/users/101`,
      {
        username: "testUser",
        password: "Qwe123",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(updateUserData.data);
  });
});
