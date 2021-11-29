firstBlock = '// SPDX-License-Identifier: MIT \  \npragma solidity ^0.8.7; \n \
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";  \n \
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol"; \n \
contract ATestnetConsumer is ChainlinkClient, ConfirmedOwner { \n \
  using Chainlink for Chainlink.Request; \n \
  uint256 constant private ORACLE_PAYMENT = 1 * LINK_DIVISIBILITY; \n \
  uint256 public currentPrice; \n \
  int256 public changeDay; \n \
  bytes32 public lastMarket; \n \
  mean = 123000; \n \
  median = 234000;  \n \
  max = 345000; \n \
  min = 456000; \n \
  variance = 567000; \n '

lastBlock = '\nconstructor() ConfirmedOwner(msg.sender){ \n\
    setPublicChainlinkToken();}\n\
  function requestEthereumPrice(address _oracle, string memory _jobId)\n\
    public\n\
    onlyOwner\n\
  {\n\
    Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), address(this), this.fulfillEthereumPrice.selector);\n\
    req.add("get", "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");\n\
    req.add("path", "USD");\n\
    req.addInt("times", 100);\n\
    sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);\n\
  }\n\
  function requestEthereumChange(address _oracle, string memory _jobId)\n\
    public\n\
    onlyOwner\n\
  {\n\
    Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), address(this), this.fulfillEthereumChange.selector);\n\
    req.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");\n\
    req.add("path", "RAW.ETH.USD.CHANGEPCTDAY");\n\
    req.addInt("times", 1000000000);\n\
    sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);\n\
  }\n\
  function requestEthereumLastMarket(address _oracle, string memory _jobId)\n\
    public\n\
    onlyOwner\n\
  {\n\
    Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), address(this), this.fulfillEthereumLastMarket.selector);\n\
    req.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");\n\
    string[] memory path = new string[](4);\n\
    path[0] = "RAW";\n\
    path[1] = "ETH";\n\
    path[2] = "USD";\n\
    path[3] = "LASTMARKET";\n\
    req.addStringArray("path", path);\n\
    sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);\n\
  }\n\
  function withdrawLink() public onlyOwner {\n\
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());\n\
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");\n\
  }\n\
  function cancelRequest(\n\
    bytes32 _requestId,\n\
    uint256 _payment,\n\
    bytes4 _callbackFunctionId,\n\
    uint256 _expiration\n\
  )\n\
    public\n\
    onlyOwner\n\
  {\n\
    cancelChainlinkRequest(_requestId, _payment, _callbackFunctionId, _expiration);\n\
  }\n\
  function stringToBytes32(string memory source) private pure returns (bytes32 result) {\n\
    bytes memory tempEmptyStringTest = bytes(source);\n\
    if (tempEmptyStringTest.length == 0) {\n\
      return 0x0;\n\
    }\n\
    assembly { \n\
      result := mload(add(source, 32))\n\
    }\n\
  }\n\
}\n\
'