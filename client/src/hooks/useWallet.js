import { useState } from 'react';
import { ethers } from 'ethers';

const useWallet = () => {
  const [signer, setSigner] = useState(null);

  const connectWallet = async () => {
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        alert('Please install MetaMask');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      console.log(signer);
      
      setSigner(signer);
      return signer;
    } catch (error) {
      console.error("Wallet connection failed:", error);
      throw error;
    }
  };

  return { signer, connectWallet };
};

export default useWallet;
