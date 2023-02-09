const DateCheck = require("./dayCheck");

test("check if a new day it recognized on start", async () => {
  dateCheck = new DateCheck();
  expect(await dateCheck.checkNewDay()).toBe(true);
});

test("check if a new day it recognizes a change in the day", async () => {
  dateCheck = new DateCheck();
  expect(await dateCheck.checkNewDay()).toBe(true);
  dateCheck.currentDate = 10;
  expect(await dateCheck.checkNewDay()).toBe(true);
});
