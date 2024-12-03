import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RegularSub from './RegularSub';
import ReRegistration from './ReRegistration';

const Registration = () => {
  // Extracting the "type" parameter from the URL
  const { type } = useParams();

  return (
    <div className="p-4">
      {/* Links aligned to the left */}
      <div className="flex flex-col items-start mb-4">
        <ul className="list-disc pl-5">
          <li>
            <Link
              to="/registration/regular"
              className={`mb-2 text-white hover:text-blue-500 ${type === 'regular' ? 'font-bold' : 'opacity-50'}`}
            >
              Regular Subject Registration
            </Link>
          </li>
          <li>
            <Link
              to="/registration/re-registration"
              className={`mb-2 text-white hover:text-blue-500 ${type === 're-registration' ? 'font-bold' : 'opacity-50'}`}
            >
              Re-Registration
            </Link>
          </li>
        </ul>
      </div>

      {/* Conditionally render the components based on the "type" param */}
      <div>
        {type === 'regular' && (
          <div id="regular-sub">
            <RegularSub />
          </div>
        )}
        {type === 're-registration' && (
          <div id="re-registration">
            <ReRegistration />
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;
