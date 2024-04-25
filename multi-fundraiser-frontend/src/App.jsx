import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "./constants/fundRaiser";
import { getWeb3, setupWeb3 } from "./web3";

function App() {

  const [contract, setContract] = useState(null);
  const [goal, setGoal] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [amount, setAmount] = useState("");
  const[fundFundName, setFundFundName] = useState("");
  const [withdrawFundName, setWithdrawFundName] = useState("");
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    async function initialize() {
      await setupWeb3();
      const web3Instance = getWeb3();
      console.log(web3Instance);

      const signer = await web3Instance.getSigner();
      console.log(signer)
      const contractInstance = new ethers.Contract(contractAddress, abi, signer);
      setContract(contractInstance);

      listOfFunds();
    }
    initialize();
  }, []);

  const createFundRaise = async (createFundName, goal, timeDuration) => {
    if (window.ethereum !== undefined) {
      try {
        console.log(contract)
        const tx = await contract.createFundRaise(createFundName, goal, timeDuration);
        await tx.wait();

        window.alert("Fundraiser created successfully.");

        listOfFunds();

        setCreateFundName("");
        setGoal("");
        setTimeDuration("");

      } catch (error) {
        console.error("The fundraiser is not created: ", error);
      };
    };
  };

  const fund = async (fundFundName, amount) => {
    if (window.ethereum !== undefined && contract) {
      try {
        const tx = await contract.fund(fundFundName, {
          value: ethers.parseEther(amount),
        });
        await tx.wait();
        window.alert("Funded successfully");

        setFundFundName("");
        setAmount("");

      } catch(error) {
        console.error("Error on funding: ", error);
      };
    };
  };

  const withdrawOrRefund = async (createFundName) => {
    if (window.ethereum !== undefined && contract) {
      try {
        const tx = await contract.withdrawOrRefund(createFundName);
        await tx.wait();
        window.alert("withdrawn or refunded successfully.");

        setWithdrawFundName("");
      } catch (error) {
        console.error("Error withdrawing or refunding: ", error);
      };
    };
  };

  const listOfFunds = async () => {
    if (contract) {
      const allFunds = await contract.listOfFunds();
      setFunds(allFunds);
    };
  };

  const whoFund = async (fundersInput) => {
    if (contract) {
      try {
        const fundersList = await contract.whoFund(fundersInput);
        setFunders(fundersList);
      } catch (error) {
        console.error("Error retrieving funders: ", error);
      };
    };
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