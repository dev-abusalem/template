import * as XLSX from "xlsx";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadPDF = async (
  data: any[],
  skipFields: string[] = [],
  title = "Report"
) => {
  const doc = new jsPDF();
  const excludeFields = ["_id", "createdAt", "updatedAt", "__v", ...skipFields];
  const headers = data.length
    ? Object.keys(data[0])
        .filter((key) => !excludeFields.includes(key))
        .map((key) => key.charAt(0).toUpperCase() + key.slice(1)) // Capitalize headers
    : [];
  const rows = data.map((entry) =>
    headers.map((header) => entry[header.toLowerCase()] ?? "")
  );

  // Add custom header
  const logoUrl = "/images/logo.png";
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  try {
    const image = await fetch(logoUrl);
    const imageData = await image.blob();
    const reader = new FileReader();

    reader.onloadend = function () {
      const base64data = reader.result as string;

      doc.addImage(base64data, "PNG", 10, 15, 50, 15);

      // Company Info
      doc.setFont("bold");
      doc.setFontSize(16);
      doc.setTextColor(40);
      doc.text("INVMS Solutions", 75, 15);

      // Company address
      doc.setFont("bold");
      doc.setFontSize(12);
      doc.text(title, 75, 22);
      doc.setFontSize(10);
      doc.text("Bahrampur, Rajpara, Rajshahi", 75, 28);
      doc.setTextColor(0, 112, 192);

      // Company contact
      doc.setFont("normal");
      doc.textWithLink("support@invms.com", 75, 34, {
        url: "mailto:support@invms.com",
      });
      doc.textWithLink("www.invms.com", 107, 34, {
        url: "www.invms.com",
      });
      doc.setTextColor(40);
      doc.text("+8801722320126", 135, 34);
      doc.setFont("sans-sarif", "bold");
      doc.text(`Date: ${currentDate}`, 150, 20);

      // Move to table
      autoTable(doc, {
        startY: 40, // Start position after the header
        head: [headers],
        body: rows,
        styles: { halign: "left", valign: "middle" },
      });

      // Save the PDF
      doc.save(`${title}.pdf`);
    };

    reader.readAsDataURL(imageData);
  } catch (error) {
    console.error("Image load failed:", error);
  }
};

export const downloadExcel = (data: any[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Closing Report");
  XLSX.writeFile(workbook, "closing_report.xlsx");
};

export const downloadCSV = (data: any[]) => {
  const headers = ["Date", "Cash In", "Cash Out", "Balance"];
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      [row.date, row.cashIn, row.cashOut, row.balance].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "closing_report.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const handlePrint = () => {
  const printContent = document.getElementById("closing-report");
  const windowPrint = window.open(
    "",
    "",
    "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
  );
  windowPrint?.document.write(printContent?.innerHTML || "");
  windowPrint?.document.close();
  windowPrint?.focus();
  windowPrint?.print();
  windowPrint?.close();
};
