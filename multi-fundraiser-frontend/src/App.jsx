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

  return (
    <>
      <div>
        <h1>Fund Raiser</h1>
      </div>
    </>
  )
}

export default App
