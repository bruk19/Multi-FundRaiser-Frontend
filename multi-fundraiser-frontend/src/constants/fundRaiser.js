export const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "_fundName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "_fund",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_totalraised",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_isGoal",
        "type": "uint256"
      }
    ],
    "name": "_isGoal",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "_refund",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "_fundName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "_withdraw",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_fundName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_goal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_timeDuration",
        "type": "uint256"
      }
    ],
    "name": "createFundRaise",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_fundName",
        "type": "string"
      }
    ],
    "name": "fund",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "fundNames",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "fundRaiseds",
    "outputs": [
      {
        "internalType": "address",
        "name": "fundRaiserCreator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "goal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timeDuration",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isGoal",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isTimeDuration",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "totalRaised",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "listofFunds",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_funders",
        "type": "string"
      }
    ],
    "name": "whoFund",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "_fundersList",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_fundName",
        "type": "string"
      }
    ],
    "name": "withdrawnOrRefund",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]