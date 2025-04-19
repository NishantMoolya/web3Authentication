import { useState } from 'react';
import { ethers } from 'ethers';
import ContractABI from '../contracts/MedicalRecordsConsent.json'
const useWallet = () => {
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const connectWallet = async () => {
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        alert('Please install MetaMask');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      // const contractInstance = new ethers.Contract(contractAddress, ContractABI.abi, signer);
      console.log(signer);
      
      // setContract(contractInstance);
      setSigner(signer);
      return signer;
    } catch (error) {
      console.error("Wallet connection failed:", error);
      throw error;
    }
  };

  const getContract = () => contract; 
  const getSigner = () => signer; 

  return { connectWallet, getContract, getSigner };
};

export default useWallet;
