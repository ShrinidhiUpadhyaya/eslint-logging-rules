// index.js
const customRule1 = require("./lib/catch");
const customRule2 = require("./lib/custom-fields");
const customRule3 = require("./lib/json-log");
const customRule4 = require("./lib/return");
const customRule5 = require("./lib/then");

module.exports = {
  rules: {
    "catch-rule": customRule1,
    "custom-fields-rule": customRule2,
    "json-log-rule": customRule3,
    "return-rule": customRule4,
    "then-rule": customRule5,
  },
};
