firstBlock = '// SPDX-License-Identifier: MIT\n\
pragma solidity ^0.8.7;\n\
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";\n\
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";\n\
contract GeospatialConsumer is ChainlinkClient, ConfirmedOwner {\n\
using Chainlink for Chainlink.Request;\n\
uint256 public constant ORACLE_PAYMENT = 0.1 * 10**19; // 1 LINK\n\
int256 public currentData;\n\
//declaring Shamba oracle address and jobid\n\
address private oracle;\n\
bytes32 private jobId;\n\
//this is where we initialize state variables\n\
constructor() ConfirmedOwner(msg.sender) {\n\
setPublicChainlinkToken();\n\
//here we initialize the oracle address and jobids\n\
oracle = 0xd5CEd81bcd8D8e06E6Ca67AB9988c92CA78EEfe6;\n\
jobId = "5000f186a1b34b19998aa8e5a5e08c92";\n\
}\n\
//here we build the data request\n\
function requestGeospatialData() public onlyOwner returns (bytes32 requestId) {\n\
Chainlink.Request memory req = buildChainlinkRequest(\n\
jobId,\n\
address(this),\n\
this.fulfillGeospatialData.selector\n\
);\n\
req.add("data",'
lastBlock ='\nreturn sendChainlinkRequestTo(oracle, req, ORACLE_PAYMENT);\n\
}\n\
//This is the callback function\n\
//currentData is the variable that holds the data from the oracle\n\
function fulfillGeospatialData(bytes32 _requestId, int256 _data) public recordChainlinkFulfillment(_requestId)\n\
{\n\
currentData = _data;\n\
}\n\
}\n\ '

