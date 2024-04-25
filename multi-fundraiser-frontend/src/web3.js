import { ethers } from "ethers";

let web3;

export async function setupWeb3() {
 
let signer = null;

if (window.ethereum == null) {

    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider()
    

} else {

    web3 = new ethers.BrowserProvider(window.ethereum)
    signer = await web3.getSigner();

    const networkId = (await web3.getNetwork()).chainId;
    if (networkId != 11155111) {
       window.alert("Please switch to Polygon Sepolia Testnet");
     }
    await window.ethereum.request({ method: "eth_requestAccounts" });

}
}

// Call the 'setupWeb3' function to set up the Web3 provider when the script is loaded.
//setupWeb3();

// Export a function to retrieve the Web3 provider.
export function getWeb3() {
  return web3;
}