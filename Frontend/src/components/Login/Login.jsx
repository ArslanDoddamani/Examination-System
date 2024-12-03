import React from "react";

const Login = () => {
  const [isRegistering, setIsRegistering] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleRegister = (e) => {
    e.preventDefault();
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
              />
            </div>
            <div className="md:col-span-2">
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
          <form className="space-y-4 w-full max-w-sm" onSubmit={handleSubmit}>
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
