# Zkure: Zero Knowledge Drug Safety verification system
The ZK Drug Safety Verification System is a web application that uses zero-knowledge proofs to verify the safety of pharmaceutical drugs. It allows drug designers to input drug components and generates a proof and public signals based on the input. Users can then verify the proof to determine if the drug is safe. The system ensures privacy and trust in drug verification processes.


# Key Features
- **Privacy-Preserving Data Management**:
  - Securely handle sensitive drug information, including formulations and clinical trial data, without exposing proprietary details.

- **Regulatory Compliance**:
  - Automated verification processes that align with industry standards and regulations.

- **Intellectual Property Protection**:
  - Robust encryption and privacy protocols to safeguard intellectual property.

# How It Works

**Data Input**: Input drug data into the system, including components like preservatives, adjuvants, stabilizers, and excipients.

| Parameter              | Expected Range              |
|------------------------|-----------------------------|
| Adjuvant (Aluminum)    | 0 – 0.85 mg/dose           |
| Preservative (Thimerosal) | 0.01 - 0.02 mg/mL (typical) |
| Stabilizer             | 0.1 - 5% w/v (varies)      |
| Excipient (Sodium Chloride) | 0.5 - 9 mg/mL (varies)    |

any values out of the range will not be accepted by the circuit and no proof will be generated indicating the drug is unsafe

**ZK Proof Generation**: The system generates a zero-knowledge proof, ensuring data verification without revealing the underlying data.

**Data Verification**: External parties can verify the authenticity of the drug data using the provided proofs, ensuring compliance and authenticity on the blockchain using solidity verifier which is deployed on the [Scroll L2](https://scroll.io/).

![](https://github.com/zk-bankai/zkure/blob/main/assets/Screenshot%202023-12-07%20at%205.49.10%E2%80%AFPM.jpeg)

# Impact

- **Revolutionizing Data Confidentiality** 
- **Facilitating Secure Global Collaboration**

- **Automating Compliance with ZK Technology**

- **Setting a Blueprint for Future Technological Advancements**


## To Contribute

```bash
git clone https://github.com/zk-bankai/zkure.git
```

## To run the project

```bash
git clone https://github.com/zk-bankai/zkure.git

cd frontend

npm install

npm run dev
```

Reference: [FDA approved drug parameter values for generic anti-narcotic drugs](https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/CFRSearch.cfm?CFRPart=610&showFR=1&subpartNode=21:7.0.1.1.5.7)


License: This project is licensed under the [MIT License](https://github.com/zk-bankai/zkure/blob/main/LICENSE)

## Project Background

This project was built at [zk-bankai](https://twitter.com/zk_bankai) hacker house 2023.
