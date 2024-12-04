import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Beclogo from "/BecLogo.png";

const Result = () => {
  const studentInfo = {
    usn: "2BA21CS022",
    name: "ARSLAN A DODDAMANI",
    branch: "COMPUTER SCIENCE & ENGINEERING",
    semester: 4,
    sgpa: 7.9,
    cgpa: 8.2, // Example CGPA, replace with actual value
  };

  const subjects = [
    { slNo: 1, code: "21UMA401C", name: "STATISTICS AND PROBABILITY DISTRIBUTIONS", grade: "A+", attempt: 1 },
    { slNo: 2, code: "21UCS402C", name: "OPERATING SYSTEMS", grade: "B+", attempt: 1 },
    { slNo: 3, code: "21UCS403C", name: "OBJECT ORIENTED PROGRAMMING WITH JAVA", grade: "A+", attempt: 1 },
    { slNo: 4, code: "21UCS404C", name: "FINITE AUTOMATA AND FORMAL LANGUAGES", grade: "A", attempt: 1 },
    { slNo: 5, code: "21UCS405L", name: "DATABASE MANAGEMENT SYSTEM LAB", grade: "O", attempt: 1 },
    { slNo: 6, code: "21UCS406L", name: "OBJECT ORIENTED PROGRAMMING WITH JAVA LAB", grade: "O", attempt: 1 },
    { slNo: 7, code: "21UCS407L", name: "OPERATING SYSTEMS LAB", grade: "A+", attempt: 1 },
    { slNo: 8, code: "21UCS408I", name: "SUMMER INTERNSHIP - I", grade: "O", attempt: 1 },
    { slNo: 9, code: "21UCS409C", name: "DATABASE MANAGEMENT SYSTEM", grade: "P", attempt: 1 },
    { slNo: 10, code: "21UHS422C", name: "SAMSKRUTHIKA KANNADA", grade: "B", attempt: 1 },
  ];

  const gradingSystem = [
    { grade: "Grade", range: "Range" },
    { grade: "O", range: "90-100" },
    { grade: "A+", range: "80-89" },
    { grade: "A", range: "70-79" },
    { grade: "B+", range: "60-69" },
    { grade: "B", range: "55-59" },
    { grade: "C", range: "50-54" },
    { grade: "P", range: "40-49" },
    { grade: "F", range: "0-39" },
    { grade: "PP", range: ">=40" },
    { grade: "NE", range: "NOT ELIGIBLE" },
    { grade: "W", range: "Withdraw" },
  ];

  const handleDownloadPDF = () => {
    // Clone the "result-section" for PDF generation
    const resultSection = document.getElementById("result-section");
    const clonedSection = resultSection.cloneNode(true);
  
    // Apply desktop styles to the cloned section
    clonedSection.style.width = "800px"; // Fixed width for desktop view
    clonedSection.style.margin = "0 auto"; // Center the content
    clonedSection.style.fontSize = "12px"; // Adjust font size for PDF readability
  
    // Create a wrapper for rendering
    const wrapper = document.createElement("div");
    wrapper.appendChild(clonedSection);
    wrapper.style.display = "block";
  
    document.body.appendChild(wrapper); // Append to the document body for rendering
  
    html2canvas(clonedSection, {
      scale: 2, // High resolution for better PDF quality
      useCORS: true, // Enable cross-origin images
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; // PDF width minus margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`${studentInfo.name}_Result.pdf`);
  
      document.body.removeChild(wrapper); // Clean up
    });
  };

  return (
    <>
      <div className="p-8 bg-gray-800 text-white flex flex-col items-center">
        <div id="result-section" className="bg-white text-black shadow-md w-full max-w-5xl rounded-md p-6">
          {/* Header Section */}
          <div className="mb-6 text-center flex justify-center items-center gap-2">
            <img src={Beclogo} alt="College Logo" className="" style={{ width: "70px" }} />
            <div>
              <h1 className="text-lg font-bold">B.V.V.S</h1>
              <p className="text-lg font-bold">Basaveshwar Engineering College, Bagalkote-587102</p>
              <p>(An autonomous institution permanently affiliated to VTU, Belagavi)</p>
              <p className="text-lg font-bold">Academic Year 2022-2023 Even Semester</p>
              <p className="text-lg font-bold">B.E. Provisional Results, September/October-2023</p>
            </div>
          </div>
          <hr className="border-black mb-10" />

          {/* Student Information */}
          <div className="mb-6">
            <table>
              <tbody>
                <tr>
                  <th className="text-left">USN</th>
                  <td>: {studentInfo.usn}</td>
                </tr>
                <tr>
                  <th className="pr-5 text-left">NAME OF THE STUDENT</th>
                  <td>: {studentInfo.name}</td>
                </tr>
                <tr>
                  <th className="text-left">BRANCH</th>
                  <td>: {studentInfo.branch}</td>
                </tr>
                <tr>
                  <th className="text-left">SEMESTER</th>
                  <td>: {studentInfo.semester}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Subjects Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center border border-collapse border-gray-700 mb-6">
              <thead>
                <tr className="border-b bg-gray-200">
                  <th className="border px-4 py-2">Sl No</th>
                  <th className="border px-4 py-2">Subject Code</th>
                  <th className="border px-4 py-2">Subject Name</th>
                  <th className="border px-4 py-2">Grade</th>
                  <th className="border px-4 py-2">Attempt</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={index} className="border-b">
                    <td className="border px-4 py-2">{subject.slNo}</td>
                    <td className="border px-4 py-2">{subject.code}</td>
                    <td className="border px-4 py-2">{subject.name}</td>
                    <td className="border px-4 py-2">{subject.grade}</td>
                    <td className="border px-4 py-2">{subject.attempt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SGPA and CGPA */}
          <div className="mt-6">
            <p>
              <strong>SGPA:</strong> {studentInfo.sgpa}
            </p>
            <p>
              <strong>CGPA:</strong> {studentInfo.cgpa}
            </p>
          </div>

          {/* Grading System Table */}
          <div className="overflow-x-auto mt-8">
            <p className="text-lg font-bold mb-4">Grading System</p>
            <table className="w-full text-sm text-center border border-collapse border-black">
              <tbody>
                <tr>
                  {gradingSystem.map((grade, index) => (
                    <td
                      key={index}
                      className={`border border-black px-4 py-2 ${
                        index === 0 ? "font-bold bg-gray-200" : ""
                      }`}
                    >
                      {grade.grade}
                    </td>
                  ))}
                </tr>
                <tr>
                  {gradingSystem.map((grade, index) => (
                    <td
                      key={index}
                      className={`border border-black px-4 py-2 ${
                        index === 0 ? "font-bold bg-gray-200" : ""
                      }`}
                    >
                      {grade.range}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download PDF
        </button>
      </div>
    </>
  );
};

export default Result;
