import { Order } from '../types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportOrdersToCSV = (orders: Order[], filename: string = 'windows_h_Sales_Report.csv') => {
  const headers = ['Order ID', 'Date', 'Customer Name', 'Mobile Number', 'Address', 'Total Qty', 'Total Amount (INR)', 'Payment Method', 'Status'];

  const rows = orders.map(o => [
    o.id,
    new Date(o.createdAt).toLocaleDateString('en-IN'),
    `"${o.customerName}"`,
    o.mobileNumber,
    `"${o.deliveryAddress.replace(/"/g, '""')}"`,
    o.totalQuantity,
    o.totalAmount,
    o.paymentMethod,
    o.orderStatus
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' 
    + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportSalesReportPDF = (orders: Order[], title: string = 'Sales Report') => {
  const doc = new jsPDF();

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 35, 'F');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('HSN CEMENT AND STEEL', 14, 18);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text(title.toUpperCase(), 14, 26);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, 196, 26, { align: 'right' });

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalItems = orders.reduce((sum, o) => sum + o.totalQuantity, 0);

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10);
  doc.text(`Total Orders: ${orders.length} | Total Items Sold: ${totalItems} | Total Revenue: ₹${totalRevenue.toLocaleString('en-IN')}`, 14, 45);

  const tableData = orders.map(o => [
    o.id,
    new Date(o.createdAt).toLocaleDateString('en-IN'),
    o.customerName,
    o.mobileNumber,
    o.totalQuantity,
    `₹${o.totalAmount.toLocaleString('en-IN')}`,
    o.orderStatus
  ]);

  autoTable(doc, {
    startY: 52,
    head: [['Order ID', 'Date', 'Customer', 'Mobile', 'Qty', 'Amount', 'Status']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [30, 41, 59], textColor: [245, 158, 11] },
    styles: { fontSize: 8 }
  });

  doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
};
