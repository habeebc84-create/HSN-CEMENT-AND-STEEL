import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Order, SiteContent } from '../types';

export const generateInvoicePDF = (order: Order, siteContent: SiteContent) => {
  const doc = new jsPDF();

  // Color Palette Definitions
  const PRIMARY_COLOR = [59, 130, 246]; // Blue 500
  const SECONDARY_COLOR = [71, 85, 105]; // Slate 600
  const ACCENT_COLOR = [16, 185, 129]; // Emerald 500
  const LIGHT_BG = [248, 250, 252]; // Slate 50

  // 1. TOP TAX INVOICE HEADER
  doc.setFillColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.rect(0, 0, 210, 38, 'F');

  // Business Logo Text / Name
  
  // Adding a stylized Logo box instead of complex image loading to keep it sync and clean
  doc.setFillColor(255, 255, 255);
  doc.rect(14, 8, 22, 22, 'F');
  doc.setTextColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('HSN', 16, 23);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('HSN CEMENT & STEEL', 42, 15);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225); // Slate 300
  doc.text('PREMIUM CEMENT, TMT STEEL BARS & CONCRETE MATERIALS', 42, 21);
  doc.text(`Kalikiri Yard, AP - 517234 | Ph: ${siteContent.phone} | WhatsApp: +91 9179173040`, 42, 26);
  doc.setFont('helvetica', 'bold');
  doc.text('GSTIN: 37AAAFH1234A1Z5 | State: Andhra Pradesh (State Code: 37)', 42, 32);

  // Invoice Title Right Aligned
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text('TAX INVOICE', 196, 15, { align: 'right' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Invoice No: HSN/2026-27/${order.id.slice(-6).toUpperCase()}`, 196, 21, { align: 'right' });
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}`, 196, 26, { align: 'right' });
  doc.text('Mode of Supply: Road Transport', 196, 32, { align: 'right' });

  // 2. BILL TO / SHIP TO & TRANSPORT DETAILS
  doc.setTextColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('BILL TO (BUYER DETAILS):', 14, 48);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  doc.text(`Customer Name : ${order.customerName}`, 14, 54);
  doc.text(`Mobile Number : ${order.mobileNumber}`, 14, 59);
  doc.text(`Site Address  : ${order.deliveryAddress}`, 14, 64);
  doc.text(`Landmark      : ${order.landmark}`, 14, 69);
  doc.text(`Place of Supply: Kalikiri (State Code 37)`, 14, 74);

  // Right Side Order details
  doc.setTextColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('TRANSPORT & DISPATCH DETAILS:', 115, 48);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  doc.text(`Order Status      : ${order.orderStatus.toUpperCase()}`, 115, 54);
  doc.text(`Payment Mode      : ${order.paymentMethod}`, 115, 59);
  doc.text(`Dispatch Schedule : ${order.estimatedDelivery}`, 115, 64);
  doc.text(`E-Way Bill Status  : Not Required (L.C.)`, 115, 69);

  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 79, 196, 79);

  // 3. PRODUCTS TABLE WITH HSN & GST CALCULATION
  let totalTaxableValue = 0;
  let totalCGSTAmt = 0;
  let totalSGSTAmt = 0;

  const tableData = order.items.map((item, index) => {
    // Determine GST rates and HSN codes
    // Cement: 28% GST (CGST 14% + SGST 14%), HSN 2523
    // Steel/Wire: 18% GST (CGST 9% + SGST 9%), HSN 7214
    // Others: 18% GST (CGST 9% + SGST 9%), HSN 3824
    const isCement = item.product.type === 'cement';
    const gstRate = isCement ? 0.28 : 0.18;
    const hsn = isCement ? '2523' : (item.product.type === 'steel' || item.product.type === 'wire') ? '7214' : '3824';

    const itemTotal = item.totalPrice;
    const taxableVal = itemTotal / (1 + gstRate);
    const taxAmt = itemTotal - taxableVal;
    const cgstVal = taxAmt / 2;
    const sgstVal = taxAmt / 2;

    totalTaxableValue += taxableVal;
    totalCGSTAmt += cgstVal;
    totalSGSTAmt += sgstVal;

    return [
      index + 1,
      `${item.product.name} ${item.selectedSize ? `(${item.selectedSize})` : ''}`,
      hsn,
      item.quantity,
      `₹${item.unitPrice.toLocaleString('en-IN')}`,
      `₹${taxableVal.toFixed(2)}`,
      `₹${cgstVal.toFixed(2)}\n(CGST ${(gstRate * 50).toFixed(0)}%)`,
      `₹${sgstVal.toFixed(2)}\n(SGST ${(gstRate * 50).toFixed(0)}%)`,
      `₹${itemTotal.toLocaleString('en-IN')}`
    ];
  });

  autoTable(doc, {
    startY: 83,
    head: [['#', 'Description of Goods', 'HSN', 'Qty', 'Rate\n(Incl. Tax)', 'Taxable\nValue', 'CGST', 'SGST', 'Amount']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
      halign: 'center',
      valign: 'middle'
    },
    styles: {
      fontSize: 8,
      cellPadding: 3,
      valign: 'middle'
    },
    columnStyles: {
      0: { cellWidth: 8, halign: 'center' },
      1: { cellWidth: 50 },
      2: { cellWidth: 14, halign: 'center' },
      3: { cellWidth: 12, halign: 'center' },
      4: { cellWidth: 20, halign: 'right' },
      5: { cellWidth: 22, halign: 'right' },
      6: { cellWidth: 22, halign: 'right' },
      7: { cellWidth: 22, halign: 'right' },
      8: { cellWidth: 24, halign: 'right' }
    }
  });

  const finalY = (doc as any).lastAutoTable.finalY || 150;

  // 4. FINANCIAL SUMMARY & BANK DETAILS SECTION
  // Bank Details Card (Left Side)
  doc.setFillColor(LIGHT_BG[0], LIGHT_BG[1], LIGHT_BG[2]);
  doc.rect(14, finalY + 8, 90, 36, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, finalY + 8, 90, 36, 'S');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.text('BANK DETAILS FOR NEFT/RTGS/UPI:', 18, finalY + 14);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  doc.text(`Bank Name     : State Bank of India (SBI)`, 18, finalY + 20);
  doc.text(`Account Name  : HSN CEMENT & STEEL`, 18, finalY + 25);
  doc.text(`Account Number: 39485728345`, 18, finalY + 30);
  doc.text(`IFSC Code     : SBIN0000852 (Kalikiri)`, 18, finalY + 35);
  doc.text(`UPI ID        : hsncement@sbi`, 18, finalY + 40);

  // Financial Breakdown Box (Right Side)
  const deliveryFee = order.deliveryCharge || 0;
  const loadingFee = order.loadingCharge || 0;
  const hasExtraFees = deliveryFee > 0 || loadingFee > 0;
  const rightBoxHeight = hasExtraFees ? 48 : 36;

  doc.setFillColor(LIGHT_BG[0], LIGHT_BG[1], LIGHT_BG[2]);
  doc.rect(110, finalY + 8, 86, rightBoxHeight, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(110, finalY + 8, 86, rightBoxHeight, 'S');

  doc.setFontSize(8.5);
  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  doc.text(`Total Taxable Value :`, 114, finalY + 14);
  doc.text(`₹${totalTaxableValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 192, finalY + 14, { align: 'right' });

  doc.text(`Total CGST Amt      :`, 114, finalY + 19);
  doc.text(`₹${totalCGSTAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 192, finalY + 19, { align: 'right' });

  doc.text(`Total SGST Amt      :`, 114, finalY + 24);
  doc.text(`₹${totalSGSTAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 192, finalY + 24, { align: 'right' });

  if (hasExtraFees) {
    if (deliveryFee > 0) {
      doc.text(`Delivery Transport  :`, 114, finalY + 29);
      doc.text(`₹${deliveryFee.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 192, finalY + 29, { align: 'right' });
    } else {
      doc.text(`Delivery Transport  :`, 114, finalY + 29);
      doc.text(`FREE`, 192, finalY + 29, { align: 'right' });
    }
    doc.text(`Loading & Handling  :`, 114, finalY + 34);
    doc.text(`₹${loadingFee.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 192, finalY + 34, { align: 'right' });
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(ACCENT_COLOR[0], ACCENT_COLOR[1], ACCENT_COLOR[2]);
  const payableTextY = hasExtraFees ? finalY + 42 : finalY + 34;
  doc.text(`Net Amount Payable:`, 114, payableTextY);
  doc.text(`₹${order.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 192, payableTextY, { align: 'right' });

  // 5. SIGNATURE SECTION (Simplified)
  // Authorized Signatory Stamp Box (Right Side)
  doc.setTextColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('For HSN CEMENT & STEEL', 145, finalY + 48);
  
  doc.setDrawColor(203, 213, 225);
  doc.rect(142, finalY + 52, 48, 14, 'S'); // Signature seal box
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text('Sign / Stamp Area', 166, finalY + 60, { align: 'center' });

  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('Authorized Signatory', 166, finalY + 70, { align: 'center' });

  // Footer Note
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 116, 139);
  doc.text('Thank you for your business. Building relationships with genuine factory materials.', 105, 282, { align: 'center' });

  doc.save(`Invoice_HSN_${order.id.slice(-6).toUpperCase()}.pdf`);
};
