import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useWallet = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const getEthereumObject = () => window.ethereum;

  useEffect(() => {
    if (typeof window !== 'undefined' && getEthereumObject()) {
      const browserProvider = new ethers.BrowserProvider(getEthereumObject());
      setProvider(browserProvider);
    } else {
        alert('Install MetaMask');
      console.error('MetaMask is not installed.');
    }
  }, []);

  useEffect(() => {
    const initializeSignerAndContract = async () => {
      if (provider) {
        const signer = await provider.getSigner();
        setSigner(signer);
      }
    };

    initializeSignerAndContract();
  }, [provider]);

  return { signer };
};

export default useWallet;
