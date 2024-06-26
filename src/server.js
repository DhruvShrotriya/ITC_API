const express = require("express");
app = express();

const mongoose = require("mongoose");

const Note = require("./models/Note");
const User = require("./models/User");
const UserLogin = require("./models/UserLogin");
const DeclarationPI = require("./models/DeclarationPI");
const DeclarationRealation = require("./models/DeclarationRelation");
const DeclarationDemat = require("./models/DeclarationDemat");
const DeclarationDelete = require("./models/DEclarationDelete");
const UPSI = require("./models/UPSI");
const UPSIPerson = require("./models/UPSIPerson");
const CP = require("./models/CP");
const PreClearance = require("./models/Preclearance");
const Announcement = require("./models/Announcement");

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
    app.get("/declaration/list", async function (req, res) {
      var declarationPI = await DeclarationPI.find();
      res.json(declarationPI);
    });

    app.get("/declaration/list/:loginid", async function (req, res) {
      var declarationPI = await DeclarationPI.find({
        loginid: req.params.loginid,
      });
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

    ////////////////////// DECLRATION RELATION
    app.get("/declaration/relation/list", async function (req, res) {
      var declarationRealation = await DeclarationRealation.find();
      res.json(declarationRealation);
    });
    app.get("/declaration/relation/list/:loginid", async function (req, res) {
      var declarationRealation = await DeclarationRealation.find({
        loginid: req.params.loginid,
      });
      res.json(declarationRealation);
    });

    app.post("/declaration/relation/add", async function (req, res) {
      const newRealtion = new DeclarationRealation({
        loginid: req.body.loginid,
        name: req.body.name,
        relation: req.body.relation,
        pan: req.body.pan,
      });
      await newRealtion.save();
      const response = { message: "Declaration updated" };
      res.json(response);
    });

    ////////////////////////////Declaration Demat
    app.get("/declaration/demat/list", async function (req, res) {
      var declarationDemat = await DeclarationDemat.find();
      res.json(declarationDemat);
    });
    app.get("/declaration/demat/list/:loginid", async function (req, res) {
      var declarationDemat = await DeclarationDemat.find({
        loginid: req.params.loginid,
      });
      res.json(declarationDemat);
    });

    app.get("/declaration/demat/list/byname/:name", async function (req, res) {
      var declarationDemat = await DeclarationDemat.find({
        name: req.params.name,
      });
      res.json(declarationDemat);
    });

    app.post("/declaration/demat/add", async function (req, res) {
      const newDemat = new DeclarationDemat({
        loginid: req.body.loginid,
        name: req.body.name,
        demat: req.body.demat,
      });
      await newDemat.save();
      const response = { message: "Declaration updated" };
      res.json(response);
    });

    app.put("/declaration/demat/update/:id", async function (req, res) {
      try {
        const id = req.params.id;
        const updatedFields = {};
        if (req.body.holdings) {
          updatedFields.holdings = req.body.holdings;
        }

        const updatedPerson = await DeclarationDemat.findOneAndUpdate(
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

    app.get("/declaration/demat/list/findid/:demat", async function (req, res) {
      var declarationDemat = await DeclarationDemat.find({
        demat: req.params.demat,
      });
      res.json(declarationDemat);
    });

    //Declaration Delete
    app.get("/declaration/deletereq/list", async function (req, res) {
      var declarationDelete = await DeclarationDelete.find();
      res.json(declarationDelete);
    });

    app.post("/declaration/delete/add", async function (req, res) {
      await DeclarationDelete.deleteOne({ loginid: req.body.loginid });
      const NewDeclarationDelete = new DeclarationDelete({
        loginid: req.body.loginid,
        reason: req.body.reason,
      });
      await NewDeclarationDelete.save();
      const response = { message: "Declaration updated" };
      res.json(response);
    });

    ///////Delete Declaration
    app.get("/declaration/delete/user/:loginid", async function (req, res) {
      await DeclarationPI.deleteMany({ loginid: req.params.loginid });
      res.json({ message: "All user info deleted successfully" });
    });
    ////////Delete Relation
    app.get(
      "/declaration/delete/relation/list/:loginid",
      async function (req, res) {
        await DeclarationRealation.deleteMany({ loginid: req.params.loginid });
        res.json({ message: "All Relations deleted successfully" });
      }
    );

    //Delete Demat
    app.get(
      "/declaration/delete/demat/list/:loginid",
      async function (req, res) {
        await DeclarationDemat.deleteMany({ loginid: req.params.loginid });
        res.json({ message: "All demats deleted successfully" });
      }
    );

    //Delete delete Request
    app.get(
      "/declaration//delete/deletereq/list/:loginid",
      async function (req, res) {
        await DeclarationDelete.deleteMany({ loginid: req.params.loginid });
        res.json({ message: "All demats deleted successfully" });
      }
    );
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
      await UPSI.deleteOne({ upsiID: req.body.upsiID });
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
      var upsiPerson = await UPSIPerson.find({ upsiID: req.body.upsiID });
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

    //Person get
    app.get("/upsi/persons/list/:id", async function (req, res) {
      var upsiPerson = await UPSIPerson.find({ upsiID: req.params.id });
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

    ///////////////////////////////////////////CP////////////////////////////////////////////////////
    app.get("/cp/list/", async function (req, res) {
      var cp = await CP.find();
      res.json(cp);
    });

    app.post("/cp/list/add", async function (req, res) {
      var cp = await CP.find({ upsiID: req.body.upsiID });
      const newcp = new CP({
        CP: req.body.CP,
        firm: req.body.firm,
      });
      await newcp.save();
      const response = {
        message: "User UPSI Created!!" + `id ${req.body.loginid}`,
      };
      res.json(response);
    });

    /////////////////////////////////////////////////////////////PRECLEARANCE/////////////////////////////

    app.get("/preClearance/list", async function (req, res) {
      var preClearance = await PreClearance.find();
      res.json(preClearance);
    });

    app.get("/preClearance/list/:loginid", async function (req, res) {
      var preClearance = await PreClearance.find({
        loginid: req.params.loginid,
      });
      res.json(preClearance);
    });
    app.get("/preClearance/list/:loginid/:status", async function (req, res) {
      var preClearance = await PreClearance.find({
        loginid: req.params.loginid,
        status: req.params.status,
      });
      res.json(preClearance);
    });
    app.get("/preClearance/status/list/:status", async function (req, res) {
      var preClearance = await PreClearance.find({
        status: req.params.status,
      });
      res.json(preClearance);
    });
    app.get("/preClearance/pending/list", async function (req, res) {
      var preClearance = await PreClearance.find({
        status: "Pending",
      });
      res.json(preClearance);
    });

    app.post("/preClearance/add", async function (req, res) {
      const NewPreclearance = new PreClearance({
        loginid: req.body.loginid,
        for: req.body.for,
        typeofSecurity: req.body.typeofSecurity,
        quantity: req.body.quantity,
        transactionType: req.body.transactionType,
        demat: req.body.demat,
        reqested: req.body.reqested,
        status: req.body.status,
        reviewdOn: req.body.reviewdOn,
        remarks: req.body.remarks,
        value: req.body.value,
      });
      await NewPreclearance.save();
      const response = { message: "NewPreclearance updated" };
      res.json(response);
    });

    app.put("/preClearance/update/:id", async function (req, res) {
      try {
        const id = req.params.id;
        const updatedFields = {};

        if (req.body.status) {
          updatedFields.status = req.body.status;
        }
        if (req.body.reviewdOn) {
          updatedFields.reviewdOn = req.body.reviewdOn;
        }
        if (req.body.approvedby) {
          updatedFields.approvedby = req.body.approvedby;
        }
        if (req.body.remarks) {
          updatedFields.remarks = req.body.remarks;
        }
        const preclearance = await PreClearance.findOneAndUpdate(
          { _id: id },
          { $set: updatedFields },
          { new: true }
        );

        if (!preclearance) {
          return res.status(404).json({ message: "Person not found" });
        }

        res.json({ message: "Person updated successfully", preclearance });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    //////////////////////////////////////////////Announcement/////////////////////////////////
    app.get("/announcement/list", async function (req, res) {
      var announcement = await Announcement.find();
      res.json(announcement);
    });
    app.post("/announcement/add", async function (req, res) {
      await Announcement.deleteOne({ loginid: req.body.loginid });
      const NewAnnouncement = new Announcement({
        loginid: req.body.loginid,
        announcemet: req.body.announcemet,
        validityfrom: req.body.validityfrom,
        validityto: req.body.validityto,
      });
      await NewAnnouncement.save();
      const response = { message: "New Announcement Saved" };
      res.json(response);
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
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
