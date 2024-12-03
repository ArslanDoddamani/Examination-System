import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Simulating fetching data from the backend
    // fetch("/api/user-details") // Replace with your actual API endpoint
    //   .then((response) => response.json())
    //   .then((data) => setUserData(data))
    //   .catch((error) => console.error("Error fetching user data:", error));

    // Static user data
    const data = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "9876543210",
      dob: "2000-01-01",
      cgpa: "8.5",
      backlogs: "2",
      sgpa: {
        sem1: "8.0",
        sem2: "8.3",
        sem3: "8.6",
        sem4: "8.7",
        sem5: "8.8",
        sem6: "9.0",
        sem7: "9.2",
        sem8: "9.5",
      },
    };

    setUserData(data);
  }, []);

  if (!userData) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold text-red-400">Personal Details</h3>
          <div className="mt-4">
            <p className="text-sm uppercase font-bold text-gray-400">Name</p>
            <p className="text-lg">{userData.name}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm uppercase font-bold text-gray-400">Email</p>
            <p className="text-lg">{userData.email}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm uppercase font-bold text-gray-400">Phone Number</p>
            <p className="text-lg">{userData.phone}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm uppercase font-bold text-gray-400">DOB</p>
            <p className="text-lg">{userData.dob}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-red-400">Academic Details</h3>
          <div className="mt-4">
            <p className="text-sm uppercase font-bold text-gray-400">CGPA</p>
            <p className="text-lg">{userData.cgpa}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm uppercase font-bold text-gray-400">Number of Backlogs</p>
            <p className="text-lg">{userData.backlogs}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm uppercase font-bold text-gray-400">SGPA</p>
            <ul className="list-disc list-inside mt-2">
              <li className="text-lg">
                <span className="font-semibold">Sem1:</span> {userData.sgpa.sem1}
              </li>
              <li className="text-lg">
                <span className="font-semibold">Sem2:</span> {userData.sgpa.sem2}
              </li>
              <li className="text-lg">
                <span className="font-semibold">Sem3:</span> {userData.sgpa.sem3}
              </li>
              <li className="text-lg">
                <span className="font-semibold">Sem4:</span> {userData.sgpa.sem4}
              </li>
              <li className="text-lg">
                <span className="font-semibold">Sem5:</span> {userData.sgpa.sem5}
              </li>
              <li className="text-lg">
                <span className="font-semibold">Sem6:</span> {userData.sgpa.sem6}
              </li>
              <li className="text-lg">
                <span className="font-semibold">Sem7:</span> {userData.sgpa.sem7}
              </li>
              <li className="text-lg">
                <span className="font-semibold">Sem8:</span> {userData.sgpa.sem8}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
