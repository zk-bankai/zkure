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

Reference: [FDA approved drug parameter values for generic anti-narcotic drugs](https://csdl-downloads.ieeecomputer.org/trans/tq/2023/06/10002421.pdf?Expires=1701065339&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jc2RsLWRvd25sb2Fkcy5pZWVlY29tcHV0ZXIub3JnL3RyYW5zL3RxLzIwMjMvMDYvMTAwMDI0MjEucGRmIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzAxMDY1MzM5fX19XX0_&Signature=rM2jzW~cIadFu1Dp4d~s0WjhGkD2TjvdMXWhHEDOQ5jXBnMr-EFflrGgLIwYGFFDhO2XSJgKDsf~ATYmdcdAaHcmgiuHdB1nZdTZbVNi3EkrSMquLaoS4j1K7d7js1JWquj-ZwG2qF7s0PywCuVhzEt8sETsZz3f9TB2PcEk5G8qrDzuWBLTUH4oL0YG6-y4IwA0OxeSojQCed3P3shcx5FO~h5dQ2laUWLpfhambJmVq0v~l~cPFzPlRgFZjROWcQZm~r1GgIScwed7triyM5Iyrd2mk-Llz-uiv54Tr6TYj~SLWYo685kZyKbxD90QeaP-ZtzNIqU4QJqvzutwIw__&Key-Pair-Id=K12PMWTCQBDMDT)


License: This project is licensed under the [MIT License](https://github.com/zk-bankai/zkure/blob/main/LICENSE)

