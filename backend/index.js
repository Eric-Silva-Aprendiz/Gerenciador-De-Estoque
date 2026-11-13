require('dotenv').config({quiet: true});
const express = require('express');
//const cors = require('cors');
const port = 3000;
const app = require("./app.js");


let server = app.listen(port, () => console.log(`SERVIDOR PRONTO PORTA: ${port}`));

module.exports = server;