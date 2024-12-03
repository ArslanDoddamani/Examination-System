import React from "react";

const PaymentTable = () => {
  const payments = [
    {
      sr: 1,
      PaymentPurpose: "Exam Fee",
      PaymentDate: "2024-12-01",
      transactionId: "TXN12345ABC",
      amount: "3000 INR",
      subjectCode: null, // No subject code for Exam Fee
    },
    {
      sr: 2,
      PaymentPurpose: "Challenge Evaluation",
      PaymentDate: "2024-12-02",
      transactionId: "TXN67890DEF",
      amount: "1500 INR",
      subjectCode: "CS101",
    },
    {
      sr: 3,
      PaymentPurpose: "Revaluation Fee",
      PaymentDate: "2024-12-03",
      transactionId: "TXN11223XYZ",
      amount: "1200 INR",
      subjectCode: "CS102",
    },
    // Add more payment records as needed
  ];

  return (
    <div className="overflow-x-auto bg-gray-900 p-4">
      <table className="min-w-full table-auto border-collapse border border-gray-700 text-white">
        <thead>
          <tr className="bg-gray-800 text-left">
            <th className="border border-gray-700 px-4 py-2">Sr</th>
            <th className="border border-gray-700 px-4 py-2">Payment Purpose</th>
            <th className="border border-gray-700 px-4 py-2">Payment Date</th>
            <th className="border border-gray-700 px-4 py-2">Transaction ID</th>
            <th className="border border-gray-700 px-4 py-2">Amount</th>
            <th className="border border-gray-700 px-4 py-2">Subject Code</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index} className="hover:bg-gray-700">
              <td className="border border-gray-700 px-4 py-2">{payment.sr}</td>
              <td className="border border-gray-700 px-4 py-2">{payment.PaymentPurpose}</td>
              <td className="border border-gray-700 px-4 py-2">{payment.PaymentDate}</td>
              <td className="border border-gray-700 px-4 py-2">{payment.transactionId}</td>
              <td className="border border-gray-700 px-4 py-2">{payment.amount}</td>
              <td className="border border-gray-700 px-4 py-2">
                {payment.subjectCode ? payment.subjectCode : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
