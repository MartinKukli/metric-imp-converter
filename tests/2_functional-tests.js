const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  suite("Routing Tests", () => {
    suite("GET /api/convert => conversion object", () => {
      test("Convert 10L (valid input)", (done) => {
        chai.request(server)
          .get("/api/convert")
          .query({ input: "10L" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, "L");
            assert.approximately(res.body.returnNum, 2.64172, 0.1);
            assert.equal(res.body.returnUnit, "GAL");
            done();
          });
      });

      test("Convert 32g (invalid input unit)", (done) => {
        chai.request(server)
          .get("/api/convert")
          .query({ input: "32g" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 32);
            assert.equal(res.body.initUnit, "invalid unit");
            assert.equal(res.body.returnNum, 32);
            assert.equal(res.body.returnUnit, "invalid unit");
            done();
          });
      });

      test("Convert 3/7.2/4kg (invalid number)", (done) => {
        chai.request(server)
          .get("/api/convert")
          .query({ input: "3/7.2/4kg" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, "invalid number");
            assert.equal(res.body.initUnit, "kg");
            assert.equal(res.body.returnNum, "invalid number");
            assert.equal(res.body.returnUnit, "lbs");
            done();
          });
      });

      test("Convert 3/7.2/4kilomegagram (invalid number and unit)", (done) => {
        chai.request(server)
          .get("/api/convert")
          .query({ input: "3/7.2/4kilomegagram" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, "invalid number");
            assert.equal(res.body.initUnit, "invalid unit");
            assert.equal(res.body.returnNum, "invalid number");
            assert.equal(res.body.returnUnit, "invalid unit");
            done();
          });
      });

      test("Convert kg (no number)", (done) => {
        chai.request(server)
          .get("/api/convert")
          .query({ input: "kg" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, "kg");
            assert.equal(res.body.returnNum, 2.20462);
            assert.equal(res.body.returnUnit, "lbs");
            done();
          });
      });
    });
  });
});
