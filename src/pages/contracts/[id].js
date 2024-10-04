// Contract Page (src/pages/contract/[id].js)
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getContractById, signContract } from '../../services/contractService';
import SignaturePad from '../../components/SignaturePad';

const ContractPage = () => {
  const [contract, setContract] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchContract = async () => {
      if (id) {
        try {
          const contractData = await getContractById(id);
          setContract(contractData);
        } catch (error) {
          console.error('Error fetching contract:', error);
        }
      }
    };
    fetchContract();
  }, [id]);

  const handleSign = async (signature) => {
    try {
      await signContract(id, signature);
      alert('Contract signed successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing contract:', error);
    }
  };

  return (
    <div>
      {contract && (
        <div>
          <h2>{contract.title}</h2>
          <p>{contract.content}</p>
          <SignaturePad onSign={handleSign} />
        </div>
      )}
    </div>
  );
};

export default ContractPage;