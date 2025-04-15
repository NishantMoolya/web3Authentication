import React, { useState } from 'react'
import useWallet from '../../hooks/useWallet'

const Login = () => {
    const wallet = useWallet();
    const [nonce, setNonce] = useState('');
    const [signature, setSignature] = useState('');
    const [role, setRole] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    
    // Handler for generating nonce
    const handleGetNonce = async () => {
        try {
            const walletAddress = await wallet.signer.getAddress();
            const response = await fetch(baseURL+'/user/nonce', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ walletAddress }),
            });

            const data = await response.json();
            if (response.status === 201) {
                setNonce(data.data); // Set the nonce returned from the server
            } else {
                setError(data.error);
            }
        } catch (err) {
            console.error("Error fetching nonce:", err);
            setError("An error occurred while fetching the nonce");
        }
    };

    // Handler for verifying the signature
    const handleVerifySignature = async () => {
        try {
            const walletAddress = await wallet.signer.getAddress();
            const signature = await wallet.signer.signMessage(nonce);
            
            const response = await fetch(baseURL+'/user/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ walletAddress, signature, role:"patient" }),
            });

            const data = await response.json();
            if (response.status === 201) {
                setToken(data.data.token); // Set the JWT token returned from the server
                setError('');
            } else {
                setError(data.error);
            }
        } catch (err) {
            console.error("Error verifying signature:", err);
            setError("An error occurred while verifying the signature");
        }
    };

    return (
        <div>
            <h1>Ethereum Authentication</h1>

            {/* Input for wallet address */}
            {/* <div>
                <input
                    type="text"
                    placeholder="Enter Wallet Address"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                />
            </div> */}

            {/* Button to get nonce */}
            <div>
                <button onClick={handleGetNonce}>Get Nonce</button>
            </div>

            {nonce && <p>Nonce: {nonce}</p>}

            {/* Input for signature */}
            <div>
                <input
                    type="text"
                    placeholder="Enter Signature"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                />
            </div>

            {/* Input for role (optional) */}
            <div>
                <input
                    type="text"
                    placeholder="Enter Role (optional)"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
            </div>

            {/* Button to verify signature */}
            <div>
                <button onClick={handleVerifySignature}>Verify Signature</button>
            </div>

            {token && <p>JWT Token: {token}</p>}

            {/* Error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login