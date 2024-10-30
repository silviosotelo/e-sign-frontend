// src/pages/contract/[id].js
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { getContractById, signContract } from '../../services/contractService';
import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { UserContext } from '../../contexts/UserContext';

// Importar el visor PDF de forma dinámica para desactivar el SSR
const PDFViewer = dynamic(() => import('../../components/PDFViewer'), { ssr: false });

const ContractDetailsPage = () => {
  const [contract, setContract] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  // Obtener los datos del usuario y la IP desde el contexto
  const { user, userIp } = useContext(UserContext);

  // Obtener los detalles del contrato
  useEffect(() => {
    if (id) {
      const fetchContract = async () => {
        try {
          const contractData = await getContractById(id);
          setContract(contractData);
        } catch (error) {
          console.error('Error fetching contract:', error);
        }
      };
      fetchContract();
    }
  }, [id]);

  const handleSignContract = async () => {
    if (!user) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo obtener la información del usuario. Intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    setIsSigning(true);
    try {
      const signatureData = {
        userId: user.userId,
        email: user.email,
        ip: userIp,
      };

      const response = await signContract(id, signatureData);
      Swal.fire({
        title: 'Información',
        text: 'Contrato firmado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      setContract(response);
    } catch (error) {
      console.error('Error signing contract:', error);
      Swal.fire({
        title: 'Información',
        text: 'Error al firmar el contrato.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } finally {
      setIsSigning(false);
    }
  };

  if (!contract) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Cargando contrato...</h2>
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500 mt-4" />
        </div>
      </div>
    );
  }

  return (
    <Layout pageTitle={`Contrato: ${contract.title}`}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {contract.content && (
          <PDFViewer content={contract.content} />
        )}
        {!contract.signed && (
          <button
            onClick={handleSignContract}
            disabled={isSigning}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {isSigning ? 'Firmando...' : 'Firmar Contrato'}
          </button>
        )}
      </div>
    </Layout>
  );
};

export default ContractDetailsPage;
