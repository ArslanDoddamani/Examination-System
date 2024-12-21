import React, { useState } from "react";
import axios from "../../axios/axios.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [usn, setUsn] = useState("");
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDOB] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      if (!usn || !password) {
        alert("Please fill all fields.");
        return;
      }

      const res = await axios.post("/student/login", { usn, password });
      
        window.localStorage.setItem("userType", res.data.data?.userType);
        navigate("/student/profile"); 
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert("Login failed. Please try again.");
    }
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/student/register", {
        fullName,
        department,
        email,
        password,
        phone,
        dob,
      });
      setIsRegistering(false);
      console.log(res.data.message || "Registration successful!");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };
  

  return (
    <>
      <div className="flex flex-col items-center justify-center py-10 px-5">
        {isRegistering ? (
          <form
            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 w-full max-w-md md:max-w-2xl"
            onSubmit={handleRegister}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-md font-medium text-gray-300"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="mt-1 block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block text-md font-medium text-gray-300"
              >
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                className="mt-1 block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                onChange={e => setDOB(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-md font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1 block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="">
              <label
                htmlFor="dept"
                className="block text-md font-medium text-gray-300"
              >
                Department
              </label>
              <select
                name="dept"
                id="dept"
                className="mt-1 block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                onChange={e => setDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Biotechnology">Biotechnology</option>
              </select>
            </div>
            <div className="col-span-full">
              <button
                type="submit"
                className="mt-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
            <div className="col-span-full">
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="mt-4 text-sm text-blue-500"
              >
                Already have an account? Login
              </button>
            </div>
          </form>
        ) : (
          <form className="space-y-4 w-full max-w-sm" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="usn"
                className="block text-md font-medium text-gray-300"
              >
                USN
              </label>
              <input
                type="text"
                name="usn"
                id="usn"
                className="mt-1 block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                onChange={e => setUsn(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-md font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1 block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="mt-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="mt-4 text-sm text-blue-500"
              >
                Create an account
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Login;
