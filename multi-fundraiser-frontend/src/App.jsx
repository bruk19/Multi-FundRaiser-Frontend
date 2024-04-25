import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "./constants/fundRaiser";
import { getWeb3, setupWeb3 } from "./web3";

function App() {

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

  return (
    <>
      <div>
        <h1>Fund Raiser</h1>
      </div>
    </>
  )
}

export default App
