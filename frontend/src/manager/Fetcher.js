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

export async function handleEvents(event) {
    // stop default behaviour
    event.preventDefault();

    // collect form data
    let account = event.target.account.value;
    let privateKey = event.target.privateKey.value;
    let note = event.target.note.value;

    // prepare variables for the switch below to send transactions
    let actionName = "";
    let actionData = {};

    // define actionName and action according to event type
    switch (event.type) {
      case "submit":
        actionName = "update";
        actionData = {
          user: account,
          note: note,
        };
        break;
      default:
        return;
    }

    // eosjs function call: connect to the blockchain
    const rpc = new JsonRpc(endpoint);
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });
    try {
      const result = await api.transact({
        actions: [{
          account: "notechainacc",
          name: actionName,
          authorization: [{
            actor: account,
            permission: 'active',
          }],
          data: actionData,
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });

      console.log(result);
      return getTable()
    } catch (e) {
      console.log('Caught exception: ' + e);
      if (e instanceof RpcError) {
        console.log(JSON.stringify(e.json, null, 2));
      }
    }
  }


