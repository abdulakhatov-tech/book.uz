import { FC } from "react";
import { Link } from "react-router-dom";
import img from "@/assets/images/404.png";

const NotFoundComponent: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <div className="text-center">
        <img
          src={img}
          alt="Not Found"
          className="w-[400px] lg:w-[600px] mx-auto transition-transform transform hover:scale-105 duration-300"
        />
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-6">
          Oops! Page not found
        </h2>
        <p className="text-lg text-gray-600 mt-4">
          The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-8 py-3 bg-blue-600 text-black font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundComponent;
