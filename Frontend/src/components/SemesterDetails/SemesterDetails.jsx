import React, { useState, useEffect } from "react";

const SemesterDetails = () => {
  const [semesterData, setSemesterData] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);

  useEffect(() => {
    // Static semester data
    const data = [
      {
        semester: 1,
        subjects: [
          {
            code: "CS101",
            name: "Introduction to Programming",
            credits: 4,
            dept: "CSE",
            type: "Core",
            semester: 1,
          },
          {
            code: "MA101",
            name: "Engineering Mathematics",
            credits: 3,
            dept: "Math",
            type: "Core",
            semester: 1,
          },
        ],
      },
      {
        semester: 2,
        subjects: [
          {
            code: "CS102",
            name: "Data Structures",
            credits: 4,
            dept: "CSE",
            type: "Core",
            semester: 2,
          },
          {
            code: "PH101",
            name: "Physics",
            credits: 3,
            dept: "Physics",
            type: "Lab",
            semester: 2,
          },
        ],
      },
    ];

    setSemesterData(data);

    // Calculate total credits earned by the student
    const total = data.reduce((acc, semester) => {
      const semesterCredits = semester.subjects.reduce(
        (sum, subject) => sum + subject.credits,
        0
      );
      return acc + semesterCredits;
    }, 0);
    setTotalCredits(total);
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white">
    {semesterData.map((semester, index) => (
      <div key={semester.semester} className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Semester - {semester.semester}</h3>
          <p className="text-lg text-red-400">
            Total Credits:{" "}
            {semester.subjects.reduce((sum, subject) => sum + subject.credits, 0)}
          </p>
        </div>
        {/* Table Wrapper for Horizontal Scroll */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border border-gray-700">
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2">Sr</th>
                <th className="px-4 py-2">Sub Code</th>
                <th className="px-4 py-2">Sub Name</th>
                <th className="px-4 py-2">Credits</th>
                <th className="px-4 py-2">Dept</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Semester</th>
              </tr>
            </thead>
            <tbody>
              {semester.subjects.map((subject, subIndex) => (
                <tr key={subject.code} className="border-b border-gray-700">
                  <td className="px-4 py-2">{subIndex + 1}</td>
                  <td className="px-4 py-2">{subject.code}</td>
                  <td className="px-4 py-2">{subject.name}</td>
                  <td className="px-4 py-2">{subject.credits}</td>
                  <td className="px-4 py-2">{subject.dept}</td>
                  <td className="px-4 py-2">{subject.type}</td>
                  <td className="px-4 py-2">{subject.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ))}
    <div className="mt-6 text-right">
      <h3 className="text-2xl font-bold text-red-400">
        Total Credits Earned: {totalCredits}
      </h3>
    </div>
  </div>
  
  );
};

export default SemesterDetails;
