import React from "react";

const ReRegistration = () => {
  const subjects = [
    {
      sr: 1,
      subCode: "CS101",
      subName: "Data Structures",
      credits: 4,
      dept: "CSE",
      type: "Core",
      semester: 3,
    },
    {
      sr: 2,
      subCode: "CS102",
      subName: "Operating Systems",
      credits: 4,
      dept: "CSE",
      type: "Core",
      semester: 4,
    },
    // Add more subject records as needed
  ];

  return (
    <div className="overflow-x-auto bg-gray-900 p-4">
      <table className="min-w-full table-auto border-collapse border border-gray-700 text-white">
        <thead>
          <tr className="bg-gray-800 text-left">
            <th className="border border-gray-700 px-4 py-2">Sr</th>
            <th className="border border-gray-700 px-4 py-2">Sub Code</th>
            <th className="border border-gray-700 px-4 py-2">Sub Name</th>
            <th className="border border-gray-700 px-4 py-2">Credits</th>
            <th className="border border-gray-700 px-4 py-2">Dept</th>
            <th className="border border-gray-700 px-4 py-2">Type</th>
            <th className="border border-gray-700 px-4 py-2">Semester</th>
            <th className="border border-gray-700 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index} className="hover:bg-gray-700">
              <td className="border border-gray-700 px-4 py-2">{subject.sr}</td>
              <td className="border border-gray-700 px-4 py-2">{subject.subCode}</td>
              <td className="border border-gray-700 px-4 py-2">{subject.subName}</td>
              <td className="border border-gray-700 px-4 py-2">{subject.credits}</td>
              <td className="border border-gray-700 px-4 py-2">{subject.dept}</td>
              <td className="border border-gray-700 px-4 py-2">{subject.type}</td>
              <td className="border border-gray-700 px-4 py-2">{subject.semester}</td>
              <td className="border border-gray-700 px-4 py-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Register
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReRegistration;
