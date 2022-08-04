let Web3 = require("xdc3");
const xdcURL = "https://xdcpayrpc.blocksscan.io"; //use archive node
const ethURL = ""; //use archive node(infura)

async function getRevertReason(txHash, rpcURL) {
  const web3 = new Web3(rpcURL);
  const tx = await web3.eth.getTransaction(txHash);

  console.log("tx", tx);

  var result = await web3.eth.call(tx, tx.blockNumber);

  console.log("result>>>>>>>>>", result);

  result = result.startsWith("0x") ? result : `0x${result}`;

  if (result && result.substr(138)) {
    const reason = web3.utils.toAscii(result.substr(138));
    console.log("Revert reason:", reason);
    return reason;
  } else {
    console.log("Cannot get reason - No return value");
  }
}

getRevertReason(
  "0x47300f7f7ba6ddc798d77c1ee92d70901ab6cfcccc189ed4d150f80486bfd4de",
  ethURL
);
getRevertReason(
  "0x6766433054ef6d24328137bbcdde628ea076dcaaeae40793aa3a58f0ce19daca",
  xdcURL
);
