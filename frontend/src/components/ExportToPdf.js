import React from 'react';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const getKeysFromProduct = (product) => {
  return ['number', 'name', 'price', 'vat'];
};

const exportPDF = (head, body) => {
  const document = new jsPDF();
  const timestamp = new Date().toISOString();
  const filename = `table_${timestamp}.pdf`;
  document.text(`Product Table - exported on: ${timestamp}`, 20, 10);

  autoTable(document, {
    theme: 'grid',
    head: [head],
    body: body.map((row) => getKeysFromProduct(row).map((key) => row[key])),
  });
  document.save(filename);
};

function ExportToPdf({ labels, products, searchResult }) {
  const exportData = searchResult.length > 0 ? searchResult : products;
  return (
    <div>
      <Button
        variant="dark"
        disabled={exportData.length === 0}
        onClick={() => exportPDF(labels, exportData)}
      >
        Export to PDF
      </Button>
    </div>
  );
}

export default ExportToPdf;
