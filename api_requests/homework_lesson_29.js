const axios = require("axios");
const { expect } = require("chai");

describe("Actions for jsonplaceholder website", async () => {
  let baseUrl = "https://jsonplaceholder.typicode.com";
  let userId;

  //POST
  it("Create post", async () => {
    const createPost = await axios.post(
      `${baseUrl}/posts`,
      JSON.stringify({
        title: "New post",
        body: "The giant panda post",
        userId: 1,
        id: 1,
      }),
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
    //console.log(createPost.data);
    expect(createPost.status).equal(201);
    console.log(createPost.status);

    userId = createPost.data.userId;
    //console.log(userId);
  });

  //PUT
  it("Change post", async () => {
    const updatePost = await axios.put(
      `${baseUrl}/posts/${userId}`,
      JSON.stringify({
        title: "Panda post",
        body: "The giant panda (Ailuropoda melanoleuca David, 1869) is an iconic species for global conservation, yet field research has only recently advanced to the point where adaptive management is possible.",
      }),
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
    //console.log(updatePost.data);
    expect(updatePost.status).equal(200);
    console.log(updatePost.status);
  });

  //GET
  it("Get post", async () => {
    const getPosts = await axios.get(`${baseUrl}/posts/${userId}`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    //console.log(getPosts.data);
    expect(getPosts.status).equal(200);
    console.log(getPosts.status);
  });
});
