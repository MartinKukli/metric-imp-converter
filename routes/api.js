"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = app => {
  const convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    try {
      const input = req.query.input;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      res.json({
        initNum: ((typeof initNum) === "number") ? parseFloat(initNum) : initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: toString
      });
    } catch(e) {
      res.json({error: "Something went wrong..."})
      console.log(e.message);
    }
  });
};
