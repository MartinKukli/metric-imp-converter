const chai = require("chai");
const assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

const convertHandler = new ConvertHandler();

suite("Unit Tests", () => {
  suite("Function convertHandler.getNum(input)", () => {
    test("Whole number input", (done) => {
      const input = "32L";
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test("Decimal Input", (done) => {
      const input = "4.7L";
      assert.equal(convertHandler.getNum(input),4.7);
      done();
    });
    
    test("Fractional Input", (done) => {
      const input = "1/2gal";
      assert.equal(convertHandler.getNum(input),0.5);
      done();
    });
    
    test("Fractional Input w/ Decimal", (done) => {
      const input = "5.4/3lbs";
      assert.equal(convertHandler.getNum(input),1.8);
      done();
    });
    
    test("Invalid Input (double fraction)", (done) => {
      const input = "1/2/3gal";
      assert.equal(convertHandler.getNum(input),"invalid number");
      done();
    });
    
    test("No Numerical Input", (done) => {
      const input = "gal";
      assert.equal(convertHandler.getNum(input),1);
      done();
    }); 
    
  });
  
  suite("Function convertHandler.getUnit(input)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      const input = ["gal","l","mi","km","lbs","kg","GAL","L","MI","KM","LBS","KG"];
      input.forEach((ele) => {
        assert.equal(convertHandler.getUnit(ele),ele);
      });
      done();
    });
    
    test("Unknown Unit Input", (done) => {
      const invalidUnit = "OK";
      assert.equal(convertHandler.getUnit(invalidUnit), "invalid unit");
      done();
    });
  });
  
  suite("Function convertHandler.getReturnUnit(initUnit)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      const input = ["gal","l","mi","km","lbs","kg"];
      const expect = ["l","gal","km","mi","kg","lbs"];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });  
  
  suite("Function convertHandler.spellOutUnit(unit)", () => {
    const input = ["gal", "l", "mi", "km", "lbs","kg"];
    const expect = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];
    test("For Each Valid Unit Inputs", (done) => {
      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });
  
  suite("Function convertHandler.convert(num, unit)", () => {
    test("Gal to L", (done) => {
      const input = [5, "gal"];
      const expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test("L to Gal", (done) => {
      const input = [18.9271, "l"];
      const expected = 5;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test("Mi to Km", (done) => {
      const input = [5, "mi"];
      const expected = 8.04672;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test("Km to Mi", (done) => {
      const input = [8.04672, "km"];
      const expected = 5;
      
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test("Lbs to Kg", (done) => {
      const input = [50, "lbs"];
      const expected = 22.67962;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test("Kg to Lbs", (done) => {
      const input = [22.67962, "kg"];
      const expected = 50;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
  });
  
  suite("Function convertHandler.getString(initNum, initUnit, returnNum, returnUnit)", () => {
    test("3.1mi to 4.98895km", (done) => {
      const initNum = 3.1;
      const initUnit = "mi";
      const returnNum = 4.98895;
      const returnUnit = "km";
      const expected = "3.1 miles converts to 4.98895 kilometers";
      assert.equal(convertHandler.getString(initNum, initUnit, returnNum, returnUnit), expected);
      done();
    });
    test("80KM to 49.71MI", (done) => {
      const initNum = 80;
      const initUnit = "KM";
      const returnNum = 49.71;
      const returnUnit = "MI";
      const expected = "80 kilometers converts to 49.71 miles";
      assert.equal(convertHandler.getString(initNum, initUnit, returnNum, returnUnit), expected);
      done();
    });
  });

});