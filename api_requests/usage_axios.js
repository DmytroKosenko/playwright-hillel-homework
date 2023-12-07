const axios = require("axios");
const { expect } = require("chai");
const data = require("./data/dummy_data.json");
const fs = require("fs-extra");

describe("Actions for users on dummy website", async () => {
  let userId;
  let userFirstName;
  let userLastName;

  //Create user
  it.skip("Create user", async () => {
    const createUser = await axios.post(
      `${data.baseUrl}/users/add`,
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
    //console.log(createUser.data);
    userId = createUser.data.id;
  });

  //Create product
  it.skip("Create product", async () => {
    const createProduct = await axios.post(
      `${data.baseUrl}/products/add`,
      {
        title: "New product",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    console.log(createProduct.data);
    expect(createProduct.status).equal(200);
  });

  //Get users
  it("Get users by search params", async () => {
    const params = new URLSearchParams([
      ["key", "hair.color"],
      ["value", "Brown"],
    ]);
    const getUsersByParams = await axios.get(`${data.baseUrl}/users/filter`, {
      params,
    });
    //console.log(getUsersByParams.data);
    expect(getUsersByParams.status).equal(200);
    userFirstName = getUsersByParams.data.users[2].firstName;
    userLastName = getUsersByParams.data.users[2].lastName;
    userId = getUsersByParams.data.users[2].id;
    console.log(userFirstName);
    //Arely
  });

  //Get users by id and compare values
  it("Get users by id and compare values", async () => {
    const getUser = await axios.get(`${data.baseUrl}/users/${userId}`);
    //console.log(getUser.data);
    expect(getUser.status).equal(200);
    expect(userFirstName).equal(getUser.data.firstName);
    expect(userLastName).equal(getUser.data.lastName);
  });

  //Update user with id
  // it.skip("Update user data", async (userId) => {
  //   const updateUserData = await axios.patch(
  //     `${data.baseUrl}/users/${userId}`,
  //     {
  //       username: "Marko",
  //       password: "Polo",
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${data.token}`,
  //       },
  //     }
  //   );
  //   console.log(updateUserData.data);
  //   console.log(updateUserData.statusText);
  //   console.log(updateUserData.status);
  // });
});
