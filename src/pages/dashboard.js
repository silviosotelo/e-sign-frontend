// Dashboard Page (src/pages/dashboard.js)
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getContracts } from '../services/contractService';
import ContractList from '../components/ContractList';

const DashboardPage = () => {
  const [contracts, setContracts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const contractsData = await getContracts();
        setContracts(contractsData);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };
    fetchContracts();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ContractList contracts={contracts} />
    </div>
  );
};

export default DashboardPage;