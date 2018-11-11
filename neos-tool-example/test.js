#!/usr/bin/env node

var publisher = require('neos-publisher');

const account = {
  name: "useraaaaaaaa",
  privateKey: "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5",
  publicKey: "EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"
};

let note = ""
let actionName = "";
let actionData = {};

publisher.publish(account, account.privateKey, "");
