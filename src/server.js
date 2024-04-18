const express = require("express");
app = express();

const mongoose = require("mongoose");

const Note = require("./models/Note");
const User = require("./models/User");
const UserLogin = require("./models/UserLogin");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose
  .connect(
    "mongodb+srv://dhruvumesh12a:hello123@cluster0.4nwkr05.mongodb.net/test"
  )
  .then(function () {
    app.get("/", function (req, res) {
      res.send("This is the Home page");
    });

    ////////////////////////////////////USER LOGIN////////////////////////////////////////////////////////
    app.get("/users/login/list", async function (req, res) {
      var userlogin = await UserLogin.find();
      res.json(userlogin);
    });

    app.get("/users/login/list/:loginid", async function (req, res) {
      var userlogin = await UserLogin.find({ username: req.params.loginid });
      res.json(userlogin);
    });

    app.post("/users/login/add", async function (req, res) {
      await UserLogin.deleteOne({ loginid: req.body.loginid });
      const NewUserLogin = new UserLogin({
        loginid: req.body.loginid,
        username: req.body.username,
        useremail: req.body.useremail,
        password: req.body.password,
      });
      await NewUserLogin.save();
      const response = {
        message: "New User Created!!" + `id ${req.body.loginid}`,
      };
      res.json(response);
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////USER///////////////////////////////////////////////////////
    //user list
    app.get("/users/list", async function (req, res) {
      var user = await User.find();
      res.json(user);
    });
    app.get("/users/list/active", async function (req, res) {
      var user = await User.find({ userstatus: "Active" });
      res.json(user);
    });
    app.get("/users/list/inactive", async function (req, res) {
      var user = await User.find({ userstatus: "Inactive" });
      res.json(user);
    });
    //add new user
    app.post("/users/add", async function (req, res) {
      await User.deleteOne({ id: req.body.loginid });
      const NewUser = new User({
        loginid: req.body.loginid,
        salutation: req.body.salutation,
        username: req.body.username,
        useremail: req.body.useremail,
        pan: req.body.pan,
        role: req.body.role,
        designation: req.body.designation,
        department: req.body.department,
        nationlity: req.body.nationlity,
        company: req.body.company,
        userstatus: req.body.userstatus,
      });
      await NewUser.save();
      const response = {
        message: "New User Created!!" + `id ${req.body.loginid}`,
      };
      res.json(response);
    });

    //update new user
    app.post("/users/update", async function (req, res) {
      await User.deleteOne({ id: req.body.loginid });
      const NewUser = new User({
        loginid: req.body.loginid,
        salutation: req.body.salutation,
        username: req.body.username,
        useremail: req.body.useremail,
        pan: req.body.pan,
        role: req.body.role,
        designation: req.body.designation,
        department: req.body.department,
        nationlity: req.body.nationlity,
        company: req.body.company,
        userstatus: req.body.userstatus,
      });
      await NewUser.save();
      const response = {
        message: "User updated Created!!" + `id ${req.body.loginid}`,
      };
      res.json(response);
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // app.get("/", function (req, res) {
    //   res.send("This is the home page");
    // });

    // app.get("/notes/list", async function (req, res) {
    //   var notes = await Note.find();
    //   res.json(notes);
    //   // res.send("This are the notes");
    // });
    // app.post("/notes/list", async function (req, res) {
    //   var notes = await Note.find({ userid: req.body.userid });
    //   res.json(notes);
    //   // res.send("This are the notes");
    // });

    // app.post("/notes/add", async function (req, res) {
    //   // res.json(req.body.id);
    //   await Note.deleteOne({ id: req.body.id });
    //   const newNotes = new Note({
    //     id: req.body.id,
    //     userid: req.body.userid,
    //     title: req.body.title,
    //     content: req.body.id,
    //     //   id: ṛeq.body.id,
    //     //   userid: "ṛeq.body.userid",
    //     //   title: "ṛeq.body.title",
    //     //   content: "ṛeq.body.content",
    //   });
    //   await newNotes.save();
    //   const response = { message: "New Note Created!!" + `id ${req.body.id}` };
    //   res.json(response);
    // });

    // app.post("/notes/delete", async function (req, res) {
    //   await Note.deleteOne({ id: req.body.id });
    //   const response = { message: "Note Deleted !!" + `id ${req.body.id}` };
    //   res.json(response);
    // });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("server Started at PORT : 5000");
});
