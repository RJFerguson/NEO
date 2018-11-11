import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs';

const endpoint = "http://localhost:8888";

const account = {
  name: "useraaaaaaaa",
  privateKey: "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5",
  publicKey: "EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"
};


// let account = account.name
// let privateKey = account.privateKey
let note = ""

let actionName = "";
let actionData = {};


export function getTable() {
  const rpc = new JsonRpc(endpoint);
  return rpc.get_table_rows({
    "json": true,
    "code": "notechainacc",   // contract who owns the table
    "scope": "notechainacc",  // scope of the table
    "table": "notestruct",    // name of the table as specified by the contract abi
    "limit": 100,
  }).then(result => result);
}


