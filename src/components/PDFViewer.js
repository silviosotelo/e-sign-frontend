// src/components/PDFViewer.js
import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewer = ({ content }) => {
  // Crear la instancia del plugin defaultLayoutPlugin y definir el tema como "dark"
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => defaultTabs,
    toolbarPlugin: {
      theme: 'dark', // Definir el tema predeterminado como oscuro
    },
  });

  return (
    <div style={{ height: '750px' }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js`}>
        <Viewer
          fileUrl={content}
          plugins={[defaultLayoutPluginInstance]}
        />
      </Worker>
    </div>
  );
};

export default PDFViewer;
