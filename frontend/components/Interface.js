import React, { useState } from 'react';
import wc from '../public/witness_calculator';
import { ethers } from 'ethers';

const Interface = () => {
  const [account, setAccount] = useState(null);
  const [preservative, setPreservative] = useState(0);
  const [adjuvant, setAdjuvant] = useState(0);
  const [stabilizer, setStabilizer] = useState(0);
  const [excipient, setExcipient] = useState(0);
  const [proofAndPublicSignalsBase64, setProofAndPublicSignalsBase64] = useState('');
  const [valid, setValid] = useState('');
  const [proof,setProof] = useState('');

  const contractAddress = '0xba6168adB7157180987F6A84D8f6B0939695e690';
  const ABI = [
      {
        "inputs": [
          {
            "internalType": "uint256[2]",
            "name": "_pA",
            "type": "uint256[2]"
          },
          {
            "internalType": "uint256[2][2]",
            "name": "_pB",
            "type": "uint256[2][2]"
          },
          {
            "internalType": "uint256[2]",
            "name": "_pC",
            "type": "uint256[2]"
          },
          {
            "internalType": "uint256[1]",
            "name": "_pubSignals",
            "type": "uint256[1]"
          }
        ],
        "name": "verifyProof",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    
  ]

  const connectWallet = async () => {
    if (window.ethereum) {
      try {

        if(!window.ethereum){
          alert("Please install Metamask to use this app.");
          throw "no-metamask";
        }
        var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        var chainId = window.ethereum.networkVersion;
        if (chainId !== '534351') { 
          alert('Please connect to Sepolia Scroll testnet');
          return;
        }
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const formatAddress = (address) => {
    return address ? `${address.substring(0, 4)}...${address.substring(address.length - 4)}` : '';
  };



  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleCopyProof = (proofAndPublicSignalsBase64) => {
    navigator.clipboard.writeText(proofAndPublicSignalsBase64)
      .then(() => {
        console.log('Copied to clipboard:');
        alert('Copied');
      })
      .catch((err) => {
        console.error(`Failed to copy to clipboard: ${err}`);
      });
  };

  function isBase64(value) {
    const base64Pattern = /^[A-Za-z0-9+/]{4}([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
  
    return base64Pattern.test(value);
  }
  
  let p = preservative*10000;
  let a = adjuvant*10000;
  let s = stabilizer*10000;
  let e = excipient*10000;

  const proofGeneration = async () => {
    const wasmPath = '/circuit.wasm';
    const res = await fetch(wasmPath);
    const buffer = await res.arrayBuffer();
    const WC = await wc(buffer);
    const SnarkJS = window['snarkjs'];
    const input = {
      preservative: p,
      adjuvant: a,
      stabilizer: s,
      excipient: e,
    };
    const r = await WC.calculateWitness(input, 0);
    if (r[1] == 0) {
      alert('invalid values, drug not safe')
    } 
    else {
      const { proof, publicSignals } = await SnarkJS.groth16.fullProve(
        {
          preservative: p,
          adjuvant: a,
          stabilizer: s,
          excipient: e,
        },
        '/circuit.wasm',
        '/final.zkey'
      );

      const proofAndPublicSignals = {
        proof: proof,
        publicSignals: publicSignals,
      };
      const proofAndPublicSignalsJSON = JSON.stringify(proofAndPublicSignals);
      const proofAndPublicSignalsBase64 = Buffer.from(proofAndPublicSignalsJSON).toString('base64');
      setProofAndPublicSignalsBase64(proofAndPublicSignalsBase64);
    }
  };

  const verifyOnChain = async (proof) => {

    function decodeBase64(proof) {
      if (!isBase64(proof)) {
        alert('Please enter a valid Base64 proof');
        return null; // Return null instead of undefined
      } else {
        try {
          const decodedString = atob(proof);
          const decodedObject = JSON.parse(decodedString);
          return decodedObject;
        } catch (error) {
          alert('An error occurred while decoding the Base64 proof');
          console.error(error);
          return null; // Return null instead of undefined
        }
      }
    }

    if (!account) {
      alert('Please connect your wallet first.');
      return;
    }
  
    if (!isBase64(proof)) {
      alert('Please enter a valid Base64 proof');
      return;
    }
  
    let proofObject = decodeBase64(proof);
    console.log(proofObject)
    if (!proofObject) {
      return;
    }
  
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);
  
      // Prepare proof data for the contract
      const pA = [proofObject.proof.pi_a[0], proofObject.proof.pi_a[1]];
      const pB = [
        [proofObject.proof.pi_b[0][1], proofObject.proof.pi_b[0][0]],
        [proofObject.proof.pi_b[1][1], proofObject.proof.pi_b[1][0]]
      ];
      const pC = [proofObject.proof.pi_c[0], proofObject.proof.pi_c[1]];
      const pubSignals = [proofObject.publicSignals[0]];
  
      // Call the verifyProof function of the contract
      const isValid = await contract.verifyProof(pA, pB, pC, pubSignals);
  
      if (isValid) {
        setValid('Verification OK, the drug is safe');
      } else {
        setValid('Invalid');
      }
    } catch (e) {
      console.error('Error during on-chain proof verification:', e);
      setValid('Verification failed');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', backgroundColor: '#f2f2f2', padding: '20px' }}>
  
      <button onClick={connectWallet} style={{ padding: '0.5rem 1rem', marginTop: '1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        {account ? `Connected: ${formatAddress(account)}` : 'Connect Wallet'}
      </button>
  
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#205375' }}>ZK Drug Verification System</h1>
  
      <div style={{ marginBottom: '2rem', backgroundColor: '#e7e7e7', padding: '20px', borderRadius: '8px' }}>
        {['Preservative', 'Adjuvant', 'Stabilizer', 'Excipient'].map((item, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>{item}:</label>
            <input
              type="text"
              value={eval(item.toLowerCase())}
              onChange={(e) => eval(`set${item}`)(e.target.value)}
              style={{ padding: '0.5rem', marginRight: '1rem', width: '80%', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        ))}
  
        <button onClick={proofGeneration} style={{ padding: '0.5rem 1rem', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Generate Proof
        </button>
      </div>
  
      {proofAndPublicSignalsBase64 && (
        <div style={{ marginBottom: '2rem', backgroundColor: '#e7e7e7', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#205375' }}>Proof and Public Signals:</h2>
          <textarea
            value={proofAndPublicSignalsBase64}
            readOnly
            style={{ width: '100%', minHeight: '10rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff' }}
          />
          <button
            onClick={() => handleCopyProof(proofAndPublicSignalsBase64)}
            style={{ padding: '0.5rem 1rem', marginTop: '1rem', backgroundColor: '#FF9800', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Copy
          </button>
        </div>
      )}
  
      <input
        type="text"
        value={proof}
        onChange={(e) => setProof(e.target.value)}
        placeholder="Enter Base64 Proof"
        style={{ padding: '0.5rem', marginRight: '1rem', width: '80%', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button
        onClick={() => verifyOnChain(proof)}
        style={{ padding: '0.5rem 1rem', marginTop: '1rem', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Verify Proof
      </button>
  
      {valid && (
        <p style={{ marginTop: '1rem', color: valid === 'Invalid' ? 'red' : 'green' }}>
          {valid}
        </p>
      )}
  
    </div>
  );
  }
  

export default Interface;
