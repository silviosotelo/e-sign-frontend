// ContractList Component (src/components/ContractList.js)
import React from 'react';
import { useRouter } from 'next/router';

const ContractList = ({ contracts }) => {
  const router = useRouter();

  const handleViewContract = (contractId) => {
    router.push(`/contract/${contractId}`);
  };

  return (
    <ul>
      {contracts.map((contract) => (
        <li key={contract._id}>
          {contract.title} - {contract.signed ? 'Signed' : 'Pending'}
          <button onClick={() => handleViewContract(contract._id)}>View</button>
        </li>
      ))}
    </ul>
  );
};

export default ContractList;
