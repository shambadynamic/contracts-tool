firstBlock = '// SPDX-License-Identifier: MIT\n\
pragma solidity ^0.8.7;\n\
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";\n\
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";\n\
contract GeospatialConsumer is ChainlinkClient, ConfirmedOwner {\n\
using Chainlink for Chainlink.Request;\n\
uint256 constant private ORACLE_PAYMENT = 0.1 * 10 ** 18; // 0.1 LINK\n\
uint256 public currentData;\n\
//declaring Shamba oracle address and jobids\n\
address private oracle;\n\
bytes32 private mean;\n\
bytes32 private max;\n\
bytes32 private min;\n\
bytes32 private median;\n\
bytes32 private variance;\n\
//declaring user specified parameters\n\
string public dataset_code;\n\
string public selected_band;\n\
string public start_date;\n\
string public end_date;\n\
uint256 public image_scale;\n\
string public geometry;\n\
bytes32 public jobId;\n\
uint256 public threshold;\n\
//this event is emitted on successfull request fulfillment\n\
event RequestGeospatialDataFulfilled(\n\
bytes32 indexed requestId,\n\
uint256 indexed data\n\
);\n\
//this is where we initialize state variables\n\
constructor() ConfirmedOwner(msg.sender){\n\
setPublicChainlinkToken();\n\
//here we initialize the oracle address and jobids\n\
oracle =  0xd5CEd81bcd8D8e06E6Ca67AB9988c92CA78EEfe6;\n\
mean =  "a373c304c48440b28f839daac5fed087";\n\
max =  "a373c304c48440b28f839daac5fed087";\n\
min =  "a373c304c48440b28f839daac5fed087";\n\
median =  "a373c304c48440b28f839daac5fed087";\n\
variance =  "a373c304c48440b28f839daac5fed087";\n\
//code block populated by contracts tool\n\
'
lastBlock = '\n//variable code block ends\n\
}\n\
//here we build the request\n\
function requestGeospatialData()\n\
public\n\
onlyOwner\n\
{\n\
Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfillGeospatialData.selector);\n\
req.add("dataset_code", dataset_code);\n\
req.add("selected_band", selected_band);\n\
req.add("geometry", geometry);\n\
req.add("start_date", start_date);\n\
req.add("end_date", end_date);\n\
req.add("image_scale", image_scale);\n\
//Multiply the result by 1000000000000000000 to remove decimals\n\
int timesAmount = 10**18;\n\
req.addInt("times", timesAmount);\n\
sendChainlinkRequestTo(oracle, req, ORACLE_PAYMENT);\n\
}\n\
//This is the callback function\n\
//currentData is the variable that holds the data from the oracle\n\
function fulfillGeospatialData(bytes32 _requestId, uint256 _data)\n\
public\n\
recordChainlinkFulfillment(_requestId)\n\
{\n\
emit RequestGeospatialDataFulfilled(_requestId, _data);\n\
currentData = _data;\n\
}\n\
}\n\ '