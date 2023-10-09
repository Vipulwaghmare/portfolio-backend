import { randomBytes } from "node:crypto";
import { getHashes, createSign } from "node:crypto";

console.log("HI", randomBytes(32).toString("hex"));
// console.log(getHashes());
console.log(
  createSign("sha256", {
    email: "vipul.com",
  }),
);
