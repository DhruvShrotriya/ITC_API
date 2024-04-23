const express = require("express");
app = express();

const mongoose = require("mongoose");

const Note = require("./models/Note");
const User = require("./models/User");
const UserLogin = require("./models/UserLogin");
const DeclarationPI = require("./models/DeclarationPI");
const UPSI = require("./models/UPSI");
const UPSIPerson = require("./models/UPSIPerson");

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
      var userlogin = await UserLogin.find({ loginid: req.params.loginid });
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

    ////////////////////////////////////////USER DECLARATION//////////////////////////////////////////////
    app.get("/declaration/list/:loginid", async function (req, res) {
      var declarationPI = await DeclarationPI.find();
      res.json(declarationPI);
    });

    app.post("/declaration/add", async function (req, res) {
      await DeclarationPI.deleteOne({ loginid: req.body.loginid });
      const NewDeclarationPI = new DeclarationPI({
        loginid: req.body.loginid,
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address,
        pin: req.body.pin,
        restype: req.body.restype,
        countryOfResidence: req.body.countryOfResidence,
        PAN: req.body.PAN,
        company: req.body.company,
        employeeID: req.body.employeeID,
        DOJ: req.body.DOJ,
        DOBI: req.body.DOBI,
        officeLocation: req.body.officeLocation,
        department: req.body.department,
        designation: req.body.designation,
        nameOfInstitute: req.body.nameOfInstitute,
      });
      await NewDeclarationPI.save();
      const response = { message: "Declaration updated" };
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

    ///////////////////////////////////////UPSI//////////////////////////////////////////////////////
    //all upsi
    app.get("/upsi/list", async function (req, res) {
      var upsi = await UPSI.find();
      res.json(upsi);
    });

    app.post("/upsi/add", async function (req, res) {
      await User.deleteOne({ id: req.body.upsiID });
      const NewUPSI = new UPSI({
        upsiID: req.body.upsiID,
        eventType: req.body.eventType,
        nameUPSI: req.body.nameUPSI,
        description: req.body.description,
        validityFrom: req.body.validityFrom,
        validityTo: req.body.validityTo,
        status: req.body.status,
        remarks: req.body.remarks,
      });

      await NewUPSI.save();
      const response = {
        message: "User UPSI Created!!" + `id ${req.body.loginid}`,
      };
      res.json(response);
    });

    /////////////// UPSI Persons (CPs+DPs)
    app.get("/upsi/persons/list", async function (req, res) {
      var upsiPerson = await UPSIPerson.find();
      res.json(upsiPerson);
    });

    app.post("/upsi/persons/add", async function (req, res) {
      const NewUPSIPerson = new UPSIPerson({
        upsiID: req.body.upsiID,
        DP: req.body.DP,
        CP: req.body.CP,
        owner: req.body.owner,
      });
      await NewUPSIPerson.save();
      const response = {
        message: "User UPSI Created!!" + `id ${req.body.loginid}`,
      };
      res.json(response);
    });

    //Person get
    app.get("/upsi/persons/list/:id", async function (req, res) {
      var upsiPerson = await UPSIPerson.find({ upsiID: req.body.loginid });
      res.json(upsiPerson);
    });

    app.put("/upsi/persons/update/:id", async function (req, res) {
      try {
        const id = req.params.id;
        const updatedFields = {};
        if (req.body.DP) {
          updatedFields.DP = req.body.DP;
        }
        if (req.body.CP) {
          updatedFields.CP = req.body.CP;
        }

        const updatedPerson = await UPSIPerson.findOneAndUpdate(
          { _id: id },
          { $set: updatedFields },
          { new: true }
        );

        if (!updatedPerson) {
          return res.status(404).json({ message: "Person not found" });
        }

        res.json({ message: "Person updated successfully", updatedPerson });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////
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
