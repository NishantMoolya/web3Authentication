// UploadToPinata.jsx
import { useState } from 'react';

const UploadToPinata = () => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file first!');

    const formData = new FormData();
    formData.append('file', file);
    // console.log("API KEY", import.meta.env.VITE_PINATA_API_KEY);
    // console.log("SECRET KEY", import.meta.env.VITE_PINATA_SECRET_API_KEY);


    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        pinata_api_key: "08d1b7c2fa661e3ea101",
        pinata_secret_api_key:"45d05faa6c3f66089ed712be3fbc0eb0d6d84e79973be1544fbc81be0be3d124",
      },
      
      body: formData,
    });


    const data = await res.json();
    console.log(data);
    setIpfsHash(data.IpfsHash);
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Upload File to IPFS via Pinata</h2>

      <input type="file" onChange={handleFileChange} className="mb-4" />

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload to IPFS
      </button>

      {ipfsHash && (
        <div className="mt-4">
          <p className="text-green-600">✅ Uploaded Successfully!</p>
          <p><strong>IPFS Hash:</strong> {ipfsHash}</p>
          <a
            href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View File
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadToPinata;
