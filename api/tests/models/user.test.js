require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "someone",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "someone",
    });
    expect(user.password).toEqual("password");
  });

  it("has a username", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "someone",
    });
    expect(user.username).toEqual("someone");
  });

  it("can list all users", async () => {
    const users = await User.find();
    expect(users).toEqual([]);
  });

  it("can save a user", async () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "someone",
    });

    await user.save();
    const users = await User.find();

    expect(users[0].email).toEqual("someone@example.com");
    expect(users[0].password).toEqual("password");
    expect(users[0].username).toEqual("someone");
  });
});
