"use strict";
const excelToJson = require("convert-excel-to-json");
const express = require("express");
const fs = require("fs");
const app = express();
const port = 8080;
const request = require("request");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(express.static("public"));
app.use(fileUpload());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Pass to next layer of middleware
  next();
});

app.get("/currentId", (req, res) => {
  fs.readFile("./public/id.txt", "utf8", function (err, data) {
    var number = parseInt(data);
    res.write(`${number}`);
    res.end();
  });
});

app.get("/download", (req, res) => {
  fs.readFile("./public/id.txt", "utf8", function (err, data) {
    var number = parseInt(data - 1);
    res.sendFile(path.join(__dirname + `/public/${number}.json`));
  });
});

app.get("/download/:id", (req, res) => {
  res.sendFile(path.join(__dirname + `/public/${req.params.id}.json`));
});

app.post("/upload", function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv("./public/frse.xlsx", function (err) {
    if (err) return res.status(500).send(err);

    res.sendFile(path.join(__dirname + "/uploaded.html"));
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/json", (req, res) => {
  var number = 0;
  fs.readFile("./public/id.txt", "utf8", function (err, data) {
    if (err) throw err;
    number = parseInt(data);

    const result = excelToJson({
      sourceFile: "public/frse.xlsx",
    });

    fs.writeFile(`public/${number}.json`, JSON.stringify(result), function (
      err
    ) {
      // Deal with possible error here.
    });

    number = number + 1;
    fs.writeFile("./public/id.txt", `${number}`, function (err) {
      console.log(`The current ID is: ${number}`);
    });

    res.sendFile(path.join(__dirname + "/json.html"));
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
