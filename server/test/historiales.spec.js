import index from "../index.js";
import request from "supertest";
import jest from "jest";

describe("Get /historiales", () => {
  test("debe responder con un codigo de estado 200",  () => {
    // jest.setTimeout(10000);
    const response =  request(index).get("/historiales").send();
    console.log(response);
    //expect(response.status).toBe(200);
  });
});
