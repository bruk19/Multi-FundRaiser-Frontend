import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "./constants/fundRaiser";
import { getWeb3, setupWeb3 } from "./web3";
// import { Web3Provider } from "ethers/providers";

const App = () => {

  const [contract, setContract] = useState(null);
  const [goal, setGoal] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [amount, setAmount] = useState("");
  const[fundFundName, setFundFundName] = useState("");
  const [withdrawFundName, setWithdrawFundName] = useState("");
  const [funds, setFunds] = useState([]);
  const [whoFundName, setWhoFundName] = useState("");
  const [funders, setFunders] = useState([]);
  const [createFundName, setCreateFundName] = useState("");
  

  useEffect(() => {
    async function initialize() {
      await setupWeb3();
      const web3Instance = getWeb3(); // Initialize Web3 provider.
      console.log(web3Instance)
      // Paste your deployed-contract address
      const signer = await web3Instance.getSigner();
      console.log(signer)
      const contractInstance = new ethers.Contract(contractAddress, abi, signer);
       setContract(contractInstance);

      // Fetch the initial list of funds as soon as the component mounts.
      listOfFunds();

    }
    initialize();
  }, []);
   

  // Function to add a new fundraiser to the contract.
const createFundRaise = async (createFundName, goal, timeDuration) => {
  if (window.ethereum !== undefined) {
       try {
    console.log(contract)
    const tx = await contract.createFundRaise(createFundName, goal, timeDuration);
    await tx.wait();
    // Display a success message
    window.alert("Fundraiser created successfully.");
    // Additional code to update UI or perform other actions after successful transaction
    listOfFunds();

    setCreateFundName("");
    setGoal("");
    setTimeDuration("");
    } catch (error) {
         console.error("the fundraiser is not created: ", error);
    }

}
};

  // Function to fund a specific fundraiser.
  const fund = async (fundFundName, amount) => {
    if (window.ethereum !== undefined && contract) {
      try {
        const tx = await contract.fund(fundFundName, {
          value: ethers.parseEther(amount),
        });
        await tx.wait();
        window.alert("Funded successfully.");

        setFundFundName("");
        setAmount("");
      } catch (error) {
        console.error("Error funding: ", error);
      }
    }
  };

  // Function to withdraw or refund funds from a specific fundraiser.
  const withdrawOrRefund = async (createFundName) => {
    if (window.ethereum !== undefined && contract) {
      try {
        const tx = await contract.withdrawnOrRefund(createFundName);
        await tx.wait();
        window.alert("Withdrawn or refunded successfully.");

        // Refresh the list of funds after withdrawing or refunding.
        setWithdrawFundName("");
      } catch (error) {
        console.error("Error withdrawing or refunding: ", error);
      }
    }
  };

  // Function to retrieve and display the list of funds from the contract.
  const listOfFunds = async () => {
    if (contract) {
      const allFunds = await contract.listofFunds();
      setFunds(allFunds);
    }
  };

  // Function to retrieve and display the list of funders for a specific fundraiser.
  const whoFund = async (fundersInput) => { // Use fundersInput as the parameter
    if (contract) {
      try {
        const fundersList = await contract.whoFund(fundersInput);
        setFunders(fundersList);
      } catch (error) {
        console.error("Error retrieving funders: ", error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Fundraiser</h1>
      <div className="input-field">
        <input
          type="text"
          placeholder="Fund Name"
          value={createFundName}
          onChange={(e) => setCreateFundName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Time Duration"
          value={timeDuration}
          onChange={(e) => setTimeDuration(e.target.value)}
        />
        <button onClick={() => createFundRaise(createFundName, goal, timeDuration)}>Create Fundraiser</button>
      </div>
      <div className="input-field">
        <input
          type="text"
          placeholder="Fund Name"
          value={fundFundName}
          onChange={(e) => setFundFundName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Amount to Fund"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={() => fund(fundFundName, amount)}>Fund</button>
      </div>
      <div className="input-field">
        <input
          type="text"
          placeholder="Fund Name"
          value={withdrawFundName}
          onChange={(e) => setWithdrawFundName(e.target.value)}
        />
        <button onClick={() => withdrawOrRefund(withdrawFundName)}>
          Withdraw or Refund
        </button>
      </div>
   <div>
        <input
          type="text"
          placeholder="Fund Name"
          value={whoFundName} // Use fundFundName here
          onChange={(e) => setWhoFundName(e.target.value)} // Use setFundFundName here
        />
        <button onClick={() => whoFund(whoFundName)}>Who Funded</button> {/* Use fundFundName here */}
      </div>
      <div className="input-field">
        <button onClick={listOfFunds}>List of Funds</button> 
        {/* <button onClick={() => whoFund(fundFundName)}>Who Funded</button> */}
      </div>
      <h4>List of Funds</h4>
      <ul>
        {funds.map((fund, index) => (
          <li key={index}>
            <span>{fund}</span>
          </li>
        ))}
      </ul>
      <h4>Who Funded</h4>
      <ul>
        {funders.map((funder, index) => (
          <li key={index}>
            <span>{funder}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
