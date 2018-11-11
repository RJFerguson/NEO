#!/usr/bin/env node

const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('eosjs');
const fetch = require('node-fetch');                            // node only; not needed in browsers
const { TextDecoder, TextEncoder } = require('text-encoding');  // node, IE11 and IE Edge Browsers

const endpoint = "http://localhost:8888";

function publisher(account, privateKey, note) {
  const defaultPrivateKey = "5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"; // useraaaaaaaa
  const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
  const rpc = new JsonRpc('http://127.0.0.1:8000', { fetch });
  const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
  (async () => {
      const result = await api.transact({
        actions: [{
          account: 'eosio.token',
          name: 'transfer',
          authorization: [{
            actor: 'useraaaaaaaa',
            permission: 'active',
          }],
          data: {
            from: 'useraaaaaaaa',
            to: 'useraaaaaaab',
            quantity: '0.0001 SYS',
            memo: '',
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      console.dir(result);
  })();
}

exports.publish = publisher;


const account = {
  name: "useraaaaaaaa",
  privateKey: "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5",
  publicKey: "EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"
};

let note = ""
let actionName = "";
let actionData = {};

publisher(account, account.privateKey, "");
